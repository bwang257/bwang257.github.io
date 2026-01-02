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
---

## Impact & Motivation
A course project for WPI's Software Engineering Course, this project was built as a team of four to explore what it takes to ship a moderately complex web application end to end. My goal was to learn how to collaborate, plan, and deliver software under real constraints—uncertain requirements, time pressure, and coordination across contributors.

The application helps students track internship applications using lightweight gamification (XP, streaks, leaderboards) to encourage consistent behavior.

## Team Process & Collaboration

**Scrum/Agile Development Process**
Worked in short sprints/iterations with clearly scoped tasks and milestones. Features were broken down and tracked using GitHub Issues, with regular check-ins to reassess scope and priorities.

**Version Control**
Used Github for:
- issue tracking
- feature branches
- pull requests

**Stakeholder Communication**

Worked with a TA and course instructor as stakeholders, incorporating feedback on:
- feature scope
- usability
- technical tradeoffs

This forced prioritization and scope control rather than continuous feature expansion.


## Technical Scope
- Backend: Flask application with role-based user flows, authentication, and CRUD APIs backed by PostgreSQL via SQLAlchemy
- Database: Relational schema with many-to-many relationships, managed with migrations and basic indexing
- Gamification: Simple XP, leveling, streaks, and badge logic implemented at the application layer
- Web Scraping: Modular scraper framework used experimentally to import internship postings into a normalized schema
- Frontend: Server-rendered pages using Jinja2 and Tailwind CSS with light JavaScript for interactivity
- Testing: Unit tests covering core model logic and authentication flows
- Deployment: Dockerized application deployed to AWS, with environment-based configuration
- Process: Built by a team of four using Scrum-style iteration, GitHub Issues/PRs, and stakeholder feedback; AI tools (Cursor, Copilot) used selectively to accelerate late-stage development

## Use of AI-Assisted Development
In the later stages of the project, we deliberately used tools like Cursor and GitHub Copilot to accelerate delivery of remaining features and improve test coverage.

This was a practical lesson in:
- when AI tooling helps (boilerplate, repetitive patterns)
- when it doesn’t (design decisions, debugging, coordination)
- how to integrate AI output responsibly into a shared codebase

## Key Learnings


This project taught me that shipping software as a team is fundamentally different from building solo projects.

The hardest problems were not algorithmic: 
- making design decisions early
- coordinating parallel work
- delegating tasks effectively
- communicating progress clearly under time constraints.