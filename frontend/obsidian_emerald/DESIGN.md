---
name: Obsidian Emerald
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#bbcabf'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#86948a'
  outline-variant: '#3c4a42'
  surface-tint: '#4edea3'
  primary: '#4edea3'
  on-primary: '#003824'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#006c49'
  secondary: '#45dfa4'
  on-secondary: '#003825'
  secondary-container: '#00bd85'
  on-secondary-container: '#00452e'
  tertiary: '#c0c1ff'
  on-tertiary: '#1000a9'
  tertiary-container: '#9699ff'
  on-tertiary-container: '#1d17b2'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#68fcbf'
  secondary-fixed-dim: '#45dfa4'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-md:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: 0.05em
  code:
    fontFamily: Geist
    fontSize: 13px
    fontWeight: '400'
    lineHeight: '1.4'
    letterSpacing: '0'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-padding: 32px
  gutter: 16px
---

## Brand & Style
The design system is engineered for elite personal performance, blending the technical precision of developer tools with the refined aesthetics of high-end lifestyle applications. It prioritizes focus, clarity, and the psychological "flow state" required for deep work.

The visual style is a sophisticated **Hybrid-Minimalist** approach. It utilizes the structural density of Linear and GitHub, the layout flexibility of Notion, and the atmospheric depth of Vercel. The interface uses high-contrast emerald accents against deep charcoal backgrounds to signal growth and vitality within a professional, high-performance environment. Glassmorphism is used sparingly for navigation and overlays to maintain a sense of lightness and technical sophistication.

## Colors
The palette is centered on "Emerald Efficiency." The primary emerald green (#10b981) is reserved for growth indicators, primary actions, and success states, providing a high-energy contrast against the dark environment.

- **Backgrounds:** Use a deep neutral-950 (#0a0a0a) for the primary canvas to minimize eye strain and maximize the "ink-on-paper" feel of the typography.
- **Surfaces:** Elevated cards use a subtle neutral-900 (#171717) with 1px borders.
- **Accents:** A secondary mint-green is used for interactive hover states, while a technical indigo-500 is used sparingly for secondary data streams or "focus mode" indicators.
- **Semantic Colors:** Warning (Amber-400), Error (Rose-500), and Info (Sky-400) follow a desaturated profile to ensure they don't break the dark-mode harmony.

## Typography
The typography system relies on **Inter** for its exceptional legibility and systematic feel. For technical labels and metadata, **Geist** (or a similar high-quality mono-spaced font) is introduced to evoke a developer-centric, high-performance aesthetic.

Maintain a tight hierarchy:
- Use **Display** sizes for dashboard headers or "Big Goals."
- **Labels** should be used for metadata, tags, and small utility text, often in uppercase with slight tracking.
- **Body-md** is the workhorse for all dashboard content and list items.
- Line heights are kept generous (1.5 - 1.6x) for body text to ensure readability during long planning sessions.

## Layout & Spacing
The layout follows a **Fluid-Fixed Hybrid** model. The sidebar remains a fixed width (240px - 280px) for consistent navigation, while the main dashboard canvas utilizes a fluid 12-column grid.

- **Dashboard Grids:** Use a 16px (md) gutter between cards. 
- **Content Density:** Elements are packed with technical precision, favoring a "Compact-yet-Breathable" rhythm. Use 32px (lg) margins for the main content area.
- **Responsive Behavior:** On tablet, the 12-column grid collapses to 6 columns. On mobile, the grid shifts to a single column stack with reduced margins (16px) and the sidebar becomes a bottom sheet or a full-screen modal overlay.

## Elevation & Depth
Depth is achieved through **Tonal Layering** rather than traditional drop shadows. This creates a flat, professional architectural feel reminiscent of Vercel and GitHub.

- **Level 0 (Base):** #0a0a0a (Neutral-950).
- **Level 1 (Cards/Surface):** #171717 (Neutral-900) with a 1px solid border (#262626).
- **Level 2 (Hover/Active):** #262626 (Neutral-800) with a subtle emerald-tinted outer glow (4px blur, 10% opacity emerald-500).
- **Overlays (Modals/Popovers):** Semi-transparent neutral-900 with a 12px backdrop blur (Glassmorphism), creating a sense of physical layering without clutter.

## Shapes
The shape language is defined by large, friendly outer radii contrasted with sharp inner content. 

- **Primary Cards:** 18px corner radius (`rounded-xl` equivalent).
- **Interactive Elements:** Buttons and inputs use a 10px radius to appear slightly more precise than the containers they sit in.
- **Small Components:** Tags and chips use a 6px radius.
- **Heatmaps:** GitHub-style contribution squares use a 2px radius for a clean, technical grid appearance.

## Components
Consistent implementation of components is critical for the "OS" feel.

- **Modern Cards:** 18px radius, #171717 background, 1px #262626 border. Title should be Headline-md. Content should use Body-md.
- **Primary Buttons:** Solid Emerald-500 background with Neutral-950 text. No shadow, 10px radius. On hover, background shifts to Emerald-400.
- **Secondary Buttons:** Ghost style; 1px #262626 border, transparent background, white text.
- **GitHub-style Heatmaps:** A grid of 12x12px squares. Empty state is #171717; active states scale through four shades of Emerald (Emerald-900 to Emerald-400).
- **Progress Rings:** Use a 4px stroke width. Background track is #262626, active track is Emerald-500. Add a subtle outer glow to the active track.
- **Form Inputs:** Dark background (#0a0a0a), 1px border (#262626), 10px radius. On focus, border becomes Emerald-500 with a subtle Emerald glow.
- **Interactive Charts:** Line charts should use Emerald-500 for the primary data line with a soft emerald gradient fill below the line (20% to 0% opacity).