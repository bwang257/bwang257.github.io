---
title: "Internship Tracker"
summary: "Production-deployed scraping pipeline handling automated job aggregation and user analytics. Supports concurrent user sessions with optimized SQL queries."
order: 2
tools:
  - "TypeScript"
  - "PostgreSQL"
  - "Web scraping"
  - "Data normalization"
  - "SQL optimization"
evidenceLinks:
  caseStudy: "/projects/internship-tracker"
  github: "https://github.com/bwang257/internship-tracker"
facts:
  - "Production-deployed scraping pipeline"
  - "Handles concurrent user sessions"
  - "Optimized SQL queries for analytics"
---

## Overview

**Problem:** Need to aggregate and track internship opportunities across multiple job boards and company sites. Manual tracking is inefficient and doesn't scale.

**Scope:** Build a production-deployed data pipeline that scrapes job postings, normalizes data, and provides analytics for users tracking their application status.

## The Challenge

**Data Pipeline Reliability:**
- Scrapers must handle varying HTML structures across different job boards
- Rate limiting and respectful crawling to avoid IP bans
- Data normalization across inconsistent formats

**Performance:**
- Support concurrent user sessions without database contention
- Optimize SQL queries for user analytics and filtering
- Handle large datasets efficiently

## The Solution

**Pipeline Architecture:**
- Modular scraper framework with error handling and retry logic
- Data normalization layer for consistent job postings
- Background job processing for scraping tasks

**Database Optimization:**
- Composite indexes on frequently queried columns
- Query optimization for user analytics
- Connection pooling for concurrent sessions

