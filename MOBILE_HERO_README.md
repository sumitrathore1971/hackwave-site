# Mobile Hero Component

## Overview

The Mobile Hero component is a mobile and tablet-optimized version of the main hero section that uses a different animation approach without duplicate icons. Instead, it uses a card-based layout with smooth animations that are more suitable for touch devices.

## Features

### 🎨 **Card-Based Animation**

- Uses individual icon cards instead of duplicate icons
- Cards slide in from different directions (top-left, top-right, bottom-left, bottom-right, top)
- Smooth scaling and opacity transitions
- Cards move to their final positions near text segments

### 📱 **Mobile-First Design**

- Responsive design for mobile phones and tablets
- Optimized touch interactions
- Smaller, more manageable animations
- Better performance on mobile devices

### 🎭 **Animation Phases**

1. **Header Fade Out** (0% - 20%): Header moves up and fades out
2. **Cards Entrance** (20% - 50%): Cards slide in from different directions
3. **Cards to Text** (50% - 70%): Cards move to their final positions near text
4. **Text Reveal** (70% - 90%): Text segments fade in with staggered timing
5. **Color Blocks** (90% - 100%): Color blocks slide down, fading out content

### 🎯 **Key Differences from Desktop Hero**

| Feature              | Desktop Hero                                 | Mobile Hero                                  |
| -------------------- | -------------------------------------------- | -------------------------------------------- |
| Icon Animation       | Duplicate icons with complex positioning     | Card-based with simple movements             |
| Text Layout          | Inline with placeholder icons                | Stacked with cards positioned nearby         |
| Animation Complexity | High (multiple phases, complex calculations) | Medium (simpler, more predictable)           |
| Performance          | Heavy (many DOM manipulations)               | Lighter (fewer elements, simpler animations) |
| Touch Optimization   | None                                         | Optimized for touch interactions             |

## Usage

### Basic Usage

```tsx
import MobileHero from "@/components/landing/mobile-hero";

function App() {
  return (
    <div>
      <MobileHero />
      {/* Other components */}
    </div>
  );
}
```

### Responsive Usage (Recommended)

```tsx
import ResponsiveHero from "@/components/landing/responsive-hero";

function App() {
  return (
    <div>
      <ResponsiveHero />
      {/* Automatically chooses between desktop and mobile hero */}
    </div>
  );
}
```

## Component Structure

```
MobileHero/
├── Header Section (Logo, dates, info)
├── Cards Container (5 animated icon cards)
├── Text Container (6 text segments)
└── Color Blocks (5 animated color blocks)
```

## Animation Timeline

```
0%    ── Header starts fading out
20%   ── Cards begin sliding in from directions
50%   ── Cards move to text positions
70%   ── Text segments start revealing
90%   ── Color blocks slide down
100%  ── Animation complete
```

## Responsive Breakpoints

- **Mobile (≤480px)**: Smallest cards, compact text
- **Tablet (481px-768px)**: Medium cards, balanced text
- **Large Tablet (769px-1024px)**: Larger cards, full text

## Customization

### Modifying Card Sizes

```css
/* In globals.css */
.mobile-hero .card {
  width: 3rem !important; /* Custom size */
  height: 3rem !important;
}
```

### Changing Animation Timing

```tsx
// In the component, modify these values:
const cardDelay = index * 0.1; // Delay between cards
const segmentDelay = index * 0.05; // Delay between text segments
```

### Adjusting Colors

```tsx
// Modify the rainbowBlocks array:
const rainbowBlocks = [
  { color: "#your-color", radius: "2rem 2rem 0 0" },
  // ... more colors
];
```

## Performance Considerations

- **Lighter DOM**: Fewer elements than desktop version
- **Simpler Calculations**: Less complex positioning math
- **Touch Optimized**: Better for mobile scrolling
- **Memory Efficient**: No duplicate icon cleanup needed

## Browser Support

- Modern browsers with CSS transforms support
- Touch devices (iOS Safari, Chrome Mobile, etc.)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Dependencies

- React 18+
- GSAP (for animations)
- Lenis (for smooth scrolling)
- Tailwind CSS (for styling)

## Troubleshooting

### Cards Not Animating

- Check if GSAP is properly imported
- Verify ScrollTrigger is registered
- Ensure all refs are properly connected

### Text Not Revealing

- Check text segment refs
- Verify opacity transitions are working
- Ensure ScrollTrigger progress is correct

### Performance Issues

- Reduce animation complexity
- Lower the number of cards
- Simplify color block animations

## Future Enhancements

- [ ] Add gesture support for mobile interactions
- [ ] Implement lazy loading for better performance
- [ ] Add accessibility features (ARIA labels, keyboard navigation)
- [ ] Create more animation presets
- [ ] Add sound effects option
