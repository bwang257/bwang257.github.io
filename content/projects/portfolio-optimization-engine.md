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

## Impact & Motivation

Built a full-stack portfolio optimization tool that makes quantitative finance accessible while maintaining mathematical rigor. This project demonstrates the ability to translate complex mathematical models (Markowitz optimization) into production-ready software that handles real-world constraints and performs under load.

**Key Achievement:** Delivered a working optimization engine that completes portfolio optimization for 50-asset portfolios in under 1 second, with proper constraint enforcement and numerical stability handling.

## Technical Challenges Solved

**Numerical Stability in Optimization:**
Near-singular covariance matrices caused optimization failures. Solved by implementing regularization (adding a small identity matrix scaled by a tolerance factor) that maintains numerical stability without significantly affecting optimization results.

**Concurrent Request Handling:**
Designed the system to handle 10+ simultaneous optimization requests without blocking. Implemented thread pool architecture for CPU-bound optimization work, with proper isolation to prevent race conditions in shared state.

**Database Performance:**
Optimized historical price data queries to complete in <100ms for multi-year time series. Achieved through composite indexes on (symbol, date) columns and batch query patterns instead of N+1 queries, reducing database round trips by 90%.

## Architecture & Design Decisions

**Full-Stack Separation of Concerns:**
Frontend (React) handles visualization and user interaction, backend (Flask) provides REST API for optimization, database stores historical data with proper indexing. This separation enabled independent scaling and deployment of components.

**In-Memory LRU Cache:**
Implemented LRU cache for historical price data to reduce database load. Chose in-memory over Redis for simplicity (no external dependencies) despite losing cache on restart—appropriate trade-off for this use case where cache warming is fast.

**Quadratic Programming Solver:**
Used scipy.optimize with SLSQP method for constrained optimization. Formulated the Markowitz problem as a quadratic programming problem: minimize portfolio variance (w^T Σ w) subject to expected return constraint and portfolio weight constraints.

## Technical Depth

**Mathematical Implementation:**
Correctly implemented Markowitz mean-variance optimization from first principles, ensuring portfolio variance calculations match theoretical expectations. Handled edge cases like perfectly correlated assets (degenerate covariance matrices) and extreme risk tolerances.

**Constraint Enforcement:**
Implemented proper constraint validation ensuring portfolio weights sum to 1.0 (within floating-point tolerance), no negative weights (long-only constraint), and optional sector limits. Used Lagrange multipliers and constraint handling in the optimizer.

**Performance Optimization:**
Vectorized covariance matrix calculations using NumPy operations instead of loops, achieving 10x speedup. Pre-allocated arrays for intermediate calculations to minimize memory allocations during optimization.

## Key Learnings

This project taught me that **mathematical correctness doesn't guarantee software correctness**—floating-point precision, constraint satisfaction, and numerical stability all require careful engineering. Building production finance software requires understanding both the mathematics and the computational constraints. The full-stack nature forced me to think about data flow from database queries through optimization algorithms to visualization, highlighting the importance of clean interfaces between layers.
