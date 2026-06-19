---
title: "Limit Order Book Engine"
summary: "High-performance, single-ticker matching engine built in C++17. Achieved 327K orders/sec throughput and 4.3µs P99 latency under synthetic load."
order: 1
tools:
  - "C++17"
  - "CMake"
  - "STL"
  - "Performance Profiling"
evidenceLinks:
  github: "https://github.com/bwang257/exchange-simulator"
---

## System Architecture

I built this project because I enjoy the precision of C++ and wanted to implement a system where execution state is strictly deterministic. The engine supports limit orders, market orders, cancellations, and partial fills, maintaining strict FIFO price-time priority.

To enforce correctness, the engine was built as a single-threaded, event-driven loop. This eliminated threading nondeterminism and isolated performance bottlenecks, allowing me to focus directly on data structure layout and memory access patterns.

## Data Structures and Optimization

**Ordered Price Levels and O(1) Lookup**
The core limit order book utilizes ordered price levels to maintain best-bid/best-ask access, paired with an `unordered_map` for O(1) order-id lookups. This structure ensures that cancellation and modification paths do not require linear scans of the book.

**Performance Profiling**
Execution metrics were captured using RAII timers around the matching path. Under reproducible synthetic loads (generated via Python scripts mimicking randomized market events), the engine sustained a throughput of 327,000 orders per second with a P99 execution latency of 4.3µs on an M4 MacBook Air.

## Testing and Correctness

A matching engine is only useful if it is perfectly predictable. I wrote deterministic unit tests to validate state transitions across edge cases:
- Executing partial fills that clear multiple resting orders.
- Rejecting cancellations for fully filled orders.
- Ensuring that modifications correctly append to the back of the queue at the same price level.

Working at this level of the stack reinforced my preference for software where performance can be explicitly measured and invariants can be strictly enforced.