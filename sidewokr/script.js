// ============================================================================
// IMPORTS AND SETUP
// ============================================================================

// Import GSAP (GreenSock Animation Platform) for smooth animations
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
// Import ScrollTrigger plugin for scroll-based animations
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";
// Import Lenis for smooth scrolling
import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.35/+esm";

// Register ScrollTrigger as a GSAP plugin
gsap.registerPlugin(ScrollTrigger);

// Initialize Lenis smooth scrolling
const lenis = new Lenis();

// Connect Lenis scroll events to ScrollTrigger for proper synchronization
lenis.on("scroll", ScrollTrigger.update);

// Add Lenis to GSAP ticker for smooth animation loop
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

// Disable GSAP lag smoothing for more responsive animations
gsap.ticker.lagSmoothing(0);

// ============================================================================
// DOM ELEMENT SELECTORS
// ============================================================================

// Get all the DOM elements we need to animate
const animatedIcons = document.querySelector(".animated-icons"); // Container for all animated icons
const iconElements = document.querySelectorAll(".animated-icon"); // Individual icon elements
const textSegments = document.querySelectorAll(".text-segment"); // Text segments that fade in
const placeholders = document.querySelectorAll(".placeholder-icon"); // Placeholder positions for icons
const heroHeader = document.querySelector(".hero-header"); // Hero header (logo + tagline)
const heroSection = document.querySelector(".hero"); // Main hero section

// ============================================================================
// TEXT ANIMATION ORDER RANDOMIZATION
// ============================================================================

// Create an array to store text segments with their original indices
const textAnimationOrder = [];
textSegments.forEach((segment, index) => {
  textAnimationOrder.push({ segment, originalIndex: index });
});

// Randomize the order of text segments for a more dynamic animation
// This uses the Fisher-Yates shuffle algorithm
for (let i = textAnimationOrder.length - 1; i > 0; i--) {
  const j = Math.floor(Math.random() * (i + 1));
  [textAnimationOrder[i], textAnimationOrder[j]] = [
    textAnimationOrder[j],
    textAnimationOrder[i],
  ];
}

// ============================================================================
// RESPONSIVE DESIGN CALCULATIONS
// ============================================================================

// Determine if we're on mobile (width <= 1000px)
const isMobile = window.innerWidth <= 1000;

// Set icon size based on screen size (30px for mobile, 60px for desktop)
const headerIconSize = isMobile ? 30 : 60;

// Get the current size of the first icon to calculate scaling factor
const currentIconSize = iconElements[0].getBoundingClientRect().width;

// Calculate the exact scale factor needed to transform icons to header size
const exactScale = headerIconSize / currentIconSize;

// ============================================================================
// MAIN SCROLL TRIGGER ANIMATION
// ============================================================================

// Create the main ScrollTrigger that controls the entire hero animation
ScrollTrigger.create({
  trigger: ".hero", // Trigger element
  start: "top top", // Start when top of hero reaches top of viewport
  end: `+=${window.innerHeight * 8}px`, // End after scrolling 8 viewport heights
  pin: true, // Pin the hero section in place during animation
  pinSpacing: true, // Maintain spacing for pinned element
  scrub: 1, // Smooth scrubbing effect (1 = 1 second delay)

  // Main animation update function - called on every scroll
  onUpdate: (self) => {
    const progress = self.progress; // Current scroll progress (0 to 1)

    // ============================================================================
    // PHASE 1: INITIAL ANIMATION (0% - 30% progress)
    // ============================================================================

    if (progress <= 0.3) {
      // Calculate progress within this phase (0 to 1)
      const moveProgress = progress / 0.3;

      // Calculate how much the icon container should move up
      const containerMoveY = -window.innerHeight * 0.3 * moveProgress;

      // Hide all text segments during this phase
      textSegments.forEach((segment) => {
        gsap.set(segment, { opacity: 0 });
      });

      // ============================================================================
      // SUB-PHASE 1A: HEADER FADE OUT (0% - 15% progress)
      // ============================================================================

      if (progress <= 0.15) {
        // Calculate progress within this sub-phase (0 to 1)
        const headerProgress = progress / 0.15;

        // Move header up and fade it out
        const headerMoveY = -50 * headerProgress;
        const headerOpacity = 1 - headerProgress;

        gsap.set(heroHeader, {
          transform: `translate(-50%, calc(-50% + ${headerMoveY}px))`,
          opacity: headerOpacity,
        });
      } else {
        // Keep header hidden after 15% progress
        gsap.set(heroHeader, {
          transform: `translate(-50%, calc(-50% + -50px))`,
          opacity: 0,
        });
      }

      // ============================================================================
      // SUB-PHASE 1B: ICON CONTAINER CLEANUP AND POSITIONING
      // ============================================================================

      // Remove any existing duplicate icons from previous animations
      if (window.duplicateIcons) {
        window.duplicateIcons.forEach((duplicate) => {
          if (duplicate.parentNode) {
            duplicate.parentNode.removeChild(duplicate);
          }
        });
        window.duplicateIcons = null;
      }

      // Position the icon container and make it visible
      gsap.set(animatedIcons, {
        x: 0,
        y: containerMoveY,
        scale: 1,
        opacity: 1,
      });

      // ============================================================================
      // SUB-PHASE 1C: INDIVIDUAL ICON STAGGERED ANIMATION
      // ============================================================================

      // Animate each icon with a staggered delay for smooth entrance
      iconElements.forEach((icon, index) => {
        // Create staggered timing for each icon (0.1s delay between each)
        const staggerDelay = index * 0.1;
        const iconStart = staggerDelay;
        const iconEnd = staggerDelay + 0.5;

        // Calculate progress for this specific icon
        const iconProgress = gsap.utils.mapRange(
          iconStart,
          iconEnd,
          0,
          1,
          moveProgress
        );
        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, iconProgress));

        // Calculate individual Y position for each icon
        const startOffset = -containerMoveY;
        const individualY = startOffset * (1 - clampedProgress);

        // Apply position to individual icon
        gsap.set(icon, {
          x: 0,
          y: individualY,
        });
      });
      // ============================================================================
      // PHASE 2: ICON SCALING AND CENTERING (30% - 60% progress)
      // ============================================================================
    } else if (progress <= 0.6) {
      // Calculate progress within this phase (0 to 1)
      const scaleProgress = (progress - 0.3) / 0.3;

      // Keep text segments hidden during scaling phase
      textSegments.forEach((segment) => {
        gsap.set(segment, { opacity: 0 });
      });

      // Keep header hidden
      gsap.set(heroHeader, {
        transform: "translate(-50%, calc(-50% + -50px))",
        opacity: 0,
      });

      // ============================================================================
      // SUB-PHASE 2A: BACKGROUND COLOR TRANSITION
      // ============================================================================

      // Transition background from light to dark at 50% of this phase
      if (scaleProgress >= 0.5) {
        heroSection.style.backgroundColor = "#141414"; // Dark background
      } else {
        heroSection.style.backgroundColor = "#fcf2e8"; // Light background
      }

      // ============================================================================
      // SUB-PHASE 2B: ICON CONTAINER CLEANUP
      // ============================================================================

      // Remove any existing duplicate icons
      if (window.duplicateIcons) {
        window.duplicateIcons.forEach((duplicate) => {
          if (duplicate.parentNode) {
            duplicate.parentNode.removeChild(duplicate);
          }
        });
        window.duplicateIcons = null;
      }

      // ============================================================================
      // SUB-PHASE 2C: ICON CONTAINER SCALING AND CENTERING
      // ============================================================================

      // Calculate target center position (center of viewport)
      const targetCenterY = window.innerHeight / 2;
      const targetCenterX = window.innerWidth / 2;

      // Get current container position
      const containerRect = animatedIcons.getBoundingClientRect();
      const currentCenterX = containerRect.left + containerRect.width / 2;
      const currentCenterY = containerRect.top + containerRect.height / 2;

      // Calculate how much to move to reach center
      const deltaX = (targetCenterX - currentCenterX) * scaleProgress;
      const deltaY = (targetCenterY - currentCenterY) * scaleProgress;

      // Base Y position from previous phase
      const baseY = -window.innerHeight * 0.3;

      // Calculate current scale (interpolate from 1 to exactScale)
      const currentScale = 1 + (exactScale - 1) * scaleProgress;

      // Apply scaling and centering to icon container
      gsap.set(animatedIcons, {
        x: deltaX,
        y: baseY + deltaY,
        scale: currentScale,
        opacity: 1,
      });

      // Reset individual icon positions to center of container
      iconElements.forEach((icon, index) => {
        gsap.set(icon, { x: 0, y: 0 });
      });
      // ============================================================================
      // PHASE 3: ICON MOVEMENT TO FINAL POSITIONS (60% - 75% progress)
      // ============================================================================
    } else if (progress <= 0.75) {
      // Calculate progress within this phase (0 to 1)
      const moveProgress = (progress - 0.6) / 0.15;

      // Keep text segments hidden during icon movement
      textSegments.forEach((segment) => {
        gsap.set(segment, { opacity: 0 });
      });

      // Keep header hidden
      gsap.set(heroHeader, {
        transform: `translate(-50%, calc(-50% + -50px))`,
        opacity: 0,
      });

      // Set dark background
      heroSection.style.backgroundColor = "#141414";

      // ============================================================================
      // SUB-PHASE 3A: ICON CONTAINER FINAL POSITIONING
      // ============================================================================

      // Calculate final center position
      const targetCenterY = window.innerHeight / 2;
      const targetCenterX = window.innerWidth / 2;

      // Get current container position
      const containerRect = animatedIcons.getBoundingClientRect();

      const currentCenterX = containerRect.left + containerRect.width / 2;
      const currentCenterY = containerRect.top + containerRect.height / 2;

      // Calculate final movement to center
      const deltaX = targetCenterX - currentCenterX;
      const deltaY = targetCenterY - currentCenterY;

      // Base Y position from previous phases
      const baseY = -window.innerHeight * 0.3;

      // Move container to final position and fade it out
      gsap.set(animatedIcons, {
        x: deltaX,
        y: baseY + deltaY,
        scale: exactScale,
        opacity: 0,
      });

      // Reset individual icon positions
      iconElements.forEach((icon, index) => {
        gsap.set(icon, { x: 0, y: 0 });
      });

      // ============================================================================
      // SUB-PHASE 3B: CREATE DUPLICATE ICONS FOR FINAL POSITIONS
      // ============================================================================

      // Create duplicate icons only once (they will move to text positions)
      if (!window.duplicateIcons) {
        window.duplicateIcons = [];

        // Clone each icon and position it absolutely
        iconElements.forEach((icon, index) => {
          const duplicate = icon.cloneNode(true);
          duplicate.className = "duplicate-icon";
          duplicate.style.position = "absolute";
          duplicate.style.width = headerIconSize + "px";
          duplicate.style.height = headerIconSize + "px";

          // Add to document body for absolute positioning
          document.body.appendChild(duplicate);
          window.duplicateIcons.push(duplicate);
        });
      }

      // ============================================================================
      // SUB-PHASE 3C: ANIMATE DUPLICATE ICONS TO TEXT POSITIONS
      // ============================================================================

      // Move duplicate icons to their final positions near text segments
      if (window.duplicateIcons) {
        window.duplicateIcons.forEach((duplicate, index) => {
          if (index < placeholders.length) {
            // Get starting position (current icon position)
            const iconRect = iconElements[index].getBoundingClientRect();
            const startCenterX = iconRect.left + iconRect.width / 2;
            const startCenterY = iconRect.top + iconRect.height / 2;
            const startPageX = startCenterX + window.pageXOffset;
            const startPageY = startCenterY + window.pageYOffset;

            // Get target position (placeholder position)
            const targetRect = placeholders[index].getBoundingClientRect();
            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;
            const targetPageX = targetCenterX + window.pageXOffset;
            const targetPageY = targetCenterY + window.pageYOffset;

            // Calculate total movement needed
            const moveX = targetPageX - startPageX;
            const moveY = targetPageY - startPageY;

            // Split animation into two parts: vertical then horizontal
            let currentX = 0;
            let currentY = 0;

            if (moveProgress <= 0.5) {
              // First half: move vertically
              const verticalProgress = moveProgress / 0.5;
              currentY = moveY * verticalProgress;
            } else {
              // Second half: move horizontally
              const horizontalProgress = (moveProgress - 0.5) / 0.5;
              currentY = moveY; // Keep vertical position
              currentX = moveX * horizontalProgress;
            }

            // Calculate final position
            const finalPageX = startPageX + currentX;
            const finalPageY = startPageY + currentY;

            // Apply position to duplicate icon
            duplicate.style.left = finalPageX - headerIconSize / 2 + "px";
            duplicate.style.top = finalPageY - headerIconSize / 2 + "px";
            duplicate.style.opacity = "1";
            duplicate.style.display = "flex";
          }
        });
      }
      // ============================================================================
      // PHASE 4: TEXT REVEAL ANIMATION (75% - 100% progress)
      // ============================================================================
    } else {
      // Keep header hidden and move it further up
      gsap.set(heroHeader, {
        transform: `translate(-50%, calc(-50% + -100px))`,
        opacity: 0,
      });

      // Keep dark background
      heroSection.style.backgroundColor = "#141414";

      // Hide the original animated icons container
      gsap.set(animatedIcons, { opacity: 0 });

      // ============================================================================
      // SUB-PHASE 4A: FINALIZE DUPLICATE ICON POSITIONS
      // ============================================================================

      // Ensure duplicate icons are in their final positions
      if (window.duplicateIcons) {
        window.duplicateIcons.forEach((duplicate, index) => {
          if (index < placeholders.length) {
            // Get final target position
            const targetRect = placeholders[index].getBoundingClientRect();
            const targetCenterX = targetRect.left + targetRect.width / 2;
            const targetCenterY = targetRect.top + targetRect.height / 2;

            const targetPageX = targetCenterX + window.pageXOffset;
            const targetPageY = targetCenterY + window.pageYOffset;

            // Position duplicate icon at final location
            duplicate.style.left = targetPageX - headerIconSize / 2 + "px";
            duplicate.style.top = targetPageY - headerIconSize / 2 + "px";
            duplicate.style.opacity = "1";
            duplicate.style.display = "flex";
          }
        });
      }

      // ============================================================================
      // SUB-PHASE 4B: STAGGERED TEXT SEGMENT REVEAL
      // ============================================================================

      // Animate text segments in randomized order with staggered timing
      textAnimationOrder.forEach((item, index) => {
        // Calculate timing for each text segment (0.03s delay between each)
        const segmentStart = 0.75 + index * 0.03;
        const segmentEnd = segmentStart + 0.015;

        // Calculate progress for this specific text segment
        const segmentProgress = gsap.utils.mapRange(
          segmentStart,
          segmentEnd,
          0,
          1,
          progress
        );

        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, segmentProgress));

        // Apply opacity to text segment
        gsap.set(item.segment, { opacity: clampedProgress });
      });
    }
  },
});
