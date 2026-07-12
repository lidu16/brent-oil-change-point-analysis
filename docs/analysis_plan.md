# Analysis Plan for Brent Oil Price Change Point Study

## 1. Workflow Overview
1. Load Brent oil price data and parse the date column into a proper datetime format.
2. Explore the series for trend, volatility clustering, and structural breaks.
3. Transform the price series to log returns to examine short-term shocks and regime changes.
4. Use a Bayesian change-point model to estimate the most likely structural break date.
5. Compare the detected break with major geopolitical, OPEC, and macroeconomic events.
6. Summarize the estimated mean shift and communicate the findings through the dashboard.

## 2. Assumptions
- The dataset is treated as a single daily price series with no missing values after cleaning.
- Approximate event dates are used as context rather than as exact causal triggers.
- The statistical model focuses on changes in the average level of the series, not on all possible market drivers.

## 3. Limitations
- A statistical break does not prove causality; it only shows that the data support a change in regime.
- Overlapping events may make it difficult to attribute a break to a single cause.
- Future extensions should include macroeconomic covariates such as inflation, exchange rates, and production data.

## 4. Expected Outputs
- A list of candidate change-point dates.
- Posterior summaries for the pre-change and post-change mean levels.
- A narrative linking major events to the detected shifts in a cautious, evidence-based way.
