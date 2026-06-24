import type { ActivityEntry } from '../types';

type OutputPanelProps = {
    activity: ActivityEntry[];
    terminalText: string;
    onClearTerminal: () => void;
};

function formatTime(date: Date): string {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
}

export function OutputPanel({ activity, terminalText, onClearTerminal }: OutputPanelProps) {
    return (
        <div className="bottom-panels">
            <section className="output-panel">
                <div className="output-panel__header">
                    <h2>Activity</h2>
                </div>
                <div className="output-panel__body">
                    {activity.length === 0 ? (
                        <p className="activity-empty">Events from WebSocket and API actions appear here.</p>
                    ) : (
                        <ul className="activity-list">
                            {activity.map((entry) => (
                                <li key={entry.id} className={`activity-item activity-item--${entry.tone}`}>
                                    <span className="activity-item__time">{formatTime(entry.time)}</span>
                                    <div>
                                        <div className="activity-item__label">{entry.label}</div>
                                        {entry.detail && <div className="activity-item__detail">{entry.detail}</div>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </section>

            <section className="output-panel">
                <div className="output-panel__header">
                    <h2>Command Output</h2>
                    <button type="button" className="btn btn--ghost" onClick={onClearTerminal}>
                        Clear
                    </button>
                </div>
                <div className="output-panel__body">
                    {terminalText ? (
                        <pre className="terminal">{terminalText}</pre>
                    ) : (
                        <pre className="terminal terminal--empty">
                            Git, Gradle build, and deploy output shows here.
                        </pre>
                    )}
                </div>
            </section>
        </div>
    );
}
