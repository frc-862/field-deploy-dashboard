import { useCallback, useEffect, useState } from 'react';
import {
    ApiError,
    buildRepo,
    checkoutBranch,
    cloneRepo,
    deployRepo,
    fetchRepo,
    getBranches,
    getRecordingStatus,
    getRepos,
    listRecordings,
    liveStreamUrl,
    pullRepo,
    startRecording,
    stopRecording,
} from './api';
import { CameraPanel } from './components/CameraPanel';
import { ControlPanel } from './components/ControlPanel';
import { Header } from './components/Header';
import { OutputPanel } from './components/OutputPanel';
import {
    applyWsGitEvent,
    gitStateFromCheckout,
    gitStateFromClone,
    gitStateFromPull,
    loadGitState,
    saveGitState,
} from './gitState';
import { useTheme } from './hooks/useTheme';
import { useWebSocket, wsEventLabel } from './hooks/useWebSocket';
import type { ActivityEntry, CommandOutput, GitState, WsPayload } from './types';

let activityCounter = 0;

function nextActivityId(): string {
    activityCounter += 1;
    return `act-${activityCounter}`;
}

function formatCommandOutput(label: string, output: CommandOutput): string {
    const header = `$ ${label}  (exit ${output.code ?? '?'})`;
    const parts = [header];
    if (output.stdout.trim()) parts.push(output.stdout.trimEnd());
    if (output.stderr.trim()) parts.push(`[stderr]\n${output.stderr.trimEnd()}`);
    return parts.join('\n\n');
}

function extractCommandOutput(data: unknown): CommandOutput | null {
    if (!data || typeof data !== 'object') return null;
    const obj = data as Record<string, unknown>;
    if (typeof obj.stdout === 'string' && typeof obj.stderr === 'string') {
        return {
            code: typeof obj.code === 'number' ? obj.code : -1,
            signal: typeof obj.signal === 'string' ? obj.signal : null,
            stdout: obj.stdout,
            stderr: obj.stderr,
        };
    }
    return null;
}

