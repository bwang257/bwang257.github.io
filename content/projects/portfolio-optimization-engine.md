---
title: "Portfolio Optimization Engine"
summary: "Mean-variance optimization with risk-return frontier calculation, implementing Markowitz optimization with constraint handling."
order: 4
tools:
  - "Python"
  - "Flask"
  - "NumPy"
  - "scipy.optimize"
  - "SQL"
  - "React"
evidenceLinks:
  caseStudy: "/projects/portfolio-optimization-engine"
  github: "https://github.com/bwang257/PortfolioOptimizationApp"
  readme: "https://github.com/bwang257/PortfolioOptimizationApp/blob/main/README.md"
facts:
  - "Implements Markowitz mean-variance optimization with quadratic programming"
  - "Handles portfolio constraints (weights sum to 1, no negative weights, sector limits)"
  - "Optimized SQL queries with proper indexing for historical price data"
---

## Overview

**Problem:** People shouldn't need a quant degree to optimize their portfolios. Existing tools are either too complex (Bloomberg Terminal) or too simple (robo-advisors with no transparency). Need a tool that shows the math, lets users explore risk-return trade-offs, but keeps the interface clean.

**Scope:** Build a full-stack portfolio optimization tool that implements Markowitz mean-variance optimization correctly, handles realistic constraints, and performs well with concurrent user requests.

## Requirements & Constraints

- **Correctness:** Portfolio variance matches expected formula, constraints enforced (weights sum to 1, no negative weights)
- **Performance:** Optimization completes in <1 second for 50-asset portfolios
- **Concurrency:** Handle 10+ simultaneous optimization requests
- **Determinism:** Identical inputs produce identical outputs
- **Numerical stability:** Handle near-singular covariance matrices
- **Database efficiency:** Historical price queries <100ms with proper indexing

## Design

**Architecture:**

1. **Frontend (React):** Input form, visualization of efficient frontier
2. **Backend (Flask):** REST API endpoints for portfolio optimization
3. **Database (SQL):** Historical price data storage with indexes
4. **Optimizer:** scipy.optimize for quadratic programming

**Components:**

- **Optimization Service:** Handles quadratic programming problem formulation and solving
- **Data Service:** Retrieves historical price data with caching
- **Constraint Handler:** Validates and enforces portfolio constraints
- **Frontend Visualizer:** Renders efficient frontier using Chart.js

## Algorithms & Data Structures

**Markowitz Mean-Variance Optimization:**
- Objective: Minimize portfolio variance subject to expected return constraint
- Quadratic programming problem: min w^T Σ w subject to constraints
- Solved using scipy.optimize.minimize with SLSQP method

**Covariance Matrix Calculation:**
- Historical returns → covariance matrix
- Regularization: Add small identity matrix to handle near-singular cases
- NumPy vectorized operations for efficiency

**Efficient Frontier:**
- Generate multiple portfolios with different risk-return targets
- Solve optimization problem for each target return
- Plot risk (standard deviation) vs return

**Data Structures:**
- Pandas DataFrame for historical price data
- NumPy arrays for covariance matrix and portfolio weights
- LRU cache for historical data queries

## Correctness

**Invariants:**
- Portfolio weights sum to 1.0 (within floating-point tolerance)
- No negative weights (long-only constraint)
- Efficient frontier points are Pareto-optimal (no better risk-return combination exists)

**Test Strategy:**
- Unit tests for optimization logic with known inputs/outputs
- Integration tests for API endpoints
- Numerical stability tests with edge cases (all assets correlated, near-singular covariance)
- Constraint validation tests

**Edge Cases Handled:**
- Near-singular covariance matrix (regularization prevents numerical errors)
- All assets perfectly correlated (degenerate case handled)
- Empty portfolio selection (validation prevents)
- Extreme risk tolerance values (bounded and validated)

## Performance

**Benchmark Methodology:**
- Measure optimization time for different portfolio sizes (10, 25, 50, 100 assets)
- Measure API latency including database queries
- Concurrent request handling (simulate multiple users)

**How to Run Benchmarks:**
```
python -m pytest tests/performance/test_optimization_benchmark.py
python -m pytest tests/performance/test_api_benchmark.py --users=10
```

**Optimization Notes:**
- LRU cache for historical data reduces database load by 90%
- Composite index on (symbol, date) for fast price lookups
- Batch queries instead of N+1 queries
- Thread pool for concurrent request handling

## Tradeoffs

**Client-side vs server-side rendering:**
- Chose client-side chart rendering to reduce server load
- Trade-off: More browser resources, but smoother interactions and lower server cost

**Thread pools vs async:**
- Chose thread pools for concurrent optimization requests
- Trade-off: Higher memory usage, but simpler than async/await for CPU-bound work
- Async would be better for I/O-bound operations

**In-memory cache vs Redis:**
- Chose in-memory LRU cache for simplicity
- Trade-off: Cache lost on restart, but no external dependencies
- Redis would provide persistence but adds complexity

## How to Run

**Setup:**
```
pip install -r requirements.txt
python scripts/load_historical_data.py
```

**Run Development Server:**
```
export FLASK_APP=app.py
flask run
```

**Run Tests:**
```
pytest tests/
pytest tests/unit/ -v
pytest tests/integration/ -v
```

**Run Frontend:**
```
cd frontend
npm install
npm run dev
```

