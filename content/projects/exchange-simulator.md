---
title: "Exchange Simulator"
summary: "High-performance C++17 limit order book simulator using price-time matching, event-driven architecture, and performance profiling  (latency and throughput analysis)."
order: 1
tools:
  - "C++"
  - "CMake"
  - "Testing"
evidenceLinks:
  github: "https://github.com/bwang257/exchange-simulator"
---

## Impact & Motivation
I built this project to understand how a basic exchange matching engine works at a systems level and to use it as a structured way to learn modern C++ development practices. The goal was not to build a production exchange, but to implement a correct and readable limit order book, document design decisions, and measure performance in a controlled setting.

This project also served as my first experience treating a personal project like an engineering codebase: making disciplined commits, writing clear documentation, and validating behavior with tests and benchmarks.

## Core Challenges Addressed

**Correct Price-Time Matching**
Implemented a FIFO limit order book that matches orders using standard price–time priority rules. This required careful handling of partial fills, order removal, and maintaining consistent state across the order book.

**Order Cancellation and Modification:**
Added support for cancel and modify operations, ensuring that orders are not executed after being cancelled and that modifications preserve correct ordering semantics. This exposed subtle edge cases around order lifecycle management.

**Deterministic Execution:**
Focused on deterministic behavior: given the same sequence of inputs, the simulator produces the same sequence of trades. This constraint simplified reasoning about correctness and made testing more reliable.

## Architecture & Design Decisions
**Single-Threaded Matching Engine**
Chose a single-threaded matching loop to prioritize correctness and simplicity. This avoided concurrency complexity while still allowing me to reason about performance characteristics and algorithmic efficiency.

**Event-Driven Design**
Structured the simulator around explicit events (new order, cancel, modify, trade) to keep the control flow clear and extensible. This made the system easier to test and reason about.

**Clear Data Structure Boundaries**
Separated concerns between the order book, matching logic, and input parsing. This reinforced good modular design and made the codebase easier to extend.


## Key Learnings

This project taught me how much rigor is required even for a “simple” systems problem. I learned the importance of:
- enforcing invariants explicitly
- writing tests before trusting behavior
- documenting assumptions and trade-offs
- measuring performance instead of guessing

Most importantly, it shifted my mindset from “making it work” to building something that is correct, explainable, and maintainable.