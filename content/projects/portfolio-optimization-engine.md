---
title: "Portfolio Optimization Engine"
summary: "Portfolio optimization tool that translates classical allocation models into working software with real market data, numerical validation, and explicit modeling assumptions."
order: 4
tools:
  - "JavaScript/TypeScript"
  - "Python"
  - "CSS"
evidenceLinks:
  github: "https://github.com/bwang257/PortfolioOptimizationApp"
---

## Impact & Motivation

Built a portfolio optimization tool that makes quantitative finance concepts concrete while preserving the underlying modeling assumptions. The project demonstrates the ability to translate classical allocation methods, including Markowitz optimization, into usable software backed by real market data.

The most important work was not surface-level application code. It was validating the numerical behavior, checking covariance calculations, reasoning about constraints, and making sure the software matched the intended mathematical formulation.

## Technical Challenges

**Problem Specification and Validation**
The core challenge was not writing code from scratch, but ensuring the optimization logic matched the intended mathematical formulation. This included validating covariance calculations, constraint enforcement, and optimizer behavior across edge cases such as ill-conditioned covariance matrices and extreme risk preferences.

**System Integration**
The project required connecting multiple layers: data retrieval from yfinance, numerical optimization in Python,
and frontend visualization of results.
Ensuring clean interfaces, correct data flow, and meaningful outputs required manual inspection and testing.

**Key Learnings**
This project reinforced that applied modeling work depends on evaluation, not just implementation. The hardest parts were:

- defining the model precisely enough to implement
- identifying incorrect or misleading numerical behavior
- validating numerical results rather than trusting output
