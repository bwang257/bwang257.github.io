---
title: "Portfolio Optimization Engine"
summary: "Full-stack portfolio optimization tool built with AI-assisted development applying classical portfolio optimization models to working software with real data. "
order: 4
tools:
  - "JavaScript/TypeScript"
  - "Python"
  - "CSS"
evidenceLinks:
  github: "https://github.com/bwang257/PortfolioOptimizationApp"
---

## Impact & Motivation

Built a full-stack portfolio optimization tool that makes quantitative finance accessible while maintaining mathematical rigor. This project demonstrates the ability to translate complex mathematical models (Markowitz optimization) into production-ready software.

Much of the implementation was accelerated using AI-assisted tools (Cursor), allowing me to focus on reviewing generated code, correcting errors, validating mathematical assumptions, and integrating components into a coherent system.

## Technical Challenges

**Problem Specification and Validation**
The core challenge was not writing code from scratch, but ensuring the optimization logic matched the intended mathematical formulation. This included validating covariance calculations, constraint enforcement, and optimizer behavior across edge cases such as ill-conditioned covariance matrices and extreme risk preferences.

**End-to-End Integration**
The project required connecting multiple layers: data retrieval from yfinance, numerical optimization in Python,
and frontend visualization of results.
Even with AI-assisted coding, ensuring clean interfaces, correct data flow, and meaningful outputs required manual inspection and testing.

**Key Learnings**
This project reinforced that AI-assisted development shifts effort from writing code to evaluating it. The hardest parts were:

- knowing what to ask the system to build
- identifying incorrect or misleading generated logic
- validating numerical results rather than trusting output

