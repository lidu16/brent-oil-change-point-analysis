// ============================================================
// MAIN APP COMPONENT
// ============================================================
// Combines all dashboard components

import React from 'react';
import PriceChart from './components/PriceChart';
import EventList from './components/EventList';
import ChangePointInfo from './components/ChangePointInfo';
import './App.css';

function App() {
    return (
        <div className="App">
            <header style={{
                backgroundColor: '#1e293b',
                color: 'white',
                padding: '20px',
                textAlign: 'center'
            }}>
                <h1 style={{ margin: 0 }}>🛢️ Brent Oil Price Analysis</h1>
                <p style={{ margin: '5px 0 0', opacity: 0.8 }}>
                    Change Point Detection &amp; Event Correlation (1987-2022)
                </p>
            </header>

            <main style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
                <div style={{ 
                    display: 'grid', 
                    gridTemplateColumns: '2fr 1fr', 
                    gap: '20px',
                    marginBottom: '20px'
                }}>
                    <div style={{ 
                        backgroundColor: 'white', 
                        padding: '20px', 
                        borderRadius: '8px',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                    }}>
                        <PriceChart />
                    </div>
                    <div>
                        <ChangePointInfo />
                    </div>
                </div>

                <div style={{ 
                    backgroundColor: 'white', 
                    padding: '20px', 
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                    <EventList />
                </div>

                <footer style={{ 
                    marginTop: '30px', 
                    textAlign: 'center', 
                    fontSize: '12px', 
                    color: '#6b7280' 
                }}>
                    Data Source: Brent Oil Prices (1987-2022) | 
                    Built with React + Flask | 
                    <a href="https://github.com/lidu16/brent-oil-change-point-analysis" 
                       style={{ color: '#2563eb', textDecoration: 'none' }}>
                        GitHub Repository
                    </a>
                </footer>
            </main>
        </div>
    );
}

export default App;