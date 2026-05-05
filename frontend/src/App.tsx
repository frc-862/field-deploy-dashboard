import * as React from 'react';
import { useState, useEffect, useRef } from 'react';

export default function App() {
    const [recordingStarted, setRecordingStarted] = useState(false);
    const [streamStarted, setStreamStarted] = useState(false);
    const [streamUrl, setStreamUrl] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const streamImgRef = useRef<HTMLImageElement | null>(null);

    const socketRef = useRef<WebSocket | null>(null);

    useEffect(() => {
        const loadRecordingStatus = async () => {
            try {
                const response = await fetch('/camera/recording/status');
                if (!response.ok) {
                    throw new Error('Failed to load recording status');
                }

                const data = (await response.json()) as { recordingOn?: boolean };
                const isRecordingOn = Boolean(data.recordingOn);
                setRecordingStarted(isRecordingOn);
                if (!isRecordingOn) {
                    stopStream();
                }
            } catch (error) {
                console.error(error);
                setStatusMessage('Could not load recording status');
            }
        };

        void loadRecordingStatus();
    }, []);

    useEffect(() => {
            const wsHost = window.location.hostname;
const ws = new WebSocket(`ws://${wsHost}:3001`);
    socketRef.current = ws;

        ws.onmessage = (event) => {
            const message = event.data;
            console.log('[FRONTEND] Received WebSocket message:', message);
            if (message === 'recordingStarted') {
                setRecordingStarted(true);
                setStatusMessage('Recording started');
            } else if (message === 'recordingStopped') {
                setRecordingStarted(false);
                stopStream();
                setStatusMessage('Recording stopped');
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        return () => {
            ws.close();
        };
    }, []);

    const startRecording = async () => {
        setStatusMessage('');
        try {
            const response = await fetch('/camera/start', { method: 'POST' });
            if (!response.ok) {
                throw new Error('Failed to start recording');
            }
            setRecordingStarted(true);
            setStatusMessage('Recording started');
            socketRef.current != null ? socketRef.current.send('recordingStarted') : console.warn('WebSocket not connected, cannot send recordingStarted message');
        } catch (error) {
            console.error(error);
            setStatusMessage('Could not start recording');
        }
    };

    const stopRecording = async () => {
        setStatusMessage('');
        try {
            const response = await fetch('/camera/stop', { method: 'POST' });
            
            if (!response.ok) {
                throw new Error('Failed to stop recording');
            }
            setRecordingStarted(false);
            stopStream();
            setStatusMessage('Recording stopped');
            socketRef.current != null ? socketRef.current.send('recordingStopped') : console.warn('WebSocket not connected, cannot send recordingStopped message');
        } catch (error) {
            console.error(error);
            setStatusMessage('Could not stop recording');
        }
    };

    const startStream = () => {
        setStreamUrl(`/camera/stream?t=${Date.now()}`);
        setStreamStarted(true);
        setStatusMessage('Stream started');
    };

    const stopStream = () => {
        if (streamImgRef.current) {
            // Clear src first so browser closes the streaming request immediately.
            streamImgRef.current.src = '';
        }
        setStreamUrl('');
        setStreamStarted(false);
        setStatusMessage('Stream stopped');
    };

    return (
        <div style={{ fontFamily: 'sans-serif', padding: 20 }}>
            <h1>Field Deploy Dashboard</h1>
            <p>Use the controls below to start/stop recording and then start the live camera stream.</p>
            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <button type="button" onClick={startRecording} disabled={recordingStarted}>
                    Start Recording
                </button>
                <button type="button" onClick={stopRecording} disabled={!recordingStarted}>
                    Stop Recording
                </button>
                {recordingStarted && (
                    <>
                        <button type="button" onClick={startStream} disabled={streamStarted}>
                            Start Stream
                        </button>
                        <button type="button" onClick={stopStream} disabled={!streamStarted}>
                            Stop Stream
                        </button>
                    </>
                )}
            </div>
            {statusMessage && <p>{statusMessage}</p>}
            {streamStarted && <img ref={streamImgRef} src={streamUrl} alt="camera stream" id="snapshot" />}
        </div>
    );
}
