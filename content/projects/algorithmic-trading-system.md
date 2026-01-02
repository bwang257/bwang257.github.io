---
title: "Algorithmic Trading System"
summary: "Event-driven backtesting framework with order book simulation and statistical models for trading strategy development."
order: 3
tools:
  - "Python"
  - "Pandas"
  - "NumPy"
  - "Event-driven architecture"
  - "Statistical modeling"
evidenceLinks:
  caseStudy: "/projects/algorithmic-trading-system"
  github: "https://github.com/bwang257/IQP-2524-Stock-Market-Simulation"
facts:
  - "Event-driven backtesting with no look-ahead bias"
  - "Price-time priority order matching for realistic execution"
  - "Deterministic replay for strategy validation"
---

## Impact & Motivation

Built a complete backtesting framework from scratch to understand how trading strategies are developed and validated. This project demonstrates the ability to design event-driven systems, implement realistic market simulation, and ensure correctness in data processing—critical skills for quantitative finance and systems programming.

**Key Achievement:** Created a framework that enforces temporal correctness (no look-ahead bias) and deterministic replay, enabling reproducible strategy development and validation against known outcomes.

## Technical Challenges Solved

**Eliminating Look-Ahead Bias:**
The most critical correctness issue in backtesting: strategies must only use data available at each timestamp. Solved by strict event-driven architecture where strategies only access historical data through a time-indexed interface, preventing access to future price data that wouldn't exist in real trading.

**Realistic Order Execution:**
Implemented price-time priority matching logic matching real exchange behavior. Orders only fill when market price crosses limit price, not immediately—critical for realistic backtesting that accounts for execution risk.

**Deterministic Replay:**
Ensured identical backtest runs produce identical results for strategy validation. Achieved by fixing random seeds, using deterministic data processing, and avoiding non-deterministic operations in the event loop.

## Architecture & Design Decisions

**Event-Driven vs Vectorized:**
Chose event-driven architecture over vectorized operations for flexibility and realism. Trade-off: slower execution but supports complex strategies with state-dependent logic and realistic order execution. Vectorized would be faster but less flexible.

**Minimal Order Book Simulator:**
Implemented sufficient order book functionality for backtesting without full exchange simulation complexity. Chose to focus on correctness (price-time priority, realistic fills) over features (level 2 data, advanced order types) appropriate for the scope.

**Strategy Interface Design:**
Created abstract base class that strategies inherit from, enforcing a clean interface (`on_tick()`, `buy()`, `sell()`) while allowing strategy-specific logic. This separation enabled testing strategies independently and comparing performance.

## Technical Depth

**Temporal Data Processing:**
Designed the system to process historical price data in strict chronological order, with strategies receiving updates as events. Each strategy maintains its own state (positions, indicators) that updates incrementally—matching how real trading systems operate.

**Performance Metrics Implementation:**
Correctly implemented financial metrics: Sharpe ratio (risk-adjusted returns), maximum drawdown (peak-to-trough decline), and win rate. Handled edge cases like zero returns (avoid division by zero) and ensured calculations match manual verification.

**Data Structure Choices:**
Used Pandas DataFrames for time series data (indexed by timestamp) for convenient time-based indexing and operations. Priority queue for events ensures chronological processing. Dictionary-based order book with sorted lists enables efficient price-time priority matching.

## Key Learnings

This project taught me that **correctness in data processing is non-negotiable**—a single look-ahead bias bug can make an entire backtest meaningless. The event-driven architecture forced me to think carefully about temporal dependencies and state management. Building realistic market simulation revealed the complexity hidden behind simple concepts like "place an order"—execution timing, partial fills, and order priority all matter for accurate backtesting.
