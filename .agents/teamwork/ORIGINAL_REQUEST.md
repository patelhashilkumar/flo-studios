# Original User Request

## 2026-09-30T15:47:25Z

# Teamwork Project Prompt — Draft

> Status: Step 9 — Ready for launch — awaiting user approval
> Goal: Craft prompt → get user approval → delegate to teamwork_preview
> Requested team: Small, focused team

This is a single self-contained fix; keep it small and focused. Improve the existing website located at `c:\Users\hashi\Documents\MCP projects\new site` by implementing smooth scrolling functionality and refactoring the codebase to ensure high-quality, maintainable code.

Working directory: c:\Users\hashi\Documents\MCP projects\new site
Integrity mode: demo

## Requirements

### R1. Smooth Scrolling Implementation
Implement smooth scrolling functionality across the website. Evaluate the existing codebase and choose the most appropriate implementation method (e.g., pure CSS or a robust JS library) to ensure a high-quality user experience.

### R2. Code Quality Refactoring
Refactor the existing codebase to improve overall quality. Apply standard formatting, remove dead code, and make necessary structural improvements as identified during your assessment.

## Verification Resources
- The agent should first inspect the repository for any existing linting or formatting configurations (e.g., ESLint, Prettier, etc.) and use them if available.
- If no configurations are found, use an independent agent-as-judge with a strict rubric to evaluate code quality and structure.

## Acceptance Criteria

### Functionality
- [ ] Smooth scrolling is implemented and functions flawlessly across the primary viewports/pages.
- [ ] The chosen scrolling implementation does not introduce console errors or break existing layout elements.

### Code Quality
- [ ] The codebase passes all checks from existing linting/formatting tools (if present).
- [ ] If no tools are present, an independent agent-as-judge confirms that dead code has been removed and the code structure has been noticeably improved.
- [ ] No regression in existing functionality.
