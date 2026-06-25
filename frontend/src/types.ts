export type Theme = 'light' | 'dark';

export type ApiResponse<T = unknown> = {
    message: string;
    error?: string;
    data?: T;
};

export type CommandOutput = {
    code: number;
    signal: string | null;
    stdout: string;
    stderr: string;
};

export type GitState = {
    repoName: string | null;
    branch: string | null;
    pulled: boolean;
};

export type WsEventType =
    | 'recording_status'
    | 'github_repo_clone'
    | 'branch_checkout'
    | 'github_repo_pull'
    | 'github_repo_fetch';

export type WsPayload = {
    type: WsEventType;
    data: Record<string, unknown>;
};

export type ActivityEntry = {
    id: string;
    time: Date;
    source: 'ws' | 'api' | 'system';
    label: string;
    detail?: string;
    tone: 'neutral' | 'success' | 'error' | 'info';
};
