import { useCallback, useEffect, useRef, useState } from 'react';
import type { WsEventType, WsPayload } from '../types';

export type WsStatus = 'connecting' | 'connected' | 'disconnected';

type WsHandler = (payload: WsPayload) => void;

export function useWebSocket(onEvent: WsHandler) {
    const [status, setStatus] = useState<WsStatus>('connecting');
    const handlerRef = useRef(onEvent);
    handlerRef.current = onEvent;

    const connect = useCallback(() => {
        const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
        const ws = new WebSocket(`${wsProtocol}//${window.location.host}/ws`);

        ws.onopen = () => setStatus('connected');
        ws.onclose = () => setStatus('disconnected');
        ws.onerror = () => setStatus('disconnected');

        ws.onmessage = (event) => {
            try {
                const parsed = JSON.parse(event.data as string) as { message?: WsPayload };
                if (parsed.message?.type) {
                    handlerRef.current(parsed.message);
                }
            } catch (error) {
                console.error('WebSocket message parse error:', error);
            }
        };

        return ws;
    }, []);

    useEffect(() => {
        setStatus('connecting');
        const ws = connect();

        return () => {
            ws.close();
        };
    }, [connect]);

    return { status };
}

export function wsEventLabel(type: WsEventType): string {
    switch (type) {
        case 'recording_status':
            return 'Recording status changed';
        case 'github_repo_clone':
            return 'Repository cloned';
        case 'branch_checkout':
            return 'Branch checked out';
        case 'github_repo_pull':
            return 'Repository pulled';
        case 'github_repo_fetch':
            return 'Repository fetched';
        default:
            return type;
    }
}
