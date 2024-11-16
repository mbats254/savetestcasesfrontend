import React from 'react';

function DownloadButton() {
    const downloadTestCasesUrl = "http://127.0.0.1:8000/test/download-testcases/";
    const navigateUrl = "http://localhost:3000/test/case/1";
    const downloadJsonTestCasesUrl = "http://127.0.0.1:8000/test/download-testcases-json/";
    const downloadByCategoryUrl = "http://127.0.0.1:8000/test/download-testcases-by-category/";

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', gap: '20px' }}>
            <a href={downloadTestCasesUrl} download>
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
            <a href={downloadJsonTestCasesUrl} download>
                <button style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#FF9800',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Download JSON Test Cases
                </button>
            </a>
            <a href={downloadByCategoryUrl} download>
                <button style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    backgroundColor: '#9C27B0',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer'
                }}>
                    Download Test Cases by Category
                </button>
            </a>
        </div>
    );
}

export default DownloadButton;
