from flask import Flask, jsonify
from flask_cors import CORS
from pathlib import Path
import pandas as pd
import sys

sys.path.append(str(Path(__file__).resolve().parents[2]))
from src.analysis import load_brent_data, load_event_data, build_returns, build_change_point_summary

app = Flask(__name__)
CORS(app)

ROOT = Path(__file__).resolve().parents[2]
DATA_DIR = ROOT / "data"


@app.route('/api/prices')
def prices():
    df = load_brent_data(DATA_DIR / 'BrentOilPrices.csv')
    return jsonify({
        'dates': [d.strftime('%Y-%m-%d') for d in df['Date']],
        'prices': [float(v) for v in df['Price']]
    })


@app.route('/api/returns')
def returns():
    df = build_returns(load_brent_data(DATA_DIR / 'BrentOilPrices.csv'))
    return jsonify({
        'dates': [d.strftime('%Y-%m-%d') for d in df['Date']],
        'returns': [float(v) for v in df['Log_Return'] if pd.notna(v)]
    })


@app.route('/api/events')
def events():
    events_df = load_event_data(DATA_DIR / 'events.csv')
    return jsonify([
        {
            'date': row['Date'].strftime('%Y-%m-%d'),
            'event_name': row['Event_Name'],
            'description': row['Description'],
            'category': row['Category']
        }
        for _, row in events_df.iterrows()
    ])


@app.route('/api/change_point')
def change_point():
    df = load_brent_data(DATA_DIR / 'BrentOilPrices.csv')
    summary = build_change_point_summary(df)
    return jsonify(summary)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
