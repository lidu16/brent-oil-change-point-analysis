# Brent Oil Price Change Point Analysis

## Overview
This project analyzes Brent oil prices (1987-2022) to detect structural breaks and associate them with major geopolitical events, OPEC decisions, and economic shocks.

## Objectives
1. Identify key events that significantly impacted Brent oil prices
2. Quantify price changes using Bayesian change point detection
3. Provide data-driven insights for investors and policymakers

## Setup

```bash
pip install -r requirements.txt
jupyter notebook

---

### Step 9: Create CI/CD Workflow

Create `.github/workflows/ci.yml`:

```yaml
name: CI - Python Environment Check

on:
  push:
    branches: [ main, task-1, task-2, task-3 ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - name: Set up Python
      uses: actions/setup-python@v5
      with:
        python-version: '3.10'
    - name: Install dependencies
      run: |
        python -m pip install --upgrade pip
        pip install -r requirements.txt
    - name: Verify installations
      run: |
        python -c "import pandas; print('Pandas OK')"
        python -c "import pymc; print('PyMC OK')"