import { useRef } from 'react';
import { recordingDownloadUrl, recordingStreamUrl } from '../api';

type CameraPanelProps = {
    recordingOn: boolean;
    streamActive: boolean;
    streamUrl: string;
    recordings: string[];
    selectedRecording: string;
    cameraBusy: boolean;
    onStartRecording: () => void;
    onStopRecording: () => void;
    onStartStream: () => void;
    onStopStream: () => void;
    onRefreshRecordings: () => void;
    onSelectRecording: (filename: string) => void;
};

export function CameraPanel({
    recordingOn,
    streamActive,
    streamUrl,
    recordings,
    selectedRecording,
    cameraBusy,
    onStartRecording,
    onStopRecording,
    onStartStream,
    onStopStream,
    onRefreshRecordings,
    onSelectRecording,
}: CameraPanelProps) {
    const streamImgRef = useRef<HTMLImageElement | null>(null);

    return (
        <>
            <section className="camera-section">
                <div className="camera-section__header">
                    <h2>Live Camera</h2>
                    <span className={`rec-badge ${recordingOn ? 'rec-badge--on' : 'rec-badge--off'}`}>
                        {recordingOn ? '● REC' : 'Standby'}
                    </span>
                </div>

                <div className="camera-viewport">
                    {streamActive && streamUrl ? (
                        <img ref={streamImgRef} src={streamUrl} alt="Live camera feed" />
                    ) : (
                        <p className="camera-placeholder">
                            {recordingOn
                                ? 'Recording active — start stream to view live feed'
                                : 'Start recording to enable camera'}
                        </p>
                    )}
                </div>

                <div className="camera-controls">
                    <button
                        type="button"
                        className="btn btn--orange"
                        onClick={onStartRecording}
                        disabled={recordingOn || cameraBusy}
                    >
                        Start Recording
                    </button>
                    <button
                        type="button"
                        className="btn"
                        onClick={onStopRecording}
                        disabled={!recordingOn || cameraBusy}
                    >
                        Stop Recording
                    </button>
                    <button
                        type="button"
                        className="btn btn--blue"
                        onClick={onStartStream}
                        disabled={!recordingOn || streamActive}
                    >
                        Start Stream
                    </button>
                    <button type="button" className="btn" onClick={onStopStream} disabled={!streamActive}>
                        Stop Stream
                    </button>
                </div>
            </section>

            <section className="recordings-section">
                <div className="recordings-section__header">
                    <h2>Saved Recordings</h2>
                </div>

                {recordings.length === 0 ? (
                    <p className="recordings-empty">No recordings yet. Start recording to capture match footage.</p>
                ) : (
                    <div className="recordings-body">
                        <ul className="recordings-list">
                            {recordings.map((filename) => (
                                <li key={filename}>
                                    <button
                                        type="button"
                                        className={selectedRecording === filename ? 'active' : ''}
                                        onClick={() => onSelectRecording(filename)}
                                    >
                                        {filename}
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {selectedRecording && (
                            <div className="recordings-player">
                                <video key={selectedRecording} controls src={recordingStreamUrl(selectedRecording)} />
                                <div className="btn-row">
                                    <a
                                        className="btn btn--blue"
                                        href={recordingDownloadUrl(selectedRecording)}
                                        download={selectedRecording}
                                    >
                                        Download
                                    </a>
                                    <button type="button" className="btn btn--ghost" onClick={onRefreshRecordings}>
                                        Refresh list
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </section>
        </>
    );
}
