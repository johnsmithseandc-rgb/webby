# Quiz Pop! Mobile Web Design Guidelines

## Design Approach
**Reference-Based: Gamified Educational Apps**
Drawing inspiration from Duolingo, Kahoot!, and Quizlet for their playful, engaging educational interfaces. The design prioritizes fun, accessibility, and clarity for mobile-first quiz gameplay.

## Typography System

**Primary Font:** Rounded sans-serif (e.g., Nunito, Quicksand, or Poppins via Google Fonts)
- App Title/Logo: 900 weight, 48-56px
- Page Headers: 800 weight, 32-36px
- Category Titles: 700 weight, 18-20px
- Body Text: 600 weight, 16px
- Button Text: 700 weight, 16-18px

**Hierarchy:** Large, bold typography creates playful energy. All text should feel friendly and approachable, optimized for quick mobile readability.

## Layout System

**Spacing Primitives:** Tailwind units of 4, 6, 8, and 12
- Container padding: p-6 to p-8
- Component spacing: gap-4 to gap-6
- Section margins: my-8 to my-12
- Button padding: px-8 py-4

**Mobile Viewport Strategy:**
- Splash screen: Full viewport height (100vh) with centered content
- Category selection: Scrollable content with natural height, top padding py-8
- Maximum width: max-w-md centered on larger screens
- Minimum touch targets: 44px height for all interactive elements

## Component Library

### Splash Screen Components
**Logo Container:**
- Large circular badge/emblem design with app icon
- Centered positioning with generous top margin (mt-12 to mt-16)
- App name directly below logo with subtitle/tagline

**Action Buttons:**
- Primary "Start" button: Large, rounded-full design (min h-14)
- Secondary "About Us" button: Same size, outlined style
- Stacked vertically with gap-4
- Fixed bottom positioning with pb-8 for comfortable thumb reach

### Category Selection Screen
**Header:**
- "Destination to go..." text as welcoming prompt (text-2xl font-bold)
- Centered alignment with mb-6

**Category Cards:**
- Grid layout: Single column stack (space-y-4)
- Each card: Rounded-2xl with generous padding (p-6)
- Left-aligned icon (48x48px) with category name beside it
- Full-width cards with subtle shadow (shadow-md)
- Icon size: w-12 h-12, positioned using flex layout
- Category text: font-bold text-lg

**Categories (as shown):**
1. Araling Panlipunan (Social Studies icon)
2. Filipino (Language icon)
3. Math (Calculator icon)
4. CLE Values (Heart/Star icon)
5. English (Book icon)

### Navigation Pattern
- No visible top navigation bar on splash (full immersion)
- Simple back button (top-left, small icon) on category selection
- Bottom-safe area padding for modern mobile devices (pb-safe)

## Visual Treatment Guidelines

**Rounded Corners:**
- Buttons: rounded-full for primary actions
- Cards: rounded-2xl for category selections
- Logo container: rounded-full or badge shape

**Shadows & Depth:**
- Cards: shadow-md for subtle elevation
- Active states: shadow-lg for feedback
- Buttons: shadow-sm at rest

**Iconography:**
- Use colorful, friendly icons from Heroicons or custom educational icon set
- Icons should be simple, recognizable, filled style
- Consistent sizing: 48x48px for category cards, 24x24px for UI elements

## Interaction Patterns

**Button States:**
- Default: Solid fill with shadow
- Active/Tap: Scale down slightly (scale-95), deeper shadow
- Disabled: Reduced opacity (opacity-50)

**Card Interactions:**
- Tap target: Entire card is interactive
- Feedback: Subtle scale (scale-98) and shadow increase
- No hover states (mobile-optimized)

**Transitions:**
- Page transitions: Slide animations (slide-in-right for forward navigation)
- Button taps: Immediate visual feedback (<100ms)
- Keep animations minimal and snappy for game feel

## Mobile-First Specifications

**Safe Zones:**
- Top notch avoidance: pt-safe or pt-12
- Bottom gesture area: pb-safe or pb-8
- Side margins: px-6 minimum

**Touch Optimization:**
- Minimum interactive size: 44x44px
- Spacing between tap targets: 8px minimum
- Primary actions in thumb-reach zone (bottom third of screen)

**Performance:**
- Lightweight page loads (<500kb per page)
- Instant page transitions
- Optimized for 3G networks

## Content Strategy

**Splash Screen:**
- Minimal text, maximum visual impact
- Clear value proposition (if subtitle added)
- Immediate action (Start button prominence)

**Category Selection:**
- Clear, simple category labels
- Visual consistency across all categories
- Logical grouping/ordering of subjects

**Accessibility:**
- High contrast text on all backgrounds
- Large, legible fonts (minimum 16px body)
- Clear focus states for keyboard navigation
- Semantic HTML for screen readers

## Vertical Rhythm
- Consistent top padding across all screens: pt-8 to pt-12
- Section spacing: space-y-6 for related elements, space-y-8 between sections
- Bottom safe area consistently respected across all pages

This design creates an engaging, playful mobile quiz experience optimized for portrait phone usage with clear navigation and delightful interactions.