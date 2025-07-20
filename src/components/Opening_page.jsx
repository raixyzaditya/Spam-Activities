import { useState } from "react";
const Opening_page = () => {
    const [message, setMessage] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        setLoading(true);

        try {
            // Replace with your actual API call
            const response = await fetch('http://localhost:5000/api/spam-detection', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Error:', error);
            setResult({ isSpam: false, error: 'Failed to analyze message' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="spam-detector-container">
            <header className="jpm-header">
                <div className="jpm-logo">
                    <span className="jpm-logo-text">V-R Security</span>
                </div>
                <h1>Message Security Analyzer</h1>
            </header>

            <main className="detector-main">
                <div className="detector-card">
                    <h2>Spam Detection System</h2>
                    <p className="subtitle">
                        Analyze messages for potential spam or phishing attempts to protect our financial ecosystem
                    </p>

                    <form onSubmit={handleSubmit} className="detector-form">
                        <div className="form-group">
                            <label htmlFor="message">Enter message to analyze:</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Paste message content here..."
                                rows="6"
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" disabled={loading} className="analyze-btn">
                            {loading ? (
                                <>
                                    <span className="spinner"></span> Analyzing...
                                </>
                            ) : (
                                'Analyze Message'
                            )}
                        </button>
                    </form>

                    {result && (
                        <div className={`result-card ${result.isSpam ? 'spam' : 'ham'}`}>
                            <h3>
                                {result.isSpam ? (
                                    <>
                                        <span className="icon danger">⚠️</span> Spam Detected
                                    </>
                                ) : (
                                    <>
                                        <span className="icon safe">✓</span> Legitimate Message
                                    </>
                                )}
                            </h3>
                            {result.confidence && (
                                <p>Confidence: {(result.confidence * 100).toFixed(2)}%</p>
                            )}
                            {result.reasons && result.reasons.length > 0 && (
                                <div className="reasons">
                                    <h4>Detection Reasons:</h4>
                                    <ul>
                                        {result.reasons.map((reason, index) => (
                                            <li key={index}>{reason}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="info-section">
                        <h3>About This System</h3>
                        <p>
                            This AI-powered system helps identify potentially harmful messages
                            including spam, phishing attempts, and fraudulent communications.
                        </p>
                        <div className="features">
                            <div className="feature">
                                <div className="feature-icon">🔍</div>
                                <p>Advanced pattern recognition</p>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">🤖</div>
                                <p>Machine learning models</p>
                            </div>
                            <div className="feature">
                                <div className="feature-icon">🛡️</div>
                                <p>Real-time protection</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="jpm-footer">
                <p>© {new Date().getFullYear()} JPMorgan Chase & Co. All rights reserved.</p>
                <p className="security-note">
                    <span className="lock-icon">🔒</span> All analyses are performed securely
                </p>
            </footer>
        </div>
    )
}
export default Opening_page