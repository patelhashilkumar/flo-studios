# Studio Monolith — Design System

## Typography
- **Primary Font (Display)**: 'Space Grotesk', sans-serif
- **Secondary Font (Body)**: 'Hanken Grotesk', sans-serif
- **Display XL**: 700 120px/110px (Letter Spacing: -0.04em)
- **Headline Large**: 600 64px/72px (Desktop), 600 40px/44px (Mobile) (Letter Spacing: -0.02em)
- **Headline Medium**: 500 32px/40px (Letter Spacing: -0.01em)
- **Body Large**: 400 18px/28px
- **Body Medium**: 400 16px/24px
- **Label Caps**: 700 12px/16px (Letter Spacing: 0.1em)

## Colors

### Surface
- **Surface**: #f9f9f9
- **Surface Dim**: #dadada
- **Surface Bright**: #f9f9f9
- **Surface Container Lowest**: #ffffff
- **Surface Container Low**: #f3f3f3
- **Surface Container**: #eeeeee
- **Surface Container High**: #e8e8e8
- **Surface Container Highest**: #e2e2e2
- **On Surface**: #1b1b1b
- **On Surface Variant**: #4c4546
- **Inverse Surface**: #303030
- **Inverse On Surface**: #f1f1f1

### Brand & Accents
- **Primary**: #000000
- **On Primary**: #ffffff
- **Primary Container**: #1b1b1b
- **On Primary Container**: #848484
- **Inverse Primary**: #c6c6c6
- **Secondary**: #5d5f5f
- **On Secondary**: #ffffff

### Backgrounds & Outlines
- **Background**: #f9f9f9
- **On Background**: #1b1b1b
- **Outline**: #7e7576
- **Outline Variant**: #cfc4c5
- **Outline Hairline**: rgba(0, 0, 0, 0.1)

## Spacing & Layout
- **Base Unit**: 8px
- **Container Max Width**: 1440px
- **Gutter**: 24px
- **Margins**: 
  - Desktop: 80px
  - Tablet: 40px
  - Mobile: 20px
- **Section Gap**: 
  - Desktop: 160px
  - Mobile: 80px

## UI Elements
- **Border Radius**: 0px (Strict architectural corners)
- **Transitions**:
  - Fast: 0.15s
  - Normal: 0.3s
  - Easing: cubic-bezier(0.16, 1, 0.3, 1)

## Architecture & Interaction

### Tech Stack
- **Framework**: React 19 + Vite
- **Styling**: Plain CSS with CSS Variables
- **Animation Engine**: GSAP (GreenSock Animation Platform) + ScrollTrigger
- **3D Engine**: Three.js via React Three Fiber (@react-three/fiber) & Drei

### Component Flow
1. **Hero Section**: High-impact typography and premium brand identity.
2. **Services Section**: Bento Grid layout, glassmorphism cards, staggered GSAP slide-in animations on scroll, and magnetic hover lifts.
3. **Proof of Work**: Cinematic Video Showreel grid with animated gradient placeholders, expanding Play buttons, and complex hover physics.
4. **Skills Showcase**: Spatial 3D Interface (React Three Fiber), 12 ultra-thin frosted glass cards using `MeshTransmissionMaterial`, 3D typography, cinematic fanning animation on scroll, and mouse-driven camera parallax.
5. **Workflow Section**: 3D Interactive Path (CatmullRom tube path) for physical camera travel on scroll, glowing 3D spheres with floating HTML labels.
6. **Journey Collage**: Scroll-pinned narrative (GSAP ScrollTrigger) with blur-to-focus transitions, animated SVGs, and sequential fading/scaling steps.
7. **Footer**: Minimalist layout to be upgraded to an interactive film-strip style layout.

### Responsive Strategy
- **Fluid Layouts**: Use of CSS `clamp()` functions for fonts, margins, and paddings.
- **Mobile Fallbacks**: Intensive 3D operations degrade gracefully on touch devices for performance.
