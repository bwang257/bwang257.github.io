---
title: "Exchange Simulator"
summary: "High-performance matching engine with order book simulation, built for correctness under concurrent load."
order: 1
tools:
  - "C++"
  - "CMake"
  - "GoogleTest"
  - "Lock-free algorithms"
  - "Atomic operations"
evidenceLinks:
  caseStudy: "/projects/exchange-simulator"
  github: "https://github.com/bwang257/exchange-simulator"
  tests: "https://github.com/bwang257/exchange-simulator/tree/main/tests"
  benchmarks: "https://github.com/bwang257/exchange-simulator/tree/main/benchmarks"
  readme: "https://github.com/bwang257/exchange-simulator/blob/main/README.md"
facts:
  - "Price-time priority matching with deterministic results"
  - "Cancel and modify operations with race condition handling"
  - "Comprehensive GoogleTest suite covering edge cases"
---

## Overview

**Problem:** Understanding how exchanges match orders requires building one. Real exchange systems are black boxes, and academic papers don't cover the engineering challenges: lock contention, memory layout, order cancellation race conditions, and ensuring deterministic results under concurrent execution.

**Scope:** Implement a production-grade matching engine that processes orders with strict ordering guarantees, handles cancellations correctly, and maintains determinism for backtesting and correctness verification.

## Requirements & Constraints

- **Deterministic matching:** Identical order sequences produce identical results
- **Price-time priority:** Orders matched by price first, then submission time
- **Cancel/modify support:** Orders can be cancelled or modified before execution
- **Concurrent submission:** Multiple threads can submit orders concurrently
- **Correctness guarantee:** Each order executed exactly once, no double-execution
- **Memory efficiency:** Minimize allocations in hot path
- **Testability:** Comprehensive test suite with reproducible test cases

## Design

**Components:**

1. **Order Book:** Two priority queues (bids descending, asks ascending) using price-time priority
2. **Matching Engine:** Single-threaded matcher processes orders atomically
3. **Order Submission Queue:** Lock-free queue for incoming orders from multiple threads
4. **Market Data Feed:** Generates order book snapshots after each trade

**Responsibilities:**

- Order Book maintains price-time sorted orders and handles matching logic
- Matching Engine ensures atomic execution of match operations
- Submission Queue decouples concurrent order submission from sequential matching
- Market Data provides immutable snapshots for downstream consumers

## Algorithms & Data Structures

**Price-Time Priority Matching:**
- Custom comparator: price (primary, descending for bids, ascending for asks), timestamp (secondary)
- Priority queue implementation using std::priority_queue with custom comparator

**Lock-Free Order Submission:**
- Atomic compare-and-swap operations for queue head/tail pointers
- Hazard pointer technique for safe memory reclamation

**Order Cancellation:**
- Atomic flag marking orders as cancelled
- Matcher checks cancellation flag before execution
- Cancelled orders removed from priority queue lazily

**Data Structures:**
- `std::priority_queue` for order book (bids/asks)
- Lock-free queue for order submission
- Custom allocator for order objects to reduce heap allocations

## Correctness

**Invariants:**
- Orders executed exactly once (no double-execution)
- Price-time priority maintained at all times
- Partial fills handled correctly (remaining quantity preserved)
- Cancelled orders never execute

**Test Strategy:**
- Unit tests for matching logic with known order sequences
- Concurrent stress tests with multiple threads submitting orders
- Determinism tests: run same sequence twice, verify identical results
- Edge case tests: empty order book, same-price orders, partial fills, cancellations during matching

**Edge Cases Handled:**
- Order cancellation while being matched (atomic flag prevents execution)
- Memory alignment issues (struct padding affects cache performance)
- Priority queue comparator bugs (reference vs value equality)
- Race conditions in order cancellation (atomic operations prevent double-cancellation)

## Performance

**Benchmark Methodology:**
- Throughput: Orders per second processed (single-threaded matching)
- Latency: P50, P95, P99 latency for order matching
- Concurrent submission: Measure overhead of lock-free queue vs mutex

**How to Run Benchmarks:**
```
./build/benchmarks/order_book_benchmark --threads=4 --orders=10000000
./build/benchmarks/latency_benchmark --iterations=1000000
```

**Optimization Notes:**
- Custom allocator reduces heap allocations in hot path
- Pre-allocated order pools avoid allocation during matching
- Cache-aligned data structures (64-byte alignment)
- Branch prediction hints for common paths (price matching)

## Tradeoffs

**Single-threaded matching vs multi-threaded:**
- Chose single-threaded matching to guarantee correctness and determinism
- Trade-off: Lower maximum throughput, but eliminates race conditions and synchronization overhead
- Multi-threaded matching would require complex locking and potentially break determinism

**Lock-free queue vs mutex-protected queue:**
- Chose lock-free queue for submission to avoid mutex contention
- Trade-off: More complex implementation, but eliminates blocking and improves scalability
- Mutex would be simpler but creates contention bottleneck

**Priority queue vs sorted list:**
- Chose priority queue (heap) for O(log n) insertions
- Trade-off: Slightly more complex than sorted list, but better for frequent insertions
- Sorted list would be O(n) insertion but simpler to implement

## How to Run

**Build:**
```
mkdir build && cd build
cmake ..
make -j$(nproc)
```

**Run Tests:**
```
./build/tests/order_book_tests
./build/tests/concurrent_tests --threads=8
```

**Run Benchmarks:**
```
./build/benchmarks/order_book_benchmark
./build/benchmarks/latency_benchmark
```

**Example Usage:**
```
#include "order_book.h"
OrderBook book;
book.submit_order({OrderType::LIMIT, Side::BUY, 100.0, 10});
book.submit_order({OrderType::LIMIT, Side::SELL, 100.0, 10});
// Matching occurs automatically
```

