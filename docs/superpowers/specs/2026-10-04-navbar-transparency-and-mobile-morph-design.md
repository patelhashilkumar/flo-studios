# Specification: Navbar 50% Transparency & Direct Square Mobile Navigation

## Overview
This specification details the design adjustments to `FocusLensNavbar` in Flo Studios:
1. Making the navbar background 50% transparent (50% opacity) with backdrop blur on both desktop and mobile views while preserving 100% legibility on text and logos.
2. Eliminating the intermediate circle/oval morphing animation on mobile when opening the navigation drawer, ensuring it directly and cleanly expands as a rounded square/rectangle.

---

## 1. Problem Analysis

### Current Behavior:
* **Opacity:** The background linear gradients currently use high opacities (`0.84` to `0.98`), leaving the navbar nearly opaque (~10% transparent).
* **Mobile Morphing Bug:** 
  - `.liquid-glass-mobile-wrap` has a default `border-radius: 9999px` and `transition: border-radius 0.3s ease;`.
  - When `.liquid-glass-mobile-wrap--open` is added, `border-radius` transitions to `20px`.
  - Simultaneously, Framer Motion animates `height: 0 -> auto` for the mobile drawer.
  - During the 0.3s transition while height expands from 42px to ~300px, the intermediate `border-radius` (several thousand pixels) exceeds 50% of the box dimensions, causing the browser to render a giant distorted circle/oval before settling into a rounded rectangle.

---

## 2. Proposed Architecture & Solution

### A. 50% Transparency (Desktop & Mobile)
* **Glass Rim (`.liquid-glass-rim` & `.liquid-glass-mobile-wrap`):**
  - Adjust gradient color stops to 50% opacity levels (`rgba(255, 255, 255, 0.50)` down to `rgba(125, 130, 142, 0.38)`).
* **Glass Body (`.liquid-glass-body` & `.liquid-glass-mobile-inner`):**
  - Adjust background gradient color stops to 50% opacity:
    - `rgba(235, 238, 243, 0.50)`
    - `rgba(252, 253, 255, 0.52)`
    - `rgba(228, 232, 238, 0.48)`
  - Retain `-webkit-backdrop-filter: blur(28px) saturate(180%)` and `backdrop-filter: blur(28px) saturate(180%)` for frosted glass refraction.
* **Content Preservation:**
  - Navigation links, brand typography, Flo mark, and CTA buttons retain full `1.0` alpha for perfect contrast and readability.

### B. Direct Square Mobile Navigation (No Circle Morph)
* **Consistent Rounded Square Geometry:**
  - Update `.liquid-glass-mobile-wrap` to `border-radius: 18px` in its initial state (replacing `9999px`).
  - Keep `.liquid-glass-mobile-wrap--open` at `border-radius: 18px`.
  - Remove `transition: border-radius 0.3s ease;`.
* **Smooth Height Accordion:**
  - When the user taps the menu button, the drawer smoothly expands vertically via Framer Motion (`height: 0 -> auto`).
  - Because `border-radius` is constant (`18px`) throughout the entire opening and closing lifecycle, the navbar expands directly as a square box with smooth corners, completely eliminating the intermediate circle/oval artifact.

---

## 3. Files Impacted
- `src/components/FocusLensNavbar.css`
  - Calibrate alpha values for `.liquid-glass-rim`, `.liquid-glass-body`, `.liquid-glass-mobile-wrap`, and `.liquid-glass-mobile-inner`.
  - Update `.liquid-glass-mobile-wrap` border radius and remove border-radius transition.

---

## 4. Verification & Testing Criteria
1. **Desktop Verification:** At viewport widths > 860px, the liquid glass navbar displays 50% transparency, blurring page sections underneath while text links and brand logo remain crisp.
2. **Mobile Closed State:** At viewport widths <= 860px, the mobile navbar displays as a sleek rounded rectangular bar with 50% transparency.
3. **Mobile Open Animation:** Tapping MENU expands the menu drawer directly downward as a rectangle. No circular or oval morphing occurs at any frame of the animation.
4. **Mobile Close Animation:** Tapping CLOSE collapses the drawer smoothly back into the initial closed state without any shape distortion.
