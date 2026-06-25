import type { ApiResponse, CommandOutput } from './types';

export class ApiError extends Error {
    data?: unknown;

    constructor(message: string, data?: unknown) {
        super(message);
        this.name = 'ApiError';
        this.data = data;
    }
}

async function request<T>(url: string, init?: RequestInit): Promise<ApiResponse<T>> {
    const response = await fetch(url, init);
    const body = (await response.json()) as ApiResponse<T>;
    if (!response.ok) {
        throw new ApiError(body.error ?? body.message ?? `Request failed (${response.status})`, body.data);
    }
    return body;
}

export async function getRepos(): Promise<string[]> {
    const body = await request<string[]>('/github/repos');
    return body.data ?? [];
}

export async function getBranches(repo: string): Promise<string[]> {
    const body = await request<{ branches: string[] }>(`/github/repos/${encodeURIComponent(repo)}/branches`);
    return body.data?.branches ?? [];
}

export async function cloneRepo(repo: string): Promise<ApiResponse<{ repoName: string } & CommandOutput>> {
    return request(`/github/repos/${encodeURIComponent(repo)}/clone`, { method: 'POST' });
}

export async function checkoutBranch(repo: string, branch: string): Promise<ApiResponse<CommandOutput>> {
    return request(`/github/repos/${encodeURIComponent(repo)}/checkout/${encodeURIComponent(branch)}`, {
        method: 'POST',
    });
}

export async function pullRepo(repo: string): Promise<ApiResponse<CommandOutput>> {
    return request(`/github/repos/${encodeURIComponent(repo)}/pull`, { method: 'POST' });
}

export async function fetchRepo(repo: string): Promise<ApiResponse<CommandOutput>> {
    return request(`/github/repos/${encodeURIComponent(repo)}/fetch`, { method: 'POST' });
}

export async function buildRepo(repo: string): Promise<ApiResponse<CommandOutput>> {
    return request(`/wpilib/build/${encodeURIComponent(repo)}`, { method: 'POST' });
}

export async function deployRepo(repo: string): Promise<ApiResponse<CommandOutput>> {
    return request(`/wpilib/deploy/${encodeURIComponent(repo)}`, { method: 'POST' });
}

export async function getRecordingStatus(): Promise<boolean> {
    const response = await fetch('/camera/recording/status');
    if (!response.ok) throw new Error('Failed to load recording status');
    const body = (await response.json()) as { recordingOn?: boolean };
    return Boolean(body.recordingOn);
}

export async function startRecording(): Promise<void> {
    const response = await fetch('/camera/start', { method: 'POST' });
    if (!response.ok) throw new Error('Failed to start recording');
}

export async function stopRecording(): Promise<void> {
    const response = await fetch('/camera/stop', { method: 'POST' });
    if (!response.ok) throw new Error('Failed to stop recording');
}

export async function listRecordings(): Promise<string[]> {
    const response = await fetch('/camera/recording/list');
    if (!response.ok) throw new Error('Failed to list recordings');
    const body = (await response.json()) as { recordings?: string[] };
    return body.recordings ?? [];
}

export function recordingStreamUrl(filename: string): string {
    return `/camera/recording/${encodeURIComponent(filename)}/stream`;
}

export function recordingDownloadUrl(filename: string): string {
    return `/camera/recording/${encodeURIComponent(filename)}/download`;
}

export function liveStreamUrl(): string {
    return `/camera/stream?t=${Date.now()}`;
}
