import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventList() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/events')
            .then(res => {
                setEvents(res.data);
            })
            .catch(err => console.error('Error fetching events:', err))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return <div>Loading events...</div>;
    }

    return (
        <div>
            <h3>📌 Major Events and Market Shocks</h3>
            <div style={{ display: 'grid', gap: '12px', marginTop: '12px' }}>
                {events.map((event, idx) => (
                    <div key={idx} className="event-card" style={{ border: '1px solid #e5e7eb', borderRadius: '8px', padding: '12px' }}>
                        <div style={{ fontSize: '12px', color: '#6b7280', marginBottom: '4px' }}>{event.date}</div>
                        <div style={{ fontWeight: '600' }}>{event.event_name}</div>
                        <div style={{ fontSize: '13px', color: '#4b5563', marginTop: '4px' }}>{event.description}</div>
                        <div style={{ fontSize: '12px', color: '#2563eb', marginTop: '6px' }}>{event.category}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default EventList;
