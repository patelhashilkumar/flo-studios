# Spec: Scroll-Aware Navbar Hide/Show Behavior (Instrument.com Style)

## 1. Overview
Implement smart auto-hiding navigation behavior on `FocusLensNavbar` matching modern editorial design standards (like instrument.com):
- When the user scrolls **down**, the fixed top navbar smoothly slides up out of view (`transform: translateY(-100%)`).
- When the user scrolls **up**, the navbar immediately and smoothly slides down into view (`transform: translateY(0)`).
- When at the top of the page (`scrollY <= 50px`), the navbar remains anchored and fully visible.
- If the mobile drawer is currently open, hiding is inhibited to prevent disrupting navigation.

---

## 2. Technical Architecture & Data Flow

### 2.1 Scroll Detection Logic in `FocusLensNavbar.jsx`
- **State:** `const [isVisible, setIsVisible] = useState(true)`
- **Refs:**
  - `lastScrollY`: tracks previous scroll position to calculate scroll delta (`window.scrollY`).
  - `ticking`: boolean flag to throttle scroll handler via `requestAnimationFrame`.
- **Hysteresis / Jitter Protection:**
  - `SCROLL_DELTA_THRESHOLD = 8px` prevents trackpad bounce/micro-jitter from triggering accidental toggles.
  - `TOP_THRESHOLD = 50px`: below this point, `isVisible` is unconditionally forced to `true`.
- **Direction Determination:**
  - `delta > SCROLL_DELTA_THRESHOLD` (scrolling down) -> `setIsVisible(false)`
  - `delta < -SCROLL_DELTA_THRESHOLD` (scrolling up) -> `setIsVisible(true)`
- **Passive Listener:**
  - `window.addEventListener('scroll', handleScroll, { passive: true })`
  - Synced seamlessly with Lenis smooth-scroll.

### 2.2 Mobile Drawer Override
- When `mobileOpen` is `true`, `isVisible` remains `true` and hiding is suppressed.

### 2.3 CSS Transition in `FocusLensNavbar.css`
- Apply transition on `.global-header`:
  ```css
  transition: transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
  will-change: transform;
  ```
- Modifier class when hidden:
  ```css
  .global-header--hidden {
    transform: translateY(-100%);
    pointer-events: none;
  }
  ```

---

## 3. Edge Cases & Resilience
1. **Lenis Integration:** Since Lenis scrolls the native `window`, native passive scroll events fire consistently on every frame.
2. **Page Reload & Deep Linking / Anchors:** At scroll position 0 or on route change, navbar resets to visible.
3. **Accessibility:** Hidden state applies `pointer-events: none` and preserves keyboard navigation focus.

---

## 4. Verification Plan
- Scroll down past 60px -> header translates out of view smoothly.
- Scroll up slightly -> header slides back down instantly.
- Scroll back to top -> header stays visible.
- Open mobile menu -> scroll down; header stays visible while drawer is open.
- Run `npm run build` -> 0 errors.
