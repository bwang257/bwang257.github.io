---
title: "Algorithmic Trading System"
summary: "Solo quantitative trading research project that deployed multiple strategies live to study the gap between backtested performance and real-market behavior."
order: 3
tools:
  - "Python"
  - "Jupyter"
  - "Machine Learning"
  - "Statistical Modeling"
evidenceLinks:
  github: "https://github.com/bwang257/IQP-2524-Stock-Market-Simulation"
---

## Impact & Motivation
This project was an intentional risk: I undertook a junior-level project at WPI solo, deploying live trading strategies with limited prior experience in professional quantitative research. The goal was not to “win” the market, but to experience the full lifecycle of quantitative strategy development—research, implementation, backtesting, live deployment, failure, and post-mortem—under real constraints.

I pushed strategies into live paper trading to force real feedback. The project provided firsthand exposure to the full quantitative workflow (research, implementation, validation, deployment, monitoring, and post-mortem) revealing gaps between academic models and practical robustness that are not visible in offline experimentation.

The outcome was not positive returns, but earned judgment: a clearer understanding of what fragile strategies look like, how quickly assumptions fail, and why robustness matters more than elegance.

## Technical Challenges Solved

**Strategy Fragility Under Regime Shifts**
Multiple strategies performed well in historical testing but degraded rapidly in live markets dominated by persistent bullish momentum and event-driven volatility. This highlighted over-reliance on mean reversion assumptions and insufficient regime awareness. Attempts to layer indicators or switch strategies dynamically revealed how complexity can mask, rather than fix, underlying fragility.

**Backtest vs Live Disconnect**
Live deployment exposed issues that were invisible in backtests: delayed reactions to market events, sensitivity to parameter tuning, and unintended behavior under real-time data flow. This forced a shift away from chasing incremental performance improvements toward analyzing failure modes and stress conditions.

**Overfitting and Signal Leakage Risk**
Iterating quickly across strategies increased the risk of fitting noise rather than signal. Tools like PCA, OU processes, and regime models were explored, but the project made clear that sophisticated methods do not compensate for weak assumptions or unstable inputs.

**Operational and Debugging Challenges**
Running strategies live required monitoring execution, handling platform constraints, and diagnosing unexpected behavior without the safety net of hindsight. Managing deployments, logging, and strategy shutdowns under uncertainty built practical resilience beyond model design.

## Key Learnings
**Backtests Are Hypotheses, Not Proof**
The project reinforced that historical performance is a starting point, not validation. Live markets invalidate assumptions quickly, especially when regimes shift.

**Complexity Is Not Robustness**
Adding indicators, models, or learning components does not fix a weak foundation. Several iterations demonstrated that complexity often obscures failure rather than preventing it.

**Judgment Emerges From Exposure**
Running strategies live forced decisions about when to intervene, when to stop, and when to accept loss as information. This experience recalibrated my tolerance for risk and my definition of progress.

**Failure Is Informative When Treated Rigorously**
The negative results were not written off. They became constraints guiding future work—what to avoid, what signals are misleading, and where deeper modeling or systems thinking is required.

**Direction Shift**
This project directly influenced my pivot toward systems, execution, and infrastructure work. Understanding how strategies fail increased my appreciation for determinism, correctness, and control at the system level.

