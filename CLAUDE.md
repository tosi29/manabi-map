# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Manabi Map is a learning memo visualization platform that helps users rediscover past knowledge through intelligent serendipity. The application focuses on "accidental rediscovery" rather than planned study, making learning more natural and enjoyable.

## Core Architecture

### State Management Pattern
The app uses a hub-and-spoke pattern with custom hooks:
- `useLearningMemos`: Central state for all memos, filtering, and topics
- `useSerendipity`: Manages intelligent memo selection algorithms  
- `useSRS`: Handles importance marking (star functionality)

### Serendipity Engine
The core innovation is in `utils/learningCurveAnalysis.ts` which implements 5 discovery modes:
- **Intelligent**: Weighted combination of multiple factors (default)
- **Forgetting Curve**: Prioritizes 30-90 day old memos for natural review
- **Related**: Shows past memos related to recent learning topics
- **Growth**: Displays early memos from same topics to show progress
- **Random**: Traditional random selection

### Component Architecture
- **SerendipityCard**: Main feature component with mode selection and reasoning display
- **Timeline**: Chronological memo list with importance marking
- **TopicFilter**: Sidebar filtering by auto-extracted topics
- **MemoCard**: Individual memo display with star marking

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Linting
npm run lint

# Preview production build
npm run preview
```

## Data Model

Learning memos (`LearningMemo` interface) contain:
- Basic content: title, content, source, topics
- Metadata: createdAt, summary, isImportant
- SRS data (legacy, simplified for star functionality)

Topics are auto-extracted from memo content and used for filtering and serendipity algorithms.

## Mock Data Strategy

All data currently uses `mockData.ts` with 6 sample memos covering different topics and time periods. This provides a realistic testing environment for serendipity algorithms without requiring real data integration.

## Deployment

Configured for Netlify with SPA redirects in `netlify.toml`. Build outputs to `dist/` directory.

## UI Framework

Uses Tailwind CSS with Lucide React icons. Responsive design with mobile-first approach and desktop grid layout (1 col sidebar + 3 col main content).

## Key Implementation Notes

- No traditional spaced repetition system UI - serendipity handles natural review
- Star marking (`isImportant`) is primary user interaction for curation
- Serendipity reasoning is displayed to users for transparency
- All algorithms are probability-based rather than deterministic

## Design Philosophy & Evolution

### Concept Focus: "偶然の発見による学習"
The app prioritizes serendipitous rediscovery over systematic study. This philosophy drives all feature decisions - if a feature feels too "study-like" or systematic, it likely conflicts with the core concept.

### Removed Features
- **Review Management System**: Deliberately removed during development to avoid feature overlap with serendipity modes. The dedicated review UI created a "systematic study" feeling that conflicted with the serendipitous discovery concept.
- **Complex SRS Implementation**: Simplified to just importance marking, as the learning curve algorithms in serendipity provide natural review timing.

### UI Simplification Principle
The interface intentionally avoids overwhelming users with too many features in one area. The sidebar was streamlined to just topic filtering after removing review management, following the principle that serendipity should handle multiple use cases naturally.

## Future Development Guidelines

### When Adding Features
1. **Test against core concept**: Does this feature support "accidental rediscovery" or does it make the app feel like a study tool?
2. **Check for overlap**: Can serendipity algorithms handle this use case instead of adding dedicated UI?
3. **UI simplicity**: Avoid feature-heavy sidebars or multiple management interfaces.

### Algorithm Tuning
The intelligent serendipity weights are currently:
- Forgetting curve: 40%
- Related topics: 30% 
- Growth/progress: 20%
- Random element: 10%

These can be adjusted based on user behavior, but maintain some randomness to preserve the "serendipitous" feeling.

### Data Integration Notes
When moving beyond mock data, preserve the simplicity of the `LearningMemo` interface. Avoid complex metadata that would require additional management UI.