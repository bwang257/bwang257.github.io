---
title: "Applied Modeling & Live Simulation"
summary: "Research project deploying statistical arbitrage, momentum, and regime-adaptive models to study divergence between backtested assumptions and live-market execution."
order: 3
tools:
  - "Python"
  - "Jupyter"
  - "Stochastic Processes"
  - "Statistical Modeling"
evidenceLinks:
  github: "https://github.com/bwang257/IQP-2524-Stock-Market-Simulation"
---

## Technical Scope

This was a solo research project focused on building and testing statistical models against live data streams. The objective was to implement 8 distinct trading strategies (including mean reversion, statistical arbitrage, and regime adaptation) and measure their performance over a 5-week live paper-trading deployment on QuantConnect.

The project required implementing robust data pipelines, executing models concurrently, and logging execution details to trace divergence between expected and actual performance.

## Analytical Findings

**Assumption Validation Under Regime Shifts**
Strategies relying heavily on mean-reversion performed precisely as modeled during stable periods but degraded sharply during event-driven volatility. This provided a direct case study in the fragility of underlying assumptions when facing regime instability. I implemented Ornstein-Uhlenbeck processes and basic regime detection to better define when models should disable themselves.

**Execution and Live Divergence**
The 5-week live deployment exposed variables missing from the historical testing environment: delayed state updates, parameter sensitivity, and compounding transaction friction. The post-mortem analysis utilized Sharpe ratios, Probabilistic Sharpe Ratios, and maximum drawdown metrics to formally quantify this divergence.

## Development Constraints

The primary constraint was diagnostic visibility. When a model behaved unexpectedly in a live environment, tracing the decision logic back through the pipeline was difficult without rigorous logging and deterministic state management. 

Diagnosing these specific failure modes highlighted the necessity of predictable, low-latency execution pipelines when handling continuous data streams. This requirement for absolute execution control directly influenced my subsequent focus on systems programming and deterministic C++ architectures.
