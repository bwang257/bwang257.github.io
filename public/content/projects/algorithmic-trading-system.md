---
title: "Algorithmic Trading System"
date: "2024-10-10"
tags: ["Quant/Modeling", "Python", "Statistical Modeling"]
stack: ["Python", "NumPy", "Pandas", "Statistical Modeling"]
repo: "https://github.com/bwang257/IQP-2524-Stock-Market-Simulation"
---

## TL;DR

Built a complete algorithmic trading system with order book simulation, backtesting framework, and statistical models for strategy development. The system enables rapid prototyping and testing of trading strategies with realistic market dynamics.

## Problem

Curiosity about trading systems required building one. I wanted to understand how strategies are developed, tested, and deployed. Existing platforms like QuantConnect are complex; I wanted something simpler where I controlled every component.

## Architecture

The system consists of three main components:

**Order Book Simulator**: 
- Implements price-time priority matching
- Supports limit and market orders
- Generates realistic market data with bid-ask spreads

**Backtesting Framework**:
- Executes strategies against historical data
- Calculates performance metrics (Sharpe ratio, max drawdown, win rate)
- Generates trade-by-trade logs for analysis

**Strategy Interface**:
- Abstract base class for strategies
- Implementations: mean reversion, momentum, statistical arbitrage
- Signals generated from technical indicators

Data flow: Historical price data → Strategy generates signals → Orders sent to simulator → Trades executed → Performance metrics calculated.

## Key Decisions

**Event-driven backtesting**: Instead of iterating over time series, the system uses an event-driven approach. Events are price updates, and strategies react to events. More realistic and extensible.

**Simple order book**: Full exchange simulation would be overkill. Implemented minimal order book with price-time priority matching. Sufficient for backtesting.

**Pandas for data handling**: Used pandas DataFrames for price data manipulation. Efficient for time series operations and easy to work with.

**Strategy pattern**: Each strategy is a separate class implementing a common interface. Makes it easy to test multiple strategies and compare performance.

## Hard Bugs / Issues I Hit

**Look-ahead bias in backtesting**: Strategies were accidentally using future data. Fixed by ensuring all indicators are calculated using only past data available at each timestamp.

**Order fill assumptions**: Initially assumed all limit orders filled immediately at limit price. Unrealistic. Fixed by only filling orders when market price crosses limit price.

**Division by zero in Sharpe ratio**: When strategy had zero returns, Sharpe ratio calculation failed. Fixed by handling edge case (return 0 for zero returns).

**Memory usage with large datasets**: Loading 10 years of minute-level data into memory caused OOM errors. Fixed by using chunked processing and only loading necessary columns.

**Timestamp timezone issues**: Historical data had mixed timezones, causing incorrect ordering. Fixed by normalizing all timestamps to UTC.

## Performance & Correctness

- **Backtest speed**: Processes 1 year of daily data in <5 seconds
- **Strategy correctness**: All strategies tested against known outcomes (e.g., buy-and-hold baseline)
- **Order matching**: Correctly implements price-time priority matching logic
- **Performance metrics**: Sharpe ratio, returns, and drawdowns match manual calculations

The system correctly handles:
- Partial order fills
- Order cancellation
- Multiple strategies running simultaneously
- Realistic bid-ask spreads

## What I'd Do Next

1. **Add more market data**: Support for options, futures, and other asset classes.
2. **Live paper trading**: Connect to broker API for paper trading with real market data.
3. **Machine learning integration**: Use ML models for signal generation (e.g., LSTM for price prediction).
4. **Risk management**: Implement position sizing, stop-losses, and portfolio-level risk controls.
5. **Optimization**: Use genetic algorithms or Bayesian optimization to tune strategy parameters.
6. **Portfolio optimization**: Combine multiple strategies into a portfolio with risk budgeting.

