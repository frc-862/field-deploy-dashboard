type ControlPanelProps = {
    repos: string[];
    branches: string[];
    selectedRepo: string;
    selectedBranch: string;
    cloneName: string;
    loadingRepos: boolean;
    loadingBranches: boolean;
    busyAction: string | null;
    onSelectRepo: (repo: string) => void;
    onSelectBranch: (branch: string) => void;
    onCloneNameChange: (name: string) => void;
    onRefreshRepos: () => void;
    onClone: () => void;
    onCheckout: () => void;
    onPull: () => void;
    onFetch: () => void;
    onBuild: () => void;
    onDeploy: () => void;
};

export function ControlPanel({
    repos,
    branches,
    selectedRepo,
    selectedBranch,
    cloneName,
    loadingRepos,
    loadingBranches,
    busyAction,
    onSelectRepo,
    onSelectBranch,
    onCloneNameChange,
    onRefreshRepos,
    onClone,
    onCheckout,
    onPull,
    onFetch,
    onBuild,
    onDeploy,
}: ControlPanelProps) {
    const gitBusy = busyAction === 'checkout' || busyAction === 'pull' || busyAction === 'fetch' || busyAction === 'clone';
    const deployBusy = busyAction === 'build' || busyAction === 'deploy';

    return (
        <aside className="sidebar">
            <section className="panel">
                <h2 className="panel__title panel__title--blue">Repository</h2>

                <div className="field">
                    <label htmlFor="repo-select">Local repos</label>
                    <select
                        id="repo-select"
                        value={selectedRepo}
                        onChange={(e) => onSelectRepo(e.target.value)}
                        disabled={loadingRepos || repos.length === 0}
                    >
                        {repos.length === 0 ? (
                            <option value="">No repos cloned</option>
                        ) : (
                            repos.map((repo) => (
                                <option key={repo} value={repo}>
                                    {repo}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className="btn-row">
                    <button type="button" className="btn btn--ghost" onClick={onRefreshRepos} disabled={loadingRepos}>
                        Refresh
                    </button>
                </div>

                <p className="hint">Clone a new repo from github.com/frc-862</p>
                <div className="clone-row">
                    <input
                        type="text"
                        placeholder="repo-name"
                        value={cloneName}
                        onChange={(e) => onCloneNameChange(e.target.value.trim())}
                        disabled={busyAction === 'clone'}
                    />
                    <button
                        type="button"
                        className="btn btn--blue"
                        onClick={onClone}
                        disabled={!cloneName || busyAction === 'clone'}
                    >
                        Clone
                    </button>
                </div>
            </section>

            <section className="panel">
                <h2 className="panel__title panel__title--blue">Git</h2>

                <div className="field">
                    <label htmlFor="branch-select">Branch</label>
                    <select
                        id="branch-select"
                        value={selectedBranch}
                        onChange={(e) => onSelectBranch(e.target.value)}
                        disabled={!selectedRepo || loadingBranches || branches.length === 0}
                    >
                        {branches.length === 0 ? (
                            <option value="">{loadingBranches ? 'Loading…' : 'No branches'}</option>
                        ) : (
                            branches.map((branch) => (
                                <option key={branch} value={branch}>
                                    {branch}
                                </option>
                            ))
                        )}
                    </select>
                </div>

                <div className="btn-row">
                    <button
                        type="button"
                        className="btn btn--blue"
                        onClick={onCheckout}
                        disabled={!selectedRepo || !selectedBranch || gitBusy}
                    >
                        Checkout
                    </button>
                    <button type="button" className="btn btn--blue" onClick={onPull} disabled={!selectedRepo || gitBusy}>
                        Pull
                    </button>
                    <button type="button" className="btn btn--blue" onClick={onFetch} disabled={!selectedRepo || gitBusy}>
                        Fetch
                    </button>
                </div>
            </section>

            <section className="panel">
                <h2 className="panel__title panel__title--orange">Deploy</h2>
                <p className="hint">
                    {selectedRepo ? `Target: ${selectedRepo}` : 'Select a repository first'}
                </p>
                <div className="btn-row">
                    <button
                        type="button"
                        className="btn btn--orange"
                        onClick={onBuild}
                        disabled={!selectedRepo || deployBusy}
                    >
                        {busyAction === 'build' ? 'Building…' : 'Build'}
                    </button>
                    <button
                        type="button"
                        className="btn btn--orange"
                        onClick={onDeploy}
                        disabled={!selectedRepo || deployBusy}
                    >
                        {busyAction === 'deploy' ? 'Deploying…' : 'Deploy'}
                    </button>
                </div>
            </section>
        </aside>
    );
}
