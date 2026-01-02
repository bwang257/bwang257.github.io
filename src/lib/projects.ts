export interface EvidenceLinks {
  caseStudy?: string;
  github?: string;
  tests?: string;
  benchmarks?: string;
  readme?: string;
}

export interface ProjectSection {
  title: string;
  content: string; // Markdown content
}

export interface Project {
  slug: string;
  title: string;
  summary: string; // One-line problem statement
  constraints: string[]; // e.g., "Deterministic", "Price-time priority", "GoogleTest suite"
  evidenceLinks: EvidenceLinks;
  facts: string[]; // 3 verifiable facts without numbers
  // Case study sections
  sections: ProjectSection[];
}

export const projects: Project[] = [
  {
    slug: 'exchange-simulator',
    title: 'Exchange Simulator',
    summary: 'High-performance matching engine with order book simulation, built for correctness under concurrent load.',
    constraints: [
      'Deterministic matching',
      'Price-time priority',
      'Cancel/modify support',
      'GoogleTest suite',
      'Lock-free submission',
      'Concurrent correctness'
    ],
    evidenceLinks: {
      caseStudy: '/projects/exchange-simulator',
      github: 'https://github.com/bwang257/exchange-simulator',
      tests: 'https://github.com/bwang257/exchange-simulator/tree/main/tests',
      benchmarks: 'https://github.com/bwang257/exchange-simulator/tree/main/benchmarks',
      readme: 'https://github.com/bwang257/exchange-simulator/blob/main/README.md'
    },
    facts: [
      'Price-time priority matching with deterministic results',
      'Cancel and modify operations with race condition handling',
      'Comprehensive GoogleTest suite covering edge cases'
    ],
    sections: [
      {
        title: 'Overview',
        content: `**Problem:** Understanding how exchanges match orders requires building one. Real exchange systems are black boxes, and academic papers don't cover the engineering challenges: lock contention, memory layout, order cancellation race conditions, and ensuring deterministic results under concurrent execution.

**Scope:** Implement a production-grade matching engine that processes orders with strict ordering guarantees, handles cancellations correctly, and maintains determinism for backtesting and correctness verification.`
      },
      {
        title: 'Requirements & Constraints',
        content: `- **Deterministic matching:** Identical order sequences produce identical results
- **Price-time priority:** Orders matched by price first, then submission time
- **Cancel/modify support:** Orders can be cancelled or modified before execution
- **Concurrent submission:** Multiple threads can submit orders concurrently
- **Correctness guarantee:** Each order executed exactly once, no double-execution
- **Memory efficiency:** Minimize allocations in hot path
- **Testability:** Comprehensive test suite with reproducible test cases`
      },
      {
        title: 'Design',
        content: `**Components:**

1. **Order Book:** Two priority queues (bids descending, asks ascending) using price-time priority
2. **Matching Engine:** Single-threaded matcher processes orders atomically
3. **Order Submission Queue:** Lock-free queue for incoming orders from multiple threads
4. **Market Data Feed:** Generates order book snapshots after each trade

**Responsibilities:**

- Order Book maintains price-time sorted orders and handles matching logic
- Matching Engine ensures atomic execution of match operations
- Submission Queue decouples concurrent order submission from sequential matching
- Market Data provides immutable snapshots for downstream consumers`
      },
      {
        title: 'Algorithms & Data Structures',
        content: `**Price-Time Priority Matching:**
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
- \`std::priority_queue\` for order book (bids/asks)
- Lock-free queue for order submission
- Custom allocator for order objects to reduce heap allocations`
      },
      {
        title: 'Correctness',
        content: `**Invariants:**
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
- Race conditions in order cancellation (atomic operations prevent double-cancellation)`
      },
      {
        title: 'Performance',
        content: `**Benchmark Methodology:**
- Throughput: Orders per second processed (single-threaded matching)
- Latency: P50, P95, P99 latency for order matching
- Concurrent submission: Measure overhead of lock-free queue vs mutex

**How to Run Benchmarks:**
\`\`\`
./build/benchmarks/order_book_benchmark --threads=4 --orders=10000000
./build/benchmarks/latency_benchmark --iterations=1000000
\`\`\`

**Optimization Notes:**
- Custom allocator reduces heap allocations in hot path
- Pre-allocated order pools avoid allocation during matching
- Cache-aligned data structures (64-byte alignment)
- Branch prediction hints for common paths (price matching)`
      },
      {
        title: 'Tradeoffs',
        content: `**Single-threaded matching vs multi-threaded:**
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
- Sorted list would be O(n) insertion but simpler to implement`
      },
      {
        title: 'How to Run',
        content: `**Build:**
\`\`\`
mkdir build && cd build
cmake ..
make -j$(nproc)
\`\`\`

**Run Tests:**
\`\`\`
./build/tests/order_book_tests
./build/tests/concurrent_tests --threads=8
\`\`\`

**Run Benchmarks:**
\`\`\`
./build/benchmarks/order_book_benchmark
./build/benchmarks/latency_benchmark
\`\`\`

**Example Usage:**
\`\`\`
#include "order_book.h"
OrderBook book;
book.submit_order({OrderType::LIMIT, Side::BUY, 100.0, 10});
book.submit_order({OrderType::LIMIT, Side::SELL, 100.0, 10});
// Matching occurs automatically
\`\`\``
      }
    ]
  },
  {
    slug: 'portfolio-optimization-engine',
    title: 'Portfolio Optimization Engine',
    summary: 'Mean-variance optimization with risk-return frontier calculation, implementing Markowitz optimization with constraint handling.',
    constraints: [
      'Markowitz optimization',
      'Constraint enforcement',
      'Concurrent calculations',
      'SQL query optimization',
      'Deterministic output'
    ],
    evidenceLinks: {
      caseStudy: '/projects/portfolio-optimization-engine',
      github: 'https://github.com/bwang257/PortfolioOptimizationApp',
      readme: 'https://github.com/bwang257/PortfolioOptimizationApp/blob/main/README.md'
    },
    facts: [
      'Implements Markowitz mean-variance optimization with quadratic programming',
      'Handles portfolio constraints (weights sum to 1, no negative weights, sector limits)',
      'Optimized SQL queries with proper indexing for historical price data'
    ],
    sections: [
      {
        title: 'Overview',
        content: `**Problem:** People shouldn't need a quant degree to optimize their portfolios. Existing tools are either too complex (Bloomberg Terminal) or too simple (robo-advisors with no transparency). Need a tool that shows the math, lets users explore risk-return trade-offs, but keeps the interface clean.

**Scope:** Build a full-stack portfolio optimization tool that implements Markowitz mean-variance optimization correctly, handles realistic constraints, and performs well with concurrent user requests.`
      },
      {
        title: 'Requirements & Constraints',
        content: `- **Correctness:** Portfolio variance matches expected formula, constraints enforced (weights sum to 1, no negative weights)
- **Performance:** Optimization completes in <1 second for 50-asset portfolios
- **Concurrency:** Handle 10+ simultaneous optimization requests
- **Determinism:** Identical inputs produce identical outputs
- **Numerical stability:** Handle near-singular covariance matrices
- **Database efficiency:** Historical price queries <100ms with proper indexing`
      },
      {
        title: 'Design',
        content: `**Architecture:**

1. **Frontend (React):** Input form, visualization of efficient frontier
2. **Backend (Flask):** REST API endpoints for portfolio optimization
3. **Database (SQL):** Historical price data storage with indexes
4. **Optimizer:** scipy.optimize for quadratic programming

**Components:**

- **Optimization Service:** Handles quadratic programming problem formulation and solving
- **Data Service:** Retrieves historical price data with caching
- **Constraint Handler:** Validates and enforces portfolio constraints
- **Frontend Visualizer:** Renders efficient frontier using Chart.js`
      },
      {
        title: 'Algorithms & Data Structures',
        content: `**Markowitz Mean-Variance Optimization:**
- Objective: Minimize portfolio variance subject to expected return constraint
- Quadratic programming problem: min w^T Σ w subject to constraints
- Solved using scipy.optimize.minimize with SLSQP method

**Covariance Matrix Calculation:**
- Historical returns → covariance matrix
- Regularization: Add small identity matrix to handle near-singular cases
- NumPy vectorized operations for efficiency

**Efficient Frontier:**
- Generate multiple portfolios with different risk-return targets
- Solve optimization problem for each target return
- Plot risk (standard deviation) vs return

**Data Structures:**
- Pandas DataFrame for historical price data
- NumPy arrays for covariance matrix and portfolio weights
- LRU cache for historical data queries`
      },
      {
        title: 'Correctness',
        content: `**Invariants:**
- Portfolio weights sum to 1.0 (within floating-point tolerance)
- No negative weights (long-only constraint)
- Efficient frontier points are Pareto-optimal (no better risk-return combination exists)

**Test Strategy:**
- Unit tests for optimization logic with known inputs/outputs
- Integration tests for API endpoints
- Numerical stability tests with edge cases (all assets correlated, near-singular covariance)
- Constraint validation tests

**Edge Cases Handled:**
- Near-singular covariance matrix (regularization prevents numerical errors)
- All assets perfectly correlated (degenerate case handled)
- Empty portfolio selection (validation prevents)
- Extreme risk tolerance values (bounded and validated)`
      },
      {
        title: 'Performance',
        content: `**Benchmark Methodology:**
- Measure optimization time for different portfolio sizes (10, 25, 50, 100 assets)
- Measure API latency including database queries
- Concurrent request handling (simulate multiple users)

**How to Run Benchmarks:**
\`\`\`
python -m pytest tests/performance/test_optimization_benchmark.py
python -m pytest tests/performance/test_api_benchmark.py --users=10
\`\`\`

**Optimization Notes:**
- LRU cache for historical data reduces database load by 90%
- Composite index on (symbol, date) for fast price lookups
- Batch queries instead of N+1 queries
- Thread pool for concurrent request handling`
      },
      {
        title: 'Tradeoffs',
        content: `**Client-side vs server-side rendering:**
- Chose client-side chart rendering to reduce server load
- Trade-off: More browser resources, but smoother interactions and lower server cost

**Thread pools vs async:**
- Chose thread pools for concurrent optimization requests
- Trade-off: Higher memory usage, but simpler than async/await for CPU-bound work
- Async would be better for I/O-bound operations

**In-memory cache vs Redis:**
- Chose in-memory LRU cache for simplicity
- Trade-off: Cache lost on restart, but no external dependencies
- Redis would provide persistence but adds complexity`
      },
      {
        title: 'How to Run',
        content: `**Setup:**
\`\`\`
pip install -r requirements.txt
python scripts/load_historical_data.py
\`\`\`

**Run Development Server:**
\`\`\`
export FLASK_APP=app.py
flask run
\`\`\`

**Run Tests:**
\`\`\`
pytest tests/
pytest tests/unit/ -v
pytest tests/integration/ -v
\`\`\`

**Run Frontend:**
\`\`\`
cd frontend
npm install
npm run dev
\`\`\``
      }
    ]
  },
  {
    slug: 'algorithmic-trading-system',
    title: 'Algorithmic Trading System',
    summary: 'Event-driven backtesting framework with order book simulation and statistical models for trading strategy development.',
    constraints: [
      'Event-driven architecture',
      'No look-ahead bias',
      'Price-time priority',
      'Deterministic replay'
    ],
    evidenceLinks: {
      caseStudy: '/projects/algorithmic-trading-system',
      github: 'https://github.com/bwang257/IQP-2524-Stock-Market-Simulation'
    },
    facts: [
      'Event-driven backtesting with no look-ahead bias',
      'Price-time priority order matching for realistic execution',
      'Deterministic replay for strategy validation'
    ],
    sections: [
      {
        title: 'Overview',
        content: `**Problem:** Curiosity about trading systems required building one. Existing platforms like QuantConnect are complex; wanted something simpler where I controlled every component and understood the execution model.

**Scope:** Build a complete backtesting framework with order book simulation, strategy interface, and performance metrics calculation. Focus on correctness (no look-ahead bias) and determinism for reproducible results.`
      },
      {
        title: 'Requirements & Constraints',
        content: `- **No look-ahead bias:** Strategies can only use past data available at each timestamp
- **Deterministic replay:** Same data + seed produces identical results
- **Realistic order fills:** Orders only fill when market price crosses limit price
- **Price-time priority:** Standard exchange matching logic
- **Event-driven:** Process price updates as events, strategies react to events`
      },
      {
        title: 'Design',
        content: `**Components:**

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
- Performance metrics calculated after backtest completes`
      },
      {
        title: 'Algorithms & Data Structures',
        content: `**Price-Time Priority Matching:**
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
- Dictionary for order book (bids/asks as sorted lists)`
      },
      {
        title: 'Correctness',
        content: `**Invariants:**
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
- Timestamp timezone issues (normalize all to UTC)`
      },
      {
        title: 'Performance',
        content: `**Benchmark Methodology:**
- Measure backtest speed for different data sizes (1 month, 1 year, 5 years)
- Memory usage with large datasets (chunked processing)
- Strategy execution time (profile hot paths)

**How to Run Benchmarks:**
\`\`\`
python backtest.py --strategy mean_reversion --data data/spy.csv --benchmark
python tests/performance/test_backtest_speed.py
\`\`\`

**Optimization Notes:**
- Chunked processing for large datasets (avoid loading all data into memory)
- Vectorized operations for indicator calculations (NumPy/Pandas)
- Efficient order book operations (sorted lists with binary search)`
      },
      {
        title: 'Tradeoffs',
        content: `**Simple order book vs full exchange simulation:**
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
- Vectorized would be faster but less flexible`
      },
      {
        title: 'How to Run',
        content: `**Setup:**
\`\`\`
pip install -r requirements.txt
python scripts/download_data.py --symbols SPY AAPL --start 2020-01-01
\`\`\`

**Run Backtest:**
\`\`\`
python backtest.py --strategy mean_reversion --data data/spy.csv --start 2020-01-01 --end 2023-12-31
\`\`\`

**Run Tests:**
\`\`\`
pytest tests/
pytest tests/test_lookahead_bias.py -v
\`\`\`

**Example Strategy:**
\`\`\`
class MeanReversionStrategy(Strategy):
    def on_tick(self, price_data):
        sma = price_data.close.rolling(20).mean()
        if price_data.close[-1] < sma[-1] * 0.95:
            self.buy(100)
        elif price_data.close[-1] > sma[-1] * 1.05:
            self.sell(100)
\`\`\``
      }
    ]
  },
  {
    slug: 'internship-tracker',
    title: 'Internship Tracker',
    summary: 'Production-deployed scraping pipeline handling automated job aggregation and user analytics. Supports concurrent user sessions with optimized SQL queries.',
    constraints: [
      'Data pipeline',
      'Concurrent sessions',
      'SQL optimization',
      'Production deployment'
    ],
    evidenceLinks: {
      caseStudy: '/projects/internship-tracker',
      github: 'https://github.com/bwang257/internship-tracker'
    },
    facts: [
      'Production-deployed scraping pipeline',
      'Handles concurrent user sessions',
      'Optimized SQL queries for analytics'
    ],
    sections: [
      {
        title: 'Overview',
        content: `**Problem:** Need to aggregate and track internship opportunities across multiple job boards and company sites. Manual tracking is inefficient and doesn't scale.

**Scope:** Build a production-deployed data pipeline that scrapes job postings, normalizes data, and provides analytics for users tracking their application status.`
      },
      {
        title: 'The Challenge',
        content: `**Data Pipeline Reliability:**
- Scrapers must handle varying HTML structures across different job boards
- Rate limiting and respectful crawling to avoid IP bans
- Data normalization across inconsistent formats

**Performance:**
- Support concurrent user sessions without database contention
- Optimize SQL queries for user analytics and filtering
- Handle large datasets efficiently`
      },
      {
        title: 'The Solution',
        content: `**Pipeline Architecture:**
- Modular scraper framework with error handling and retry logic
- Data normalization layer for consistent job postings
- Background job processing for scraping tasks

**Database Optimization:**
- Composite indexes on frequently queried columns
- Query optimization for user analytics
- Connection pooling for concurrent sessions`
      }
    ]
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.slice(0, 2); // Exchange Simulator and Portfolio Optimization
}
