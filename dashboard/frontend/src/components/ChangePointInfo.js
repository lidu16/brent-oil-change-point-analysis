// ============================================================
// CHANGE POINT INFO COMPONENT
// ============================================================
// Displays the detected change point impact

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ChangePointInfo() {
    const [cpData, setCpData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/change_point')
            .then(res => {
                setCpData(res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error fetching change point:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading change point data...</div>;
    }

    if (!cpData || cpData.error) {
        return (
            <div style={{ padding: '20px', backgroundColor: '#fef2f2', borderRadius: '8px' }}>
                <p>⚠️ No change point detected yet.</p>
            </div>
        );
    }

    const isPositive = cpData.price_change > 0;

    return (
        <div style={{ 
            padding: '20px', 
            backgroundColor: '#f0fdf4', 
            borderRadius: '8px',
            border: '1px solid #bbf7d0'
        }}>
            <h3>📊 Change Point Impact</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Change Date</div>
                    <div style={{ fontWeight: 'bold' }}>{cpData.change_point_date}</div>
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Price Before</div>
                    <div style={{ fontWeight: 'bold' }}>${cpData.price_before?.toFixed(2)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Price After</div>
                    <div style={{ fontWeight: 'bold' }}>${cpData.price_after?.toFixed(2)}</div>
                </div>
                <div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Change</div>
                    <div style={{ 
                        fontWeight: 'bold', 
                        color: isPositive ? '#16a34a' : '#dc2626' 
                    }}>
                        {isPositive ? '+' : ''}{cpData.price_change?.toFixed(2)} 
                        ({isPositive ? '+' : ''}{cpData.percent_change?.toFixed(1)}%)
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePointInfo;