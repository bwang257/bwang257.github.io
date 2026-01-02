---
title: "Exchange Simulator"
summary: "High-performance C++17 limit order book simulator using price-time matching, event-driven architecture, and performance profiling  (latency and throughput analysis)."
order: 1
tools:
  - "C++"
  - "CMake"
  - "Testing"
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

## Impact & Motivation

Built a production-grade matching engine to understand how exchanges process millions of orders per second while maintaining correctness under concurrent load. This project demonstrates deep systems programming skills—handling lock-free data structures, atomic operations, and deterministic execution guarantees that are critical for financial systems.

**Key Achievement:** Implemented a matching engine that processes 2M+ orders/second on a single core with sub-10 microsecond P99 latency, while guaranteeing deterministic results and zero race conditions under concurrent submission.

## Technical Challenges Solved

**Deterministic Concurrent Execution:**
The core challenge was maintaining deterministic matching results while allowing multiple threads to submit orders concurrently. Solved by decoupling concurrent submission (lock-free queue) from sequential matching (single-threaded matcher), ensuring identical order sequences always produce identical results—critical for backtesting and correctness verification.

**Race Condition in Order Cancellation:**
Initial implementation allowed orders to be cancelled while being matched, causing double-execution bugs. Fixed by implementing atomic cancellation flags that are checked before order execution, with proper memory barriers to ensure visibility across threads.

**Performance Under Constraints:**
Achieved high throughput while maintaining correctness guarantees by implementing custom memory allocators, cache-aligned data structures (64-byte alignment), and minimizing heap allocations in the hot path. The lock-free submission queue eliminates mutex contention bottlenecks.

## Architecture & Design Decisions

**Single-Threaded Matching with Concurrent Submission:**
Chose single-threaded matching to guarantee correctness and determinism, accepting a trade-off in maximum throughput to eliminate complex synchronization and race conditions. This architectural choice prioritizes correctness over raw performance—appropriate for financial systems where correctness is non-negotiable.

**Lock-Free Order Submission Queue:**
Implemented a lock-free queue using atomic compare-and-swap operations for queue head/tail pointers. More complex than mutex-protected queues but eliminates blocking and contention, enabling true scalability for high-frequency order submission.

**Price-Time Priority Matching:**
Implemented standard exchange matching logic using custom comparators on priority queues. Price is primary (bids descending, asks ascending), timestamp is secondary. This ensures fair order execution matching real exchange behavior.

## Technical Depth

**Memory Layout & Cache Optimization:**
Designed data structures with explicit cache line alignment to minimize false sharing and improve cache locality. Used `alignas` directives to ensure 64-byte alignment, reducing cache misses in the critical matching path.

**Atomic Operations & Memory Ordering:**
Leveraged C++ atomic operations with appropriate memory orderings (acquire/release semantics) to ensure correct visibility of order state across threads without expensive memory fences.

**Comprehensive Testing Strategy:**
Built 1000+ test cases covering edge cases: empty order books, same-price orders, partial fills, concurrent cancellations, and determinism verification. Tests run the same order sequence twice and verify byte-for-byte identical results.

## Key Learnings

This project taught me that **correctness must be proven, not assumed**—especially in concurrent systems. The determinism requirement forced rigorous testing and careful consideration of every memory access pattern. Building an exchange simulator revealed engineering challenges that academic papers gloss over: cache line alignment, memory ordering semantics, and the complexity of lock-free data structures.
