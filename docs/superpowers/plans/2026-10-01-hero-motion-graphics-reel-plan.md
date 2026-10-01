# Hero Motion Graphics Multi-Reel Switcher Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Vimeo embeds in the Hero section with an interactive multi-reel motion graphics switcher featuring local Apple, Blitzit, and SV videos and thumbnails with a full theater player.

**Architecture:** A centralized `HERO_REELS` data configuration defines video and thumbnail paths. The Hero video card renders a looping HTML5 `<video>` for the active reel, alongside a bottom-left glassmorphic tab switcher (Apple, Blitzit, SV) and dynamic status badge. The central play button triggers a full theater modal with native audio and playback controls, automatically coordinating pause/resume states between the card and modal.

**Architecture Diagram:**

```mermaid
graph TD
    subgraph "Hero Component (src/components/Hero.jsx)"
        A[HERO_REELS Configuration] --> B[activeReelIndex State]
        B --> C[Card Video Player <video>]
        B --> D[Reel Switcher Tabs: Apple | Blitzit | SV]
        B --> E[Dynamic Badge: Active Project]
        F[Play Button Trigger] -->|setModalOpen true| G[Full Theater Modal]
        G --> H[Modal Video Player with Audio]
        C -.->|pause when modal open| G
        G -.->|resume card video on close| C
    end
```

**Tech Stack:** React 19, Vite 8, GSAP 3, CSS Glassmorphism, HTML5 Media API.

## Global Constraints
- Target files: `src/components/Hero.jsx`, `src/components/Hero.css`.
- Asset directory: `public/videos/` (`apple.mov`, `apple-thumb.png`, `blitzit2.mov`, `blitzit-thumb.png`, `sv-final.mov`, `sv-thumb.png`).
- Codec: H.264 (AVC1), compatible with all modern browsers via `<source type="video/mp4">` and `<source type="video/quicktime">`.
- Zero broken layouts on mobile (375px) through fluid flex-wrap and clamp scaling.

---

### Task 1: Update Hero Component with Reel Switcher and Local Video Players

**Files:**
- Modify: `src/components/Hero.jsx`

**Interfaces:**
- Consumes: Local media from `/videos/`
- Produces: Interactive multi-video card and synchronized modal theater

- [ ] **Step 1: Update `Hero.jsx` with `HERO_REELS` configuration, reel switcher state, and video refs**

In `src/components/Hero.jsx`:
- Define `HERO_REELS` constant with Apple, Blitzit, and SV metadata.
- Add `activeReelIdx` state (defaulting to 0).
- Add `cardVideoRef` and `modalVideoRef` refs.
- Synchronize pause/play states between card loop and modal theater.
- Render glassmorphic reel switcher tabs inside `.hero__video-card`.
- Replace Vimeo iframe in modal with HTML5 `<video>` element with audio and native controls.

- [ ] **Step 2: Verify syntax and linting**

Run: `npm run lint` or `npm run build`
Expected: Build passes with 0 errors.

- [ ] **Step 3: Commit Task 1**

```bash
git add src/components/Hero.jsx
git commit -m "feat: add multi-reel motion graphics switcher to Hero component"
```

---

### Task 2: Style Reel Switcher, Video Media, and Modal Player in Hero.css

**Files:**
- Modify: `src/components/Hero.css`

**Interfaces:**
- Consumes: `.hero__video-card`, `.hero__video-media`, `.hero__reel-switcher`, `.hero__reel-tab`
- Produces: Sleek studio-grade glassmorphic aesthetic matching Instrument design

- [ ] **Step 1: Add video media and reel switcher styles to `Hero.css`**

In `src/components/Hero.css`:
- Style `.hero__video-media` with `object-fit: cover`, `width: 100%`, `height: 100%`.
- Style `.hero__reel-switcher` with glassmorphic backdrop filter, rounded pill container, and position bottom-left.
- Style `.hero__reel-tab` with smooth hover, focus, and active transitions.
- Style modal HTML5 video container and controls.
- Add mobile media query adjustments for tabs on 375px viewports.

- [ ] **Step 2: Verify styling and build**

Run: `npm run build`
Expected: Build completes successfully.

- [ ] **Step 3: Commit Task 2**

```bash
git add src/components/Hero.css
git commit -m "style: add glassmorphic reel switcher and responsive video player styles"
```

---

### Task 3: End-to-End Verification & Browser Polish

**Files:**
- Verify: `http://localhost:5173/`

- [ ] **Step 1: Test switching between Apple, Blitzit, and SV reels in the hero card**
- [ ] **Step 2: Test opening full theater modal with audio and closing via backdrop/esc/button**
- [ ] **Step 3: Test responsive layout on desktop and mobile viewports**
- [ ] **Step 4: Final commit and cleanup**
