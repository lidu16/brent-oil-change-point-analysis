# Brent Oil Price Change Point Analysis

## Overview
This project analyzes how major geopolitical, macroeconomic, and policy events influence Brent oil prices from 1987 to 2022. It combines exploratory data analysis, event cataloguing, Bayesian change-point detection, and an interactive dashboard to make the findings easy to explore.

## Business Goal
The analysis helps stakeholders understand when Brent oil prices shifted into new regimes and which historical events may have contributed to those changes. The results are useful for investors, policymakers, and energy-sector analysts who need evidence-based context for price movements.

## What the Project Includes
- A cleaned Brent oil price dataset and event catalog
- Statistical analysis of price behavior and volatility
- A simple Bayesian change-point model to detect structural breaks
- A Flask backend for serving analysis results
- A React dashboard for visual exploration

## Key Findings
A sample change-point summary from the analysis indicates a major regime shift around 2003-10-30, with the average price level rising from about $20.08 to about $72.84 per barrel.

## Technology Stack
- Python: pandas, numpy, matplotlib, seaborn, PyMC, ArviZ
- Flask: API backend
- React: interactive dashboard
- Recharts: charting library

## Project Structure
- data/: price data, returns data, event data, and analysis outputs
- src/: reusable analysis helpers
- dashboard/backend/: Flask API service
- dashboard/frontend/: React dashboard
- notebooks/: exploratory analysis notebook
- tests/: regression tests

## Run Locally
### Backend
```bash
pip install -r requirements.txt
python src/analysis.py
python dashboard/backend/app.py
```

### Frontend
```bash
cd dashboard/frontend
npm install
npm start
```

## Testing
```bash
python -m unittest discover -s tests -p 'test*.py'
```

## Screenshots
The following screenshots show the project dashboard and analysis experience when the app is running:

![Dashboard overview](asset/Screenshot%201.png)

![Dashboard view](asset/Screenshot%202.png)

![Event and analysis view](asset/Screenshot%203.png)

## Notes
This project is designed as a practical demonstration of change-point analysis in a business and policy context. It is best interpreted as a statistical exploration rather than proof of direct causation, since many events overlap in time and market behavior is influenced by multiple forces.

