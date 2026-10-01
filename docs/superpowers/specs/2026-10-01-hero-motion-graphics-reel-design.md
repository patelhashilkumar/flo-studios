# Hero Motion Graphics Multi-Reel Switcher — Design Spec

**Date:** 2026-10-01  
**Project:** Flo Studios Web Platform  
**Status:** Approved by User  

---

## 1. Overview & Objective

Upgrade the Hero video player from third-party Vimeo embeds to an interactive **Multi-Video Reel Showcase** featuring the user's motion graphics projects (`Apple`, `Blitzit`, `SV`). Visitors can preview each project in a silent background loop and trigger a full theater player with audio and controls.

---

## 2. Media Assets

The motion graphics assets are hosted locally in `public/videos/`:

| Project | Video Source | Thumbnail Poster | Badge Label |
| :--- | :--- | :--- | :--- |
| **Apple** | `/videos/apple.mov` | `/videos/apple-thumb.png` | `APPLE MOTION` |
| **Blitzit** | `/videos/blitzit2.mov` | `/videos/blitzit-thumb.png` | `BLITZIT 2.0` |
| **SV** | `/videos/sv-final.mov` | `/videos/sv-thumb.png` | `SV SHOWCASE` |

---

## 3. UI/UX Architecture

```mermaid
graph TD
    A[Hero Video Card] --> B[Card Video Player: Active Project]
    A --> C[Glassmorphism Reel Switcher Tabs: Apple | Blitzit | SV]
    A --> D[Central Play Button]
    A --> E[Dynamic Status Badge: Active Reel Title]
    C -->|onClick: select project| B
    C -->|updates| E
    D -->|onClick: open modal| F[Full Reel Theater Modal]
    F --> G[Audio + Fullscreen Native Video Player]
    B -->|auto-pause when modal open| H[Resource Optimization]
    F -->|onClose: resume| B
```

### 3.1 Card Looping Player (`.hero__video-card`)
- Uses HTML5 `<video key={activeReel.id} autoPlay loop muted playsInline poster={activeReel.posterSrc}>` with fallback `<source src={activeReel.videoSrc} type="video/mp4" />` and `<source src={activeReel.videoSrc} type="video/quicktime" />`.
- Styled with `object-fit: cover`, hardware acceleration, and smooth opacity transition on switch.

### 3.2 Glassmorphic Project Switcher Tabs
- Positioned at the bottom-left inside `.hero__video-card`.
- Dark blur glassmorphism pill (`background: rgba(0, 0, 0, 0.65); backdrop-filter: blur(14px)`).
- Tabs for **Apple**, **Blitzit**, **SV** with active indicator styling (white pill background with dark text for active tab, translucent white text for inactive).
- Keyboard accessible (`button` elements with aria labels).

### 3.3 Dynamic Status Badge
- Positioned at the bottom-right inside `.hero__video-card`.
- Displays glowing pulsating green status dot and the active project name (e.g. `● BLITZIT 2.0`).

### 3.4 Full Reel Theater Modal
- Displays full-resolution video for the currently active project.
- Unmuted audio, native HTML5 controls (play, pause, seek, volume, fullscreen).
- Header label showing the current project title in the modal.
- Closes via Close button (`X`), `Escape` key, or backdrop click.
- Pauses modal playback and resumes card loop automatically on close.

---

## 4. Implementation Details

- **`src/components/Hero.jsx`**:
  - Add `HERO_REELS` array.
  - Add state: `activeReelIndex` (defaults to 0, Apple).
  - Add `cardVideoRef` and `modalVideoRef` refs.
  - Implement smooth tab switching with fade animation.
  - Implement cross-pausing between card video and modal video.
- **`src/components/Hero.css`**:
  - Add styling for `.hero__video-media`, `.hero__reel-switcher`, `.hero__reel-tab`, `.hero__reel-tab--active`.
  - Add transition animations for switching between reels.
  - Responsive layout for tablet and mobile screens (wrapping and compact tab sizing).

---

## 5. Verification Plan

1. **Asset loading:** Confirm all 3 videos and thumbnails stream properly from `/videos/`.
2. **Tab switching:** Verify clicking Apple, Blitzit, and SV switches video and poster smoothly.
3. **Modal playback:** Verify clicking Play opens modal with matching active video and sound.
4. **Clean closure:** Verify closing modal pauses audio and resumes background card loop.
5. **Mobile layout:** Verify tabs and controls fit within 375px mobile viewports.
6. **Build verification:** `npm run build` passes with zero errors.
