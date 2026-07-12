// ============================================================
// PRICE CHART COMPONENT
// ============================================================
// Displays Brent oil price with change point and event markers

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid,
    Tooltip, Legend, ReferenceLine, ResponsiveContainer
} from 'recharts';

function PriceChart() {
    const [data, setData] = useState([]);
    const [changePoint, setChangePoint] = useState(null);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch price data
        axios.get('http://localhost:5000/api/prices')
            .then(res => {
                const formatted = res.data.dates.map((date, i) => ({
                    date: date,
                    price: res.data.prices[i]
                }));
                setData(formatted);
            })
            .catch(err => console.error('Error fetching prices:', err));

        // Fetch change point
        axios.get('http://localhost:5000/api/change_point')
            .then(res => {
                if (res.data.change_point_date) {
                    setChangePoint(res.data.change_point_date);
                }
            })
            .catch(err => console.error('Error fetching change point:', err));

        // Fetch events
        axios.get('http://localhost:5000/api/events')
            .then(res => {
                setEvents(res.data);
            })
            .catch(err => console.error('Error fetching events:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div style={{ textAlign: 'center', padding: '50px' }}>Loading chart data...</div>;
    }

    // Find the data point closest to the change point date
    let changePointData = null;
    if (changePoint) {
        const cpDate = new Date(changePoint).toISOString().split('T')[0];
        changePointData = data.find(d => d.date === cpDate);
    }

    return (
        <div style={{ width: '100%', height: 450 }}>
            <h3>Brent Oil Price History (1987-2022)</h3>
            <ResponsiveContainer width="100%" height="90%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis 
                        dataKey="date" 
                        tick={{ fontSize: 10 }}
                        interval="preserveStartEnd"
                    />
                    <YAxis 
                        label={{ value: 'Price (USD/barrel)', angle: -90, position: 'insideLeft' }}
                    />
                    <Tooltip />
                    <Legend />
                    
                    {/* Price Line */}
                    <Line 
                        type="monotone" 
                        dataKey="price" 
                        stroke="#2563eb" 
                        dot={false} 
                        strokeWidth={1.5}
                        name="Brent Oil Price"
                    />
                    
                    {/* Change Point Reference Line */}
                    {changePointData && (
                        <ReferenceLine 
                            x={changePointData.date} 
                            stroke="red" 
                            strokeDasharray="5 5"
                            label={{ value: 'Change Point', position: 'top', fill: 'red', fontSize: 12 }}
                        />
                    )}
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

export default PriceChart;