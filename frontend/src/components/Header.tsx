import type { WsStatus } from '../hooks/useWebSocket';
import type { GitState, Theme } from '../types';

type HeaderProps = {
    wsStatus: WsStatus;
    theme: Theme;
    gitStatus: GitState;
    onToggleTheme: () => void;
};

export function Header({ wsStatus, theme, gitStatus, onToggleTheme }: HeaderProps) {
    const wsLabel = wsStatus === 'connected' ? 'Connected' : wsStatus === 'connecting' ? 'Connecting…' : 'Disconnected';

    const hasRepo = Boolean(gitStatus.repoName);
    const hasBranch = Boolean(gitStatus.branch);

    return (
        <header className="header">
            <div className="header__brand">
                <span className="header__team">FRC 862</span>
                <h1 className="header__title">Field Deploy</h1>
            </div>

            <div className="header__status" aria-live="polite">
                {hasRepo ? (
                    <>
                        <span className="git-status git-status--repo">{gitStatus.repoName}</span>
                        <span className="git-status__sep">/</span>
                        <span className="git-status git-status--branch">
                            {hasBranch ? gitStatus.branch : 'no branch'}
                        </span>
                        <span
                            className={`git-pull-badge ${gitStatus.pulled ? 'git-pull-badge--yes' : 'git-pull-badge--no'}`}
                        >
                            {gitStatus.pulled ? 'Pulled' : 'Needs pull'}
                        </span>
                    </>
                ) : (
                    <span className="git-status git-status--empty">No repo checked out</span>
                )}
            </div>

            <div className="header__actions">
                <div className={`ws-badge ws-badge--${wsStatus}`}>
                    <span className="ws-badge__dot" />
                    {wsLabel}
                </div>
                <button
                    type="button"
                    className="btn btn--ghost btn--icon"
                    onClick={onToggleTheme}
                    title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                    aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                >
                    {theme === 'light' ? '◑' : '◐'}
                </button>
            </div>
        </header>
    );
}
