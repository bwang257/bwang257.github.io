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

## Overview

**Problem:** Curiosity about trading systems required building one. Existing platforms like QuantConnect are complex; wanted something simpler where I controlled every component and understood the execution model.

**Scope:** Build a complete backtesting framework with order book simulation, strategy interface, and performance metrics calculation. Focus on correctness (no look-ahead bias) and determinism for reproducible results.

## Requirements & Constraints

- **No look-ahead bias:** Strategies can only use past data available at each timestamp
- **Deterministic replay:** Same data + seed produces identical results
- **Realistic order fills:** Orders only fill when market price crosses limit price
- **Price-time priority:** Standard exchange matching logic
- **Event-driven:** Process price updates as events, strategies react to events

## Design

**Components:**

1. **Order Book Simulator:** Minimal order book with price-time priority matching
2. **Event Engine:** Processes price updates and triggers strategy callbacks
3. **Strategy Interface:** Abstract base class for trading strategies
4. **Performance Calculator:** Computes metrics (Sharpe ratio, max drawdown, win rate)

**Event Flow:**
- Historical price data loaded into event queue
- Event engine processes events sequentially
- Each price update triggers strategy.on_tick()
- Strategy generates orders → sent to order book
- Orders matched according to price-time priority
- Performance metrics calculated after backtest completes

## Algorithms & Data Structures

**Price-Time Priority Matching:**
- Orders sorted by price (bids descending, asks ascending)
- Within same price, sorted by timestamp
- Matching occurs when bid >= ask

**Event-Driven Backtesting:**
- Events stored in priority queue (sorted by timestamp)
- Process events in chronological order
- Strategies generate orders based on current state (no future data)

**Performance Metrics:**
- Sharpe ratio: (mean return - risk-free rate) / std(returns)
- Max drawdown: Maximum peak-to-trough decline
- Win rate: Percentage of profitable trades

**Data Structures:**
- Pandas DataFrame for price data (indexed by timestamp)
- Priority queue for events
- Dictionary for order book (bids/asks as sorted lists)

## Correctness

**Invariants:**
- No look-ahead bias: Indicators calculated using only past data
- Orders fill only when price crosses limit (no immediate fill assumption)
- Performance metrics match manual calculations

**Test Strategy:**
- Test against known outcomes (buy-and-hold baseline)
- Determinism tests: run same backtest twice, verify identical results
- Look-ahead bias tests: verify indicators use only past data
- Edge case tests: zero returns, division by zero in Sharpe calculation

**Edge Cases Handled:**
- Look-ahead bias in indicator calculations (strictly use past data)
- Order fill assumptions (realistic limit order fills)
- Division by zero in Sharpe ratio (return 0 for zero returns)
- Timestamp timezone issues (normalize all to UTC)

## Performance

**Benchmark Methodology:**
- Measure backtest speed for different data sizes (1 month, 1 year, 5 years)
- Memory usage with large datasets (chunked processing)
- Strategy execution time (profile hot paths)

**How to Run Benchmarks:**
```
python backtest.py --strategy mean_reversion --data data/spy.csv --benchmark
python tests/performance/test_backtest_speed.py
```

**Optimization Notes:**
- Chunked processing for large datasets (avoid loading all data into memory)
- Vectorized operations for indicator calculations (NumPy/Pandas)
- Efficient order book operations (sorted lists with binary search)

## Tradeoffs

**Simple order book vs full exchange simulation:**
- Chose minimal order book sufficient for backtesting
- Trade-off: Not realistic enough for live trading, but sufficient for strategy validation
- Full exchange simulation would be more realistic but much more complex

**Pandas for data vs custom time series:**
- Chose Pandas for convenience and built-in operations
- Trade-off: Higher memory usage, but much easier to work with
- Custom time series would be more memory-efficient but require more code

**Event-driven vs vectorized backtesting:**
- Chose event-driven for flexibility and realism
- Trade-off: Slower than vectorized, but supports more complex strategies
- Vectorized would be faster but less flexible

## How to Run

**Setup:**
```
pip install -r requirements.txt
python scripts/download_data.py --symbols SPY AAPL --start 2020-01-01
```

**Run Backtest:**
```
python backtest.py --strategy mean_reversion --data data/spy.csv --start 2020-01-01 --end 2023-12-31
```

**Run Tests:**
```
pytest tests/
pytest tests/test_lookahead_bias.py -v
```

**Example Strategy:**
```
class MeanReversionStrategy(Strategy):
    def on_tick(self, price_data):
        sma = price_data.close.rolling(20).mean()
        if price_data.close[-1] < sma[-1] * 0.95:
            self.buy(100)
        elif price_data.close[-1] > sma[-1] * 1.05:
            self.sell(100)
```

