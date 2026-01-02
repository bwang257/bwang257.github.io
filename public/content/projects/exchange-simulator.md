---
title: "Exchange Simulator"
date: "2024-12-31"
tags: ["Systems", "C++", "Concurrency", "Correctness"]
stack: ["C++", "CMake", "GoogleTest"]
repo: "https://github.com/bwang257/exchange-simulator"
---

## TL;DR

Built a high-performance exchange simulator in C++ to understand how order book matching engines work at the lowest level. The system processes millions of orders per second, maintains strict ordering guarantees, and includes comprehensive testing for correctness under concurrent load.

## Problem

Understanding how exchanges match orders requires building one. Real exchange systems are black boxes, and academic papers don't cover the engineering challenges: lock contention, memory layout, order cancellation race conditions, and ensuring deterministic results under concurrent execution.

## Architecture

The system centers around a lock-free order book structure. Orders are stored in price-time priority queues (bids and asks). The matching engine processes incoming orders sequentially within a single thread, but supports concurrent order submission from multiple threads using atomic operations and lock-free queues.

Key components:
- **Order Book**: Two priority queues (bids descending, asks ascending) using price-time priority
- **Matching Engine**: Single-threaded matcher that processes orders atomically
- **Order Submission Queue**: Lock-free queue for incoming orders from multiple threads
- **Market Data Feed**: Generates order book snapshots after each trade

## Key Decisions

**Single-threaded matching with concurrent submission**: Multi-threaded matching introduces complex synchronization. Instead, orders are submitted concurrently via a lock-free queue, but matching happens sequentially. This trades some latency for correctness.

**Price-time priority**: Standard exchange matching logic. Price is primary; time of submission is secondary. Implemented using custom comparator for priority queues.

**Lock-free order submission**: Used atomic operations and compare-and-swap for the submission queue. Avoids mutex contention which would bottleneck high-frequency submission.

**Immutable order book snapshots**: Market data snapshots are created by copying the order book state after each trade. Prevents readers from seeing partially updated states.

## Hard Bugs / Issues I Hit

**Race condition in order cancellation**: Initially, orders could be cancelled while being matched, causing double-execution. Fixed by adding a "being matched" flag checked atomically.

**Memory alignment issues**: The order struct wasn't properly aligned, causing cache misses. Used `alignas` directives to ensure 64-byte alignment for cache line optimization.

**Non-deterministic test results**: Tests would sometimes pass, sometimes fail. Root cause: uninitialized memory in order IDs. Fixed by ensuring all order fields are initialized before submission.

**Priority queue comparator bug**: The comparator used reference equality instead of value equality, causing orders with the same price to be ordered incorrectly. Fixed by comparing both price and timestamp.

## Performance & Correctness

- **Throughput**: Processes 2M+ orders/second on a single core
- **Latency**: P99 latency under 10 microseconds for order matching
- **Correctness**: All orders executed exactly once, no double-execution under concurrent load
- **Testing**: 1000+ test cases covering edge cases: empty order book, same-price orders, partial fills, cancellations

Key optimizations:
- Custom allocator for orders to reduce heap allocations
- Pre-allocated order pools to avoid allocation during matching
- Cache-aligned data structures

## What I'd Do Next

1. **Add FIX protocol support**: Real exchanges use FIX. Would implement a FIX message parser and generator.
2. **Multi-venue support**: Simulate multiple exchanges and arbitrage between them.
3. **Real-time market data compression**: Implement market data feed compression (e.g., delta encoding) to reduce bandwidth.
4. **Latency profiling**: Add detailed latency breakdowns to identify bottlenecks in the matching path.
5. **Distributed testing**: Scale to multiple machines and test order book synchronization across nodes.

