---
title: "Portfolio Optimization Engine"
date: "2024-11-15"
tags: ["Quant/Modeling", "Full-Stack", "Python", "Databases"]
stack: ["Python", "Flask", "SQL", "JavaScript", "React"]
repo: "https://github.com/bwang257/PortfolioOptimizationApp"
demo: "https://portfolio-optimization-app.vercel.app/"
---

## TL;DR

Built a full-stack portfolio optimization tool that makes mean-variance optimization accessible to non-quants. Users input their risk tolerance and get back an optimized portfolio allocation with visualization of the efficient frontier. The backend handles concurrent portfolio calculations, and the frontend renders real-time charts.

## Problem

People shouldn't need a quant degree to optimize their portfolios. Existing tools are either too complex (Bloomberg Terminal) or too simple (robo-advisors with no transparency). I wanted something that shows the math, lets users explore risk-return trade-offs, but keeps the interface clean.

## Architecture

Three-layer architecture:

**Frontend (React)**: 
- Input form for risk tolerance and constraints
- Real-time visualization of efficient frontier using Chart.js
- Interactive portfolio allocation display

**Backend (Flask)**:
- REST API endpoints for portfolio optimization
- Concurrent request handling using thread pools
- Historical price data caching

**Database (SQL)**:
- Stores historical price data for stocks
- Optimized queries with proper indexing on date and symbol
- Batch loading for efficient data retrieval

The optimization uses scipy.optimize to solve the quadratic programming problem: minimize portfolio variance subject to expected return constraint.

## Key Decisions

**Client-side visualization**: Instead of server-side rendering, all charts are rendered in the browser. Reduces server load and provides smooth interactions. Used Chart.js for simplicity.

**Thread pool for concurrent requests**: Multiple users can request optimizations simultaneously. Flask's default single-threaded handling would be a bottleneck. Used ThreadPoolExecutor to handle up to 10 concurrent optimizations.

**Caching historical data**: Historical price lookups are expensive. Implemented in-memory cache (LRU) with 1-hour TTL. Reduces database load by 90%.

**SQL query optimization**: Initial queries took 2+ seconds for 5 years of daily data. Added composite index on (symbol, date) and used batch queries instead of N+1 queries. Reduced to <100ms.

## Hard Bugs / Issues I Hit

**SQL query planner choosing wrong index**: EXPLAIN ANALYZE showed the planner was using table scans instead of the index. Root cause: statistics were stale after bulk import. Fixed by running ANALYZE after data import.

**Race condition in portfolio calculation**: Concurrent requests could overwrite shared state (portfolio weights). Fixed by ensuring each request has isolated calculation state.

**Frontend chart re-rendering on every keystroke**: The chart was re-rendering on every input change, causing lag. Fixed by debouncing input and only re-rendering chart after optimization completes.

**CORS issues in production**: Development worked fine, but production had CORS errors. Fixed by configuring Flask-CORS properly and ensuring preflight requests are handled.

**Numerical instability in optimization**: For certain input combinations, the optimizer would fail to converge. Root cause: covariance matrix was near-singular. Fixed by adding regularization term (small identity matrix) to covariance matrix.

## Performance & Correctness

- **Optimization time**: <500ms for 50-asset portfolios
- **API latency**: P95 under 1 second including database queries
- **Concurrent requests**: Handles 10+ simultaneous optimizations
- **Database queries**: <100ms for 5 years of daily price data (with cache)

The system correctly implements Markowitz optimization:
- Portfolio variance matches expected formula
- Efficient frontier is properly calculated
- Constraints (weights sum to 1, no negative weights) are enforced

## What I'd Do Next

1. **Add more constraints**: Allow users to set sector limits, individual stock limits, or exclude certain assets.
2. **Risk models**: Implement alternative risk models (CVaR, downside deviation) beyond standard deviation.
3. **Transaction costs**: Factor in trading costs when optimizing (impact on returns).
4. **Real-time data**: Integrate live market data API instead of historical data only.
5. **Backtesting**: Allow users to backtest optimized portfolios over historical periods.
6. **Monte Carlo simulation**: Add simulation to show portfolio performance under different market scenarios.

