import type { GitState, WsEventType } from './types';

const GIT_STATE_KEY = '862-git-state';

export const defaultGitState = (): GitState => ({
    repoName: null,
    branch: null,
    pulled: false,
});

export function loadGitState(): GitState {
    try {
        const raw = localStorage.getItem(GIT_STATE_KEY);
        if (!raw) return defaultGitState();
        const parsed = JSON.parse(raw) as GitState;
        return {
            repoName: parsed.repoName ?? null,
            branch: parsed.branch ?? null,
            pulled: Boolean(parsed.pulled),
        };
    } catch {
        return defaultGitState();
    }
}

export function saveGitState(state: GitState): void {
    localStorage.setItem(GIT_STATE_KEY, JSON.stringify(state));
}

export function applyWsGitEvent(type: WsEventType, data: Record<string, unknown>, prev: GitState): GitState | null {
    switch (type) {
        case 'branch_checkout':
            return {
                repoName: String(data.repoName ?? ''),
                branch: String(data.branch ?? ''),
                pulled: false,
            };
        case 'github_repo_pull':
            return {
                repoName: String(data.repoName ?? prev.repoName ?? ''),
                branch: prev.repoName === String(data.repoName) ? prev.branch : null,
                pulled: true,
            };
        case 'github_repo_clone':
            return {
                repoName: String(data.repoName ?? ''),
                branch: null,
                pulled: false,
            };
        default:
            return null;
    }
}

export function gitStateFromCheckout(repoName: string, branch: string): GitState {
    return { repoName, branch, pulled: false };
}

export function gitStateFromPull(repoName: string, prev: GitState): GitState {
    return {
        repoName,
        branch: prev.repoName === repoName ? prev.branch : null,
        pulled: true,
    };
}

export function gitStateFromClone(repoName: string): GitState {
    return { repoName, branch: null, pulled: false };
}
