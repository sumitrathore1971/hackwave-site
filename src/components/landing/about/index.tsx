"use client";

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const TextReveal: React.FC = () => {
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const aboutRef = useRef<HTMLDivElement | null>(null);
  const animeTextContainersRef = useRef<NodeListOf<Element> | null>(null);

  useEffect(() => {
    // Cache DOM elements after mount
    ctaRef.current = document.querySelector(".cta");
    aboutRef.current = document.querySelector(".about");
    animeTextContainersRef.current = document.querySelectorAll(
      ".anime-text-container"
    );

    // Only run if DOM is ready and containers exist
    if (
      !animeTextContainersRef.current ||
      animeTextContainersRef.current.length === 0
    )
      return;

    // TEXT PROCESSING: Split text into word elements and highlight keywords
    const animeTextParagraphs = document.querySelectorAll(".anime-text p");
    const keywords = [
      "collaborative",
      "builders",
      "innovators",
      "breakthrough",
      "solutions",
      "leaders",
    ];
    animeTextParagraphs.forEach((paragraph) => {
      const text = paragraph.textContent || "";
      const words = text.split(/\s+/);
      paragraph.innerHTML = "";
      words.forEach((word) => {
        if (word.trim()) {
          const wordContainer = document.createElement("div");
          wordContainer.className = "word";
          const wordText = document.createElement("span");
          wordText.textContent = word;
          const normalizedWord = word.toLowerCase().replace(/[.,!?;:]/g, "");
          if (keywords.includes(normalizedWord)) {
            wordContainer.classList.add("keyword-wrapper");
            wordText.classList.add("keyword", normalizedWord);
          }
          wordContainer.appendChild(wordText);
          paragraph.appendChild(wordContainer);
        }
      });
    });

    // ANIMATION CONFIGURATION
    const wordHighlightBgColor = "60, 60, 60";
    if (ctaRef.current) {
      gsap.set(ctaRef.current, { y: "100%" });
    }

    // SCROLL TRIGGER SETUP
    animeTextContainersRef.current.forEach((container, index) => {
      const isMobile = window.innerWidth < 768;
      const scrollMultiplier = isMobile ? 2 : 4;
      ScrollTrigger.create({
        trigger: container,
        pin: container,
        start: "top top",
        end: `+=${window.innerHeight * scrollMultiplier}`,
        pinSpacing: true,
        markers: false,
        onUpdate: (self) => {
          const progress = self.progress;
          const words = Array.from(
            container.querySelectorAll(".anime-text .word")
          );
          const totalWords = words.length;
          const cta = ctaRef.current;

          // CTA below viewport during text reveal phase
          if (progress <= 0.7 && cta) {
            gsap.set(cta, { y: "100%" });
          }

          // WORD REVEAL ANIMATION (0% - 70%)
          if (progress <= 0.7) {
            const progressTarget = 0.7;
            const revealProgress = Math.min(1, progress / progressTarget);
            const overlapWords = isMobile ? 8 : 15;
            const totalAnimationLength = 1 + overlapWords / totalWords;
            words.forEach((word, index) => {
              const wordText = word.querySelector("span") as HTMLElement | null;
              const wordStart = index / totalWords;
              const wordEnd = wordStart + overlapWords / totalWords;
              const timelineScale =
                1 /
                Math.min(
                  totalAnimationLength,
                  1 + (totalWords - 1) / totalWords + overlapWords / totalWords
                );
              const adjustedStart = wordStart * timelineScale;
              const adjustedEnd = wordEnd * timelineScale;
              const duration = adjustedEnd - adjustedStart;
              const wordProgress =
                revealProgress <= adjustedStart
                  ? 0
                  : revealProgress >= adjustedEnd
                  ? 1
                  : (revealProgress - adjustedStart) / duration;
              (word as HTMLElement).style.opacity = wordProgress.toString();
              const backgroundFadeStart =
                wordProgress >= 0.9 ? (wordProgress - 0.9) / 0.1 : 0;
              const backgroundOpacity = Math.max(0, 1 - backgroundFadeStart);
              (
                word as HTMLElement
              ).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${backgroundOpacity})`;
              if (wordText) {
                const textRevealThreshold = 0.9;
                const textRevealProgress =
                  wordProgress >= textRevealThreshold
                    ? (wordProgress - textRevealThreshold) /
                      (1 - textRevealThreshold)
                    : 0;
                wordText.style.opacity = Math.pow(
                  textRevealProgress,
                  0.5
                ).toString();
              }
            });
          } else {
            // REVERSE ANIMATION (70% - 100%)
            const reverseProgress = (progress - 0.7) / 0.3;
            const reverseOverlapWords = isMobile ? 3 : 5;
            words.forEach((word, index) => {
              const wordText = word.querySelector("span") as HTMLElement | null;
              (word as HTMLElement).style.opacity = "1";
              const targetTextOpacity = 1;
              const reverseWordStart = index / totalWords;
              const reverseWordEnd =
                reverseWordStart + reverseOverlapWords / totalWords;
              const reverseTimelineScale =
                1 /
                Math.max(
                  1,
                  (totalWords - 1) / totalWords +
                    reverseOverlapWords / totalWords
                );
              const reverseAdjustedStart =
                reverseWordStart * reverseTimelineScale;
              const reverseAdjustedEnd = reverseWordEnd * reverseTimelineScale;
              const reverseDuration = reverseAdjustedEnd - reverseAdjustedStart;
              const reverseWordProgress =
                reverseProgress <= reverseAdjustedStart
                  ? 0
                  : reverseProgress >= reverseAdjustedEnd
                  ? 1
                  : (reverseProgress - reverseAdjustedStart) / reverseDuration;
              if (wordText) {
                if (reverseWordProgress > 0) {
                  wordText.style.opacity = (
                    targetTextOpacity *
                    (1 - reverseWordProgress)
                  ).toString();
                  (
                    word as HTMLElement
                  ).style.backgroundColor = `rgba(${wordHighlightBgColor}, ${reverseWordProgress})`;
                } else {
                  wordText.style.opacity = targetTextOpacity.toString();
                  (
                    word as HTMLElement
                  ).style.backgroundColor = `rgba(${wordHighlightBgColor}, 0)`;
                }
              }
            });
            // CTA MOVEMENT - Move CTA div from below to center
            const cta = ctaRef.current;
            if (cta) {
              const startY = 100;
              const endY = 0;
              const currentY = startY + (endY - startY) * reverseProgress;
              gsap.set(cta, { y: `${currentY}%` });
            }
          }
        },
      });
    });

    // Cleanup: kill all ScrollTriggers
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={aboutRef}
        className="about anime-text-container bg-[#141414] text-black relative w-full h-full min-h-screen p-3 sm:p-4 md:p-6 lg:p-8 overflow-x-hidden"
      >
        <div className="w-full h-full flex flex-col justify-center items-center text-center rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border border-dashed border-[rgb(60,60,60)] p-4 sm:p-6 md:p-8">
          <h1 className="text-white mb-6 sm:mb-8 md:mb-12 lg:mb-16 font-black leading-tight px-2 text-[clamp(1.5rem,2vw,1.6rem)] sm:text-[clamp(1.2rem,2.5vw,1.8rem)] md:text-[clamp(1.3rem,2.7vw,2rem)]">
            About{" "}
            <span className="inline-block px-2 sm:px-3 md:px-4 lg:px-6 bg-pink-300 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 sm:border-3 md:border-4 lg:border-6">
              Hackwave
            </span>
          </h1>
          <div className="text-white anime-text w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] space-y-4 sm:space-y-6 md:space-y-8 text-[clamp(0.65rem,1.5vw,1rem)] sm:text-[clamp(0.9rem,1.7vw,1.1rem)] md:text-[clamp(1.5rem,1.8vw,1.15rem)]">
            <p className="text-center font-black leading-relaxed px-2 sm:px-4">
              Hackwave brings together the boldest builders, creators, and
              innovators in one electrifying space. Design cutting-edge
              solutions, build revolutionary prototypes, and explore the future
              of technology. All while pushing the boundaries of what's
              possible.
            </p>
            <p className="text-center font-black leading-relaxed px-2 sm:px-4">
              With a focus on real-world impact, collaborative problem-solving,
              and breakthrough innovation, Hackwave lets you turn bold ideas
              into living solutions that change the world. It's where the next
              generation of tech leaders come to make their mark.
            </p>
          </div>
        </div>
        <div
          ref={ctaRef}
          className="absolute cta inset-0 w-full h-full overflow-hidden flex items-center justify-center"
        >
          <div className="w-full h-full mx-auto flex flex-col justify-center items-center text-center rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-xl bg-[#c6fe69] p-4 sm:p-6 md:p-8">
            <h1 className="w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[80vw] lg:max-w-[70vw] xl:max-w-[60vw] text-[#141414] font-black leading-relaxed px-2 sm:px-4 mb-8 sm:mb-12 md:mb-16 lg:mb-20 text-[clamp(2rem,3vw,3rem)] sm:text-[clamp(1.1rem,2.2vw,1.5rem)] md:text-[clamp(2rem,3.5vw,5rem)]">
              Playground for bold ideas and creative interfaces.
            </h1>
            <div className="w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 text-[clamp(1.8rem,2vw,4.1rem)] sm:text-[clamp(1rem,1.8vw,1.3rem)] md:text-[clamp(1rem,2vw,4rem)] text-[#141414]">
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">200+</h2>
                <p className="font-medium">Participants</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">48</h2>
                <p className="font-medium">Hours</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">100+</h2>
                <p className="font-medium">Projects</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">30+</h2>
                <p className="font-medium">Colleges</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">1M+</h2>
                <p className="font-medium">Social Impressions</p>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-black mb-2">24/7</h2>
                <p className="font-medium">Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TextReveal;