export default function App() {
    const { theme, toggleTheme } = useTheme();

    const [repos, setRepos] = useState<string[]>([]);
    const [branches, setBranches] = useState<string[]>([]);
    const [selectedRepo, setSelectedRepo] = useState('');
    const [selectedBranch, setSelectedBranch] = useState('');
    const [cloneName, setCloneName] = useState('');
    const [loadingRepos, setLoadingRepos] = useState(true);
    const [loadingBranches, setLoadingBranches] = useState(false);
    const [busyAction, setBusyAction] = useState<string | null>(null);

    const [recordingOn, setRecordingOn] = useState(false);
    const [streamActive, setStreamActive] = useState(false);
    const [streamUrl, setStreamUrl] = useState('');
    const [recordings, setRecordings] = useState<string[]>([]);
    const [selectedRecording, setSelectedRecording] = useState('');
    const [cameraBusy, setCameraBusy] = useState(false);

    const [activity, setActivity] = useState<ActivityEntry[]>([]);
    const [terminalText, setTerminalText] = useState('');
    const [errorBanner, setErrorBanner] = useState('');
    const [gitStatus, setGitStatus] = useState<GitState>(loadGitState);

    const updateGitStatus = useCallback((next: GitState) => {
        setGitStatus(next);
        saveGitState(next);
    }, []);

    const addActivity = useCallback(
        (entry: Omit<ActivityEntry, 'id' | 'time'> & { time?: Date }) => {
            setActivity((prev) => [
                { id: nextActivityId(), time: entry.time ?? new Date(), ...entry },
                ...prev.slice(0, 49),
            ]);
        },
        []
    );

    const appendTerminal = useCallback((text: string) => {
        setTerminalText((prev) => (prev ? `${prev}\n\n${text}` : text));
    }, []);

    const loadRepos = useCallback(async () => {
        setLoadingRepos(true);
        try {
            const list = await getRepos();
            setRepos(list);
            setSelectedRepo((current) => {
                if (current && list.includes(current)) return current;
                return list[0] ?? '';
            });
        } catch (error) {
            setErrorBanner(error instanceof Error ? error.message : 'Failed to load repos');
            addActivity({ source: 'api', label: 'Failed to load repositories', tone: 'error' });
        } finally {
            setLoadingRepos(false);
        }
    }, [addActivity]);

    const loadBranches = useCallback(
        async (repo: string) => {
            if (!repo) {
                setBranches([]);
                setSelectedBranch('');
                return;
            }
            setLoadingBranches(true);
            try {
                const list = await getBranches(repo);
                setBranches(list);
                setSelectedBranch((current) => {
                    if (current && list.includes(current)) return current;
                    return list[0] ?? '';
                });
            } catch (error) {
                setBranches([]);
                setSelectedBranch('');
                addActivity({
                    source: 'api',
                    label: 'Failed to load branches',
                    detail: error instanceof Error ? error.message : undefined,
                    tone: 'error',
                });
            } finally {
                setLoadingBranches(false);
            }
        },
        [addActivity]
    );

    const loadRecordings = useCallback(async () => {
        try {
            const list = await listRecordings();
            const sorted = [...list].sort().reverse();
            setRecordings(sorted);
            setSelectedRecording((current) => {
                if (current && sorted.includes(current)) return current;
                return sorted[0] ?? '';
            });
        } catch {
            // recordings dir may not exist yet
            setRecordings([]);
            setSelectedRecording('');
        }
    }, []);

    const handleWsEvent = useCallback(
        (payload: WsPayload) => {
            const label = wsEventLabel(payload.type);
            let detail = '';
            let tone: ActivityEntry['tone'] = 'info';

            if (payload.type === 'recording_status') {
                const on = Boolean(payload.data.recordingOn);
                setRecordingOn(on);
                if (!on) {
                    setStreamActive(false);
                    setStreamUrl('');
                }
                detail = on ? 'Recording started' : 'Recording stopped';
                tone = 'neutral';
                void loadRecordings();
            } else if (payload.type === 'github_repo_clone') {
                detail = String(payload.data.repoName ?? '');
                tone = 'success';
                setGitStatus((prev) => {
                    const next = applyWsGitEvent(payload.type, payload.data, prev);
                    if (next) saveGitState(next);
                    return next ?? prev;
                });
                void loadRepos();
            } else if (payload.type === 'branch_checkout') {
                detail = `${payload.data.repoName} → ${payload.data.branch}`;
                tone = 'success';
                setGitStatus((prev) => {
                    const next = applyWsGitEvent(payload.type, payload.data, prev);
                    if (next) saveGitState(next);
                    return next ?? prev;
                });
                void loadBranches(String(payload.data.repoName ?? selectedRepo));
            } else if (payload.type === 'github_repo_pull') {
                detail = String(payload.data.repoName ?? '');
                tone = 'success';
                setGitStatus((prev) => {
                    const next = applyWsGitEvent(payload.type, payload.data, prev);
                    if (next) saveGitState(next);
                    return next ?? prev;
                });
            } else if (payload.type === 'github_repo_fetch') {
                detail = String(payload.data.repoName ?? '');
                tone = 'success';
            }

            addActivity({ source: 'ws', label, detail, tone });
        },
        [addActivity, loadBranches, loadRecordings, loadRepos, selectedRepo]
    );

    const { status: wsStatus } = useWebSocket(handleWsEvent);

    useEffect(() => {
        void (async () => {
            try {
                const on = await getRecordingStatus();
                setRecordingOn(on);
            } catch {
                addActivity({ source: 'system', label: 'Could not reach camera API', tone: 'error' });
            }
        })();
        void loadRepos();
        void loadRecordings();
    }, [addActivity, loadRecordings, loadRepos]);

    useEffect(() => {
        void loadBranches(selectedRepo);
    }, [selectedRepo, loadBranches]);

    const runAction = async (
        action: string,
        label: string,
        fn: () => Promise<{ message: string; data?: unknown }>,
        onSuccess?: (data: unknown) => void
    ) => {
        setBusyAction(action);
        setErrorBanner('');
        try {
            const result = await fn();
            addActivity({ source: 'api', label: result.message, tone: 'success' });
            const output = extractCommandOutput(result.data);
            if (output) appendTerminal(formatCommandOutput(label, output));
            onSuccess?.(result.data);
            return true;
        } catch (error) {
            const message = error instanceof Error ? error.message : 'Action failed';
            addActivity({ source: 'api', label, detail: message, tone: 'error' });
            setErrorBanner(message);
            if (error instanceof ApiError) {
                const output = extractCommandOutput(error.data);
                if (output) appendTerminal(formatCommandOutput(label, output));
            }
            return false;
        } finally {
            setBusyAction(null);
        }
    };

    const handleClone = () => {
        const name = cloneName;
        void runAction(
            'clone',
            `git clone ${name}`,
            async () => {
                const result = await cloneRepo(name);
                setCloneName('');
                await loadRepos();
                setSelectedRepo(name);
                return result;
            },
            (data) => {
                const repoName = (data as { repoName?: string })?.repoName ?? name;
                updateGitStatus(gitStateFromClone(repoName));
            }
        );
    };

    const handleCheckout = () =>
        void runAction('checkout', `git checkout ${selectedBranch}`, () =>
            checkoutBranch(selectedRepo, selectedBranch),
            (data) => {
                const d = data as { repoName?: string; branch?: string };
                updateGitStatus(gitStateFromCheckout(d.repoName ?? selectedRepo, d.branch ?? selectedBranch));
            }
        ).then((ok) => {
            if (ok) void loadBranches(selectedRepo);
        });

    const handlePull = () =>
        void runAction('pull', `git pull ${selectedRepo}`, () => pullRepo(selectedRepo), () => {
            setGitStatus((prev) => {
                const next = gitStateFromPull(selectedRepo, prev);
                saveGitState(next);
                return next;
            });
        });
    const handleFetch = () => void runAction('fetch', `git fetch ${selectedRepo}`, () => fetchRepo(selectedRepo));
    const handleBuild = () => void runAction('build', `./gradlew build (${selectedRepo})`, () => buildRepo(selectedRepo));
    const handleDeploy = () =>
        void runAction('deploy', `./gradlew deploy (${selectedRepo})`, () => deployRepo(selectedRepo));

    const handleStartRecording = async () => {
        setCameraBusy(true);
        try {
            await startRecording();
            setRecordingOn(true);
            addActivity({ source: 'api', label: 'Recording started', tone: 'success' });
        } catch (error) {
            addActivity({
                source: 'api',
                label: 'Failed to start recording',
                detail: error instanceof Error ? error.message : undefined,
                tone: 'error',
            });
        } finally {
            setCameraBusy(false);
        }
    };

    const handleStopRecording = async () => {
        setCameraBusy(true);
        try {
            await stopRecording();
            setRecordingOn(false);
            setStreamActive(false);
            setStreamUrl('');
            addActivity({ source: 'api', label: 'Recording stopped', tone: 'neutral' });
            void loadRecordings();
        } catch (error) {
            addActivity({
                source: 'api',
                label: 'Failed to stop recording',
                detail: error instanceof Error ? error.message : undefined,
                tone: 'error',
            });
        } finally {
            setCameraBusy(false);
        }
    };

    const handleStartStream = () => {
        setStreamUrl(liveStreamUrl());
        setStreamActive(true);
        addActivity({ source: 'api', label: 'Live stream started', tone: 'info' });
    };

    const handleStopStream = () => {
        setStreamUrl('');
        setStreamActive(false);
        addActivity({ source: 'api', label: 'Live stream stopped', tone: 'neutral' });
    };

    const isBusy = busyAction !== null;

    return (
        <div className="app">
            <Header wsStatus={wsStatus} theme={theme} gitStatus={gitStatus} onToggleTheme={toggleTheme} />
            {isBusy && (
                <div className="busy-bar">
                    <div className="busy-bar__fill" />
                </div>
            )}
            {errorBanner && <div className="alert">{errorBanner}</div>}

            <div className="layout">
                <ControlPanel
                    repos={repos}
                    branches={branches}
                    selectedRepo={selectedRepo}
                    selectedBranch={selectedBranch}
                    cloneName={cloneName}
                    loadingRepos={loadingRepos}
                    loadingBranches={loadingBranches}
                    busyAction={busyAction}
                    onSelectRepo={setSelectedRepo}
                    onSelectBranch={setSelectedBranch}
                    onCloneNameChange={setCloneName}
                    onRefreshRepos={() => void loadRepos()}
                    onClone={handleClone}
                    onCheckout={handleCheckout}
                    onPull={handlePull}
                    onFetch={handleFetch}
                    onBuild={handleBuild}
                    onDeploy={handleDeploy}
                />

                <main className="main">
                    <CameraPanel
                        recordingOn={recordingOn}
                        streamActive={streamActive}
                        streamUrl={streamUrl}
                        recordings={recordings}
                        selectedRecording={selectedRecording}
                        cameraBusy={cameraBusy}
                        onStartRecording={() => void handleStartRecording()}
                        onStopRecording={() => void handleStopRecording()}
                        onStartStream={handleStartStream}
                        onStopStream={handleStopStream}
                        onRefreshRecordings={() => void loadRecordings()}
                        onSelectRecording={setSelectedRecording}
                    />

                    <OutputPanel
                        activity={activity}
                        terminalText={terminalText}
                        onClearTerminal={() => setTerminalText('')}
                    />
                </main>
            </div>
        </div>
    );
}
