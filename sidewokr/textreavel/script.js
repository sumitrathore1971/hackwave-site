// ============================================================================
// TEXT REVEAL ANIMATION SCRIPT
// ============================================================================
// This script creates a sophisticated scroll-triggered text animation that:
// 1. Dynamically splits text into individual words
// 2. Highlights keywords with colored backgrounds
// 3. Reveals words progressively as user scrolls
// 4. Uses GSAP ScrollTrigger for smooth, frame-rate independent animations
// 5. Integrates with Lenis for smooth scrolling
// ============================================================================

// ============================================================================
// IMPORTS AND SETUP
// ============================================================================

// Import GSAP (GreenSock Animation Platform) for smooth animations
import gsap from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/+esm";
// Import ScrollTrigger plugin for scroll-based animations
import { ScrollTrigger } from "https://cdn.jsdelivr.net/npm/gsap@3.12.5/ScrollTrigger/+esm";
// Import Lenis for smooth scrolling
import Lenis from "https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.35/+esm";

// ============================================================================
// MAIN EXECUTION - DOM Ready Event Listener
// ============================================================================
// Wait for DOM to be fully loaded before initializing animations
// This ensures all elements are available for manipulation
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
  // ============================================================================
  // GSAP PLUGIN REGISTRATION
  // ============================================================================
  // Register ScrollTrigger plugin with GSAP for scroll-based animations
  gsap.registerPlugin(ScrollTrigger);

  // ============================================================================
  // LENIS SMOOTH SCROLLING SETUP
  // ============================================================================
  // Initialize Lenis for smooth scrolling experience
  // This provides 60fps smooth scrolling with momentum
  const lenis = new Lenis();

  // Connect Lenis scroll events to ScrollTrigger for synchronization
  lenis.on("scroll", ScrollTrigger.update);

  // ============================================================================
  // GSAP TICKER INTEGRATION
  // ============================================================================
  // Add Lenis RAF (Request Animation Frame) to GSAP ticker
  // This ensures smooth animation timing and synchronization
  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  // Disable GSAP lag smoothing for more responsive animations
  gsap.ticker.lagSmoothing(0);

  // ============================================================================
  // DOM ELEMENT SELECTION
  // ============================================================================
  // Find all paragraph elements within anime-text containers
  // These will be processed for word-by-word animation
  const animeTextParagraphs = document.querySelectorAll(".anime-text p");

  // ============================================================================
  // ANIMATION CONFIGURATION
  // ============================================================================
  // Background color for word highlighting during reveal animation
  // Uses RGB format for rgba() color application
  const wordHighlightBgColor = "60, 60, 60";

  // ============================================================================
  // KEYWORD DEFINITIONS - Color-coded categories
  // ============================================================================
  // Keywords are categorized by color for visual hierarchy:
  // - Purple (#7a78ff): Technical/Interactive concepts
  // - Orange (#fe6d38): Creative/Expressive concepts
  // - Green (#c6fe69): Clarity/Intuitive concepts
  // These keywords will receive special highlighting in CSS
  // ============================================================================
  const keywords = [
    "vibrant", // Purple - Technical
    "living", // Orange - Creative
    "clarity", // Green - Clarity
    "expression", // Orange - Creative
    "shape", // Purple - Technical
    "intuitive", // Green - Clarity
    "storytelling", // Orange - Creative
    "interactive", // Purple - Technical
    "vision", // Green - Clarity
  ];

  // ============================================================================
  // TEXT PROCESSING - Word-by-word DOM manipulation
  // ============================================================================
  // This section processes each paragraph and:
  // 1. Splits text into individual words
  // 2. Creates DOM elements for each word
  // 3. Applies keyword highlighting classes
  // 4. Replaces original text with structured word elements
  // ============================================================================
  animeTextParagraphs.forEach((paragraph) => {
    // Get the original text content from the paragraph
    const text = paragraph.textContent;

    // Split text into individual words using whitespace as delimiter
    const words = text.split(/\s+/);

    // Clear the paragraph content to prepare for word-by-word structure
    paragraph.innerHTML = "";

    // ============================================================================
    // WORD ELEMENT CREATION - Individual word processing
    // ============================================================================
    // For each word, create a structured DOM element that can be animated
    // ============================================================================
    words.forEach((word) => {
      // Only process non-empty words (skip extra whitespace)
      if (word.trim()) {
        // ============================================================================
        // WORD CONTAINER - Main wrapper element
        // ============================================================================
        // Create a div container for each word that will handle:
        // - Opacity animations
        // - Background color transitions
        // - Positioning and spacing
        // ============================================================================
        const wordContainer = document.createElement("div");
        wordContainer.className = "word";

        // ============================================================================
        // WORD TEXT ELEMENT - Actual text content
        // ============================================================================
        // Create a span element for the actual text that will handle:
        // - Text opacity animations
        // - Keyword styling
        // - Color transitions
        // ============================================================================
        const wordText = document.createElement("span");
        wordText.textContent = word;

        // ============================================================================
        // KEYWORD DETECTION - Special highlighting logic
        // ============================================================================
        // Normalize word (remove punctuation) for keyword matching
        // This ensures "vibrant," matches "vibrant" in the keywords array
        // ============================================================================
        const normalizedWord = word.toLowerCase().replace(/[.,!?;:]/g, "");

        // Check if this word is a keyword that needs special highlighting
        if (keywords.includes(normalizedWord)) {
          // Add keyword wrapper class for special styling
          wordContainer.classList.add("keyword-wrapper");
          // Add keyword class and the specific keyword name for CSS targeting
          wordText.classList.add("keyword", normalizedWord);
        }

        // ============================================================================
        // DOM ASSEMBLY - Build the word structure
        // ============================================================================
        // Assemble the word elements and add to the paragraph
        // Structure: <div class="word"> <span>text</span> </div>
        // ============================================================================
        wordContainer.appendChild(wordText);
        paragraph.appendChild(wordContainer);
      }
    });
  });

  // ============================================================================
  // SCROLL TRIGGER SETUP - Animation orchestration
  // ============================================================================
  // Find all text containers that need animation
  // These are the sections that will be pinned and animated during scroll
  // ============================================================================
  const animeTextContainers = document.querySelectorAll(
    ".anime-text-container"
  );

  // ============================================================================
  // ANIMATION LOOP - Create ScrollTrigger for each container
  // ============================================================================
  // For each text container, create a ScrollTrigger that handles:
  // - Section pinning during animation
  // - Progress tracking (0-1)
  // - Word-by-word reveal timing
  // - Background color transitions
  // ============================================================================
  animeTextContainers.forEach((container) => {
    // ============================================================================
    // SCROLL TRIGGER CONFIGURATION
    // ============================================================================
    // Create a ScrollTrigger instance with specific settings for:
    // - Trigger element (the container itself)
    // - Pinning behavior (keeps section in view during animation)
    // - Start/end positions (when animation begins/ends)
    // - Update function (called on every scroll frame)
    // ============================================================================
    ScrollTrigger.create({
      trigger: container, // Element that triggers the animation
      pin: container, // Pin the section in place during animation
      start: "top top", // Start when section top reaches viewport top
      end: `+=${window.innerHeight * 4}`, // End after 4 viewport heights of scrolling
      pinSpacing: true, // Maintain spacing for pinned element

      // ============================================================================
      // ANIMATION UPDATE FUNCTION - Called on every scroll frame
      // ============================================================================
      // This function is the heart of the animation system:
      // - Calculates current scroll progress (0-1)
      // - Animates each word individually based on progress
      // - Controls reveal timing and visual effects
      // - Handles both reveal and fade-out phases
      // ============================================================================
      onUpdate: (self) => {
        // Current scroll progress (0 = start, 1 = end)
        const progress = self.progress;

        // Get all word elements in this container for animation
        const words = Array.from(
          container.querySelectorAll(".anime-text .word")
        );
        const totalWords = words.length;

        // ============================================================================
        // WORD-BY-WORD ANIMATION - Individual word processing
        // ============================================================================
        // Each word is animated individually with:
        // - Staggered timing for smooth reveal
        // - Background color transitions
        // - Opacity changes for text visibility
        // ============================================================================
        words.forEach((word, index) => {
          // Get the text span element for opacity control
          const wordText = word.querySelector("span");

          // ============================================================================
          // PHASE 1: WORD REVEAL (0% - 70% progress)
          // ============================================================================
          // This phase handles the progressive reveal of words:
          // - Words fade in one by one with overlap
          // - Background colors appear and fade
          // - Text becomes visible after background
          // ============================================================================
          if (progress <= 0.7) {
            // Target progress for this phase (70% of total animation)
            const progressTarget = 0.7;
            // Normalize progress within this phase (0-1)
            const revealProgress = Math.min(1, progress / progressTarget);

            // ============================================================================
            // TIMING CALCULATIONS - Staggered word reveal
            // ============================================================================
            // Number of words that overlap during animation (creates smooth flow)
            const overlapWords = 15;
            // Total animation length including overlaps
            const totalAnimationLength = 1 + overlapWords / totalWords;

            // Calculate start and end positions for this word
            const wordStart = index / totalWords;
            const wordEnd = wordStart + overlapWords / totalWords;

            // Scale the timeline to fit all words within the animation window
            const timelineScale =
              1 /
              Math.min(
                totalAnimationLength,
                1 + (totalWords - 1) / totalWords + overlapWords / totalWords
              );

            // Adjust start and end times for this specific word
            const adjustedStart = wordStart * timelineScale;
            const adjustedEnd = wordEnd * timelineScale;
            const duration = adjustedEnd - adjustedStart;

            // Calculate progress for this specific word (0-1)
            const wordProgress =
              revealProgress <= adjustedStart
                ? 0
                : revealProgress >= adjustedEnd
                ? 1
                : (revealProgress - adjustedStart) / duration;

            // ============================================================================
            // VISUAL EFFECTS - Opacity and background animations
            // ============================================================================
            // Apply calculated progress to visual properties:
            // - Word container opacity (fade in)
            // - Background color (appears then fades)
            // - Text opacity (becomes visible after background)
            // ============================================================================

            // Set word container opacity (0 = invisible, 1 = fully visible)
            word.style.opacity = wordProgress;

            // ============================================================================
            // BACKGROUND COLOR ANIMATION - Highlight effect
            // ============================================================================
            // Background appears at 90% of word progress, then fades out
            // Creates a highlight effect that draws attention to each word
            // ============================================================================
            const backgroundFadeStart =
              wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
            const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
            word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;

            // ============================================================================
            // TEXT REVEAL ANIMATION - Text visibility
            // ============================================================================
            // Text becomes visible after background appears (90% threshold)
            // Uses power function for smoother visual transition
            // ============================================================================
            const textRevealThreshold = 0.9;
            const textRevealProgress =
              wordProgress >= textRevealThreshold
                ? (wordProgress - textRevealThreshold) /
                  (1 - textRevealThreshold)
                : 0;
            wordText.style.opacity = Math.pow(textRevealProgress, 0.5);
            // ============================================================================
            // PHASE 2: WORD FADE OUT (70% - 100% progress)
            // ============================================================================
            // This phase handles the reverse animation:
            // - Words fade out in reverse order
            // - Background colors reappear during fade out
            // - Creates a smooth transition to the next section
            // ============================================================================
          } else {
            // Calculate progress within the fade-out phase (0-1)
            const reverseProgress = (progress - 0.7) / 0.3;
            // Keep word container fully visible during fade out
            word.style.opacity = 1;
            const targetTextOpacity = 1;

            // ============================================================================
            // REVERSE TIMING CALCULATIONS - Fade out sequence
            // ============================================================================
            // Fewer overlap words for faster fade out
            const reverseOverlapWords = 5;
            // Calculate reverse start and end positions
            const reverseWordStart = index / totalWords;
            const reverseWordEnd =
              reverseWordStart + reverseOverlapWords / totalWords;

            // Scale timeline for reverse animation
            const reverseTimelineScale =
              1 /
              Math.max(
                1,
                (totalWords - 1) / totalWords + reverseOverlapWords / totalWords
              );
            // Adjust timing for reverse animation
            const reverseAdjustedStart =
              reverseWordStart * reverseTimelineScale;
            const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
            const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;

            // Calculate reverse progress for this word
            const reverseWordProgress =
              reverseProgress <= reverseAdjustedStart
                ? 0
                : reverseProgress >= reverseAdjustedEnd
                ? 1
                : (reverseProgress - reverseAdjustedStart) / reverseDuration;

            // ============================================================================
            // REVERSE VISUAL EFFECTS - Fade out animations
            // ============================================================================
            // Apply reverse progress to visual properties:
            // - Text fades out (opacity decreases)
            // - Background color reappears during fade out
            // - Creates highlight effect as text disappears
            // ============================================================================
            if (reverseWordProgress > 0) {
              // Fade out text (opacity decreases as reverse progress increases)
              wordText.style.opacity =
                targetTextOpacity * (1 - reverseWordProgress);
              // Background color intensity increases during fade out
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
            } else {
              // Keep text fully visible and background transparent
              wordText.style.opacity = targetTextOpacity;
              word.style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
            }
          }
        });
      },
    });
  });
});

// ============================================================================
// SCRIPT COMPLETION
// ============================================================================
// The script has now:
// 1. Set up smooth scrolling with Lenis
// 2. Processed all text for word-by-word animation
// 3. Created ScrollTrigger instances for each text container
// 4. Established animation logic for reveal and fade-out phases
// 5. Connected all systems for seamless scroll-based text animation
// ============================================================================
