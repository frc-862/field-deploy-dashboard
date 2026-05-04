import * as React from 'react';

export default function App() {
    const [recordingStarted, setRecordingStarted] = React.useState(false);
    const [streamStarted, setStreamStarted] = React.useState(false);
    const [streamUrl, setStreamUrl] = React.useState('');
    const [statusMessage, setStatusMessage] = React.useState('');
    const streamImgRef = React.useRef<HTMLImageElement | null>(null);

    React.useEffect(() => {
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

    const startRecording = async () => {
        setStatusMessage('');
        try {
            const response = await fetch('/camera/start', { method: 'POST' });
            if (!response.ok) {
                throw new Error('Failed to start recording');
            }
            setRecordingStarted(true);
            setStatusMessage('Recording started');
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
            stopStream();
            setRecordingStarted(false);
            setStatusMessage('Recording stopped');
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
            <p>
                Use the controls below to start/stop recording and then start the live camera stream.
            </p>
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
