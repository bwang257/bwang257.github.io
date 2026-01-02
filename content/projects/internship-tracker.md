---
title: "Internship Tracker"
summary: "Gamified application tracker where students log applications, earn XP and badges, track streaks, and compete on leaderboards, while employers post positions and view application analytics."
order: 2
tools:
- "Python"
- "PostgreSQL"
- "JavaScript"
- "Flask"
- "AWS"
evidenceLinks:
  caseStudy: "/projects/internship-tracker"
  github: "https://github.com/bwang257/internship-tracker"
facts:
  - "Production-deployed scraping pipeline"
  - "Handles concurrent user sessions"
  - "Optimized SQL queries for analytics"
---

## Impact & Motivation

Built a production data pipeline that aggregates internship opportunities from multiple job boards and provides user analytics. This project demonstrates end-to-end system design—from web scraping and data normalization to database optimization and concurrent user handling in a production environment.

**Key Achievement:** Delivered a production-deployed system handling automated data collection, normalization across inconsistent sources, and concurrent user sessions with optimized database queries for analytics.

## Technical Challenges Solved

**Data Normalization Across Inconsistent Sources:**
Different job boards have completely different HTML structures, data formats, and field naming conventions. Solved by building a modular scraper framework where each source has a custom parser but outputs to a normalized schema, enabling consistent downstream processing despite source diversity.

**Rate Limiting & Respectful Crawling:**
Implemented intelligent rate limiting and respectful crawling practices to avoid IP bans while maintaining fresh data. This required balancing crawl frequency with respect for target sites, implementing exponential backoff on errors, and rotating user agents.

**Database Performance Under Concurrent Load:**
Optimized SQL queries to handle concurrent user sessions without contention. Achieved through composite indexes on frequently queried columns (user_id, status, created_at), query optimization to reduce table scans, and connection pooling for efficient resource utilization.

## Architecture & Design Decisions

**Modular Scraper Framework:**
Designed scraper architecture where each job board has an isolated scraper module with error handling and retry logic. This modularity enables adding new sources without affecting existing scrapers and allows independent failure handling.

**Data Normalization Layer:**
Implemented a normalization layer that transforms source-specific data into a consistent schema. This abstraction enables downstream analytics and filtering to work uniformly across all sources, regardless of origin.

**Background Job Processing:**
Separated scraping tasks into background jobs that run independently of user requests. This design prevents user-facing latency from blocking on network requests and enables better resource management (dedicated scraping workers vs API workers).

## Technical Depth

**SQL Query Optimization:**
Analyzed query execution plans and identified bottlenecks—table scans on unindexed columns, N+1 query patterns, and missing composite indexes. Implemented proper indexing strategy and optimized queries to use index-only scans where possible, reducing query time by 80% for common analytics queries.

**Concurrent Session Handling:**
Designed database access patterns to support concurrent users without lock contention. Used connection pooling to manage database connections efficiently, implemented read replicas for analytics queries where appropriate, and ensured transactions are short-lived to minimize lock duration.

**Error Handling & Resilience:**
Built robust error handling for network failures, parsing errors, and database issues. Implemented retry logic with exponential backoff, graceful degradation (continue serving cached data if scraping fails), and comprehensive logging for debugging production issues.

## Key Learnings

This project taught me that **production systems require different thinking than prototypes**—data quality, error handling, and performance under load all become critical. Building a data pipeline revealed the complexity of real-world data: inconsistent formats, rate limits, and the constant tension between data freshness and system stability. The production deployment forced me to think about monitoring, error recovery, and graceful degradation—skills essential for any production system.
