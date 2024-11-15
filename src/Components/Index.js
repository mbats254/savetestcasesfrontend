import React from 'react';

function DownloadButton() {
    const downloadUrl = "http://127.0.0.1:8000/test/download-testcases/";
    const navigateUrl = "http://localhost:3000/test/case/1";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
            <a href={downloadUrl} download>
                <button style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Download Test Cases
                </button>
            </a>
            <a href={navigateUrl}>
                <button style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#2196F3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Go to Test Case
                </button>
                
            </a>
        </div>
    );
}

export default DownloadButton;
