# Brent Oil Price Change Point Analysis

## Overview
This project studies how major geopolitical, macroeconomic, and policy events influence Brent oil prices from 1987 to 2022. The workflow combines exploratory data analysis, event cataloguing, Bayesian change-point detection, and an interactive dashboard for stakeholders.

## Project Goals
1. Identify major historical events that reshaped Brent oil price regimes.
2. Quantify structural breaks in price behaviour using Bayesian change-point analysis.
3. Present the findings through a lightweight Flask and React dashboard.

## Analysis Workflow
1. Load and clean the Brent price series.
2. Explore trend, stationarity, and volatility characteristics.
3. Build a change-point model for the mean level of log prices.
4. Compare detected change points with a curated event calendar.
5. Visualize the results in the dashboard and document the findings.

## Assumptions and Limitations
- The study uses historical time series data and event dates as approximate markers, so it is best interpreted as a statistical association rather than proof of causality.
- The simple change-point model focuses on mean shifts and does not yet include economic covariates such as GDP, inflation, exchange rates, or supply-demand balances.
- Event timing is approximate and may overlap with other shocks, which can make attribution noisy.

## Data Files
- data/BrentOilPrices.csv: daily Brent price observations.
- data/events.csv: curated list of geopolitical, economic, and OPEC-related events.
- data/brent_oil_with_returns.csv: price series with log returns.
- data/change_point_results.csv: summary output from the change-point analysis.

## Run Locally
```bash
pip install -r requirements.txt
python src/analysis.py
python dashboard/backend/app.py
```

In a second terminal:
```bash
cd dashboard/frontend
npm start
```

## Tests
```bash
python -m unittest discover -s tests -p 'test*.py'
```
