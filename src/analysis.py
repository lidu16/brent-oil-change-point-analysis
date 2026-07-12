from pathlib import Path

import numpy as np
import pandas as pd


ROOT = Path(__file__).resolve().parents[1]
DATA_DIR = ROOT / "data"


def load_brent_data(path: str | None = None) -> pd.DataFrame:
    data_path = Path(path) if path else DATA_DIR / "BrentOilPrices.csv"
    df = pd.read_csv(data_path)
    df["Date"] = pd.to_datetime(df["Date"], format="%d-%b-%y", errors="coerce")
    df = df.dropna(subset=["Date"]).sort_values("Date").reset_index(drop=True)
    df["Price"] = pd.to_numeric(df["Price"], errors="coerce")
    df = df.dropna(subset=["Price"]).reset_index(drop=True)
    return df


def load_event_data(path: str | None = None) -> pd.DataFrame:
    data_path = Path(path) if path else DATA_DIR / "events.csv"
    events = pd.read_csv(data_path)
    events["Date"] = pd.to_datetime(events["Date"], errors="coerce")
    events = events.dropna(subset=["Date"]).sort_values("Date").reset_index(drop=True)
    return events


def build_returns(df: pd.DataFrame) -> pd.DataFrame:
    result = df.copy()
    result["Log_Return"] = np.log(result["Price"]).diff()
    return result


def build_change_point_summary(df: pd.DataFrame) -> dict:
    if df.empty:
        return {"error": "No price data available"}

    prices = df["Price"].to_numpy()
    midpoint = len(prices) // 2
    mean_before = float(np.mean(prices[:midpoint]))
    mean_after = float(np.mean(prices[midpoint:]))
    change = mean_after - mean_before
    percent_change = (change / mean_before * 100.0) if mean_before else 0.0
    change_date = df.iloc[midpoint]["Date"].strftime("%Y-%m-%d")

    return {
        "change_point_date": change_date,
        "price_before": mean_before,
        "price_after": mean_after,
        "price_change": change,
        "percent_change": percent_change,
    }


def fit_bayesian_change_point(df: pd.DataFrame, draws: int = 400, tune: int = 300) -> dict:
    import arviz as az
    import pymc as pm

    if len(df) < 50:
        raise ValueError("At least 50 observations are required for the Bayesian model")

    log_prices = np.log(df["Price"].to_numpy())
    time_index = np.arange(len(log_prices))

    with pm.Model() as model:
        tau = pm.DiscreteUniform("tau", lower=0, upper=len(log_prices) - 1)
        mu1 = pm.Normal("mu1", mu=float(np.mean(log_prices)), sigma=2.0)
        mu2 = pm.Normal("mu2", mu=float(np.mean(log_prices)), sigma=2.0)
        sigma = pm.HalfNormal("sigma", sigma=1.0)
        mean = pm.math.switch(time_index < tau, mu1, mu2)
        pm.Normal("obs", mu=mean, sigma=sigma, observed=log_prices)
        idata = pm.sample(draws=draws, tune=tune, chains=2, cores=1, progressbar=False, random_seed=42, init="auto")

    summary = az.summary(idata, var_names=["tau", "mu1", "mu2", "sigma"])
    return {"summary": summary.to_dict(), "idata": idata}


def ensure_analysis_outputs() -> None:
    brent = load_brent_data()
    returns = build_returns(brent)
    returns.to_csv(DATA_DIR / "brent_oil_with_returns.csv", index=False)
    events = load_event_data()
    events.to_csv(DATA_DIR / "events.csv", index=False)
    change_point = build_change_point_summary(brent)
    pd.DataFrame([change_point]).to_csv(DATA_DIR / "change_point_results.csv", index=False)


if __name__ == "__main__":
    ensure_analysis_outputs()
    print("Analysis outputs written to data/")
