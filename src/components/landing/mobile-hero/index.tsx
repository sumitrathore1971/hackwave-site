import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import TextReveal from "@/components/landing/about";

const MobileHero = () => {
  const heroRef = useRef(null); // Main hero section container
  const heroHeaderRef = useRef(null); // Header with logo and tagline
  const textSegmentRefs = useRef<(HTMLSpanElement | null)[]>([]); // Array of text segment elements
  const placeholderRefs = useRef<(HTMLDivElement | null)[]>([]); // Array of placeholder elements

  // Icon size for placeholders (fixed 35px)
  const iconSize = 35;

  // Color blocks configuration for scroll reveal (same as desktop hero)
  const rainbowBlocks = [
    { color: "#c5efff", radius: "3rem 3rem 0 0" }, // Light Blue
    { color: "#ddd1ff", radius: "3rem 3rem 0 0" }, // Light Purple
    { color: "#ffc5dd", radius: "3rem 3rem 0 0" }, // Light Pink
    { color: "#d1ecff", radius: "3rem 3rem 0 0" }, // Sky Blue
    { color: "#faffa5", radius: "3rem 3rem 0 0" }, // Light Yellow
  ];
  const blocksRef = useRef<HTMLDivElement[]>([]);

  useGSAP(() => {
    if (!heroRef.current || !heroHeaderRef.current) return;

    // Pin the section and change background color on scroll
    ScrollTrigger.create({
      trigger: heroRef.current,
      start: "top top",
      end: `+=${window.innerHeight * 3}px`,
      pin: true,
      pinSpacing: true,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        // 1. Background color transition (0 - 0.4)
        if (heroRef.current) {
          const bgProgress = Math.min(progress / 0.4, 1);
          (heroRef.current as HTMLElement).style.backgroundColor =
            bgProgress < 1 ? "#fcf2e8" : "#141414";
          if (bgProgress < 1) {
            // Optionally interpolate color for a smooth transition
            // (simple step for now)
          }
        }
        // 2. Hero header fade out and move up in first 20% of scroll
        if (heroHeaderRef.current) {
          if (progress <= 0.2) {
            const fade = 1 - progress / 0.2;
            const moveY = -50 * (progress / 0.2); // move up to -50px
            gsap.set(heroHeaderRef.current, {
              opacity: fade,
              transform: `translate(-50%, calc(-50% + ${moveY}px))`,
            });
          } else {
            gsap.set(heroHeaderRef.current, {
              opacity: 0,
              transform: `translate(-50%, calc(-50% + -50px))`,
            });
          }
        }
        // 3. Fade in text segments and icons only after bg color is dark (progress > 0.4)
        if (progress > 0.4) {
          const fadeStart = 0.4;
          const fadeEnd = 0.8;
          textSegmentRefs.current.forEach((segment, idx) => {
            if (!segment) return;
            const segmentStart =
              fadeStart +
              idx * ((fadeEnd - fadeStart) / textSegmentRefs.current.length);
            const segmentEnd =
              segmentStart +
              (fadeEnd - fadeStart) / textSegmentRefs.current.length;
            const segProgress = gsap.utils.mapRange(
              segmentStart,
              segmentEnd,
              0,
              1,
              progress
            );
            const clamped = Math.max(0, Math.min(1, segProgress));
            gsap.set(segment, { opacity: clamped });
          });
          // Icons: match opacity to corresponding text segment
          placeholderRefs.current.forEach((placeholder, idx) => {
            if (!placeholder) return;
            const img = placeholder.querySelector("img");
            if (!img) return;
            const textSegment = textSegmentRefs.current[idx + 1];
            if (!textSegment) return;
            const opacity = window.getComputedStyle(textSegment).opacity;
            img.style.opacity = opacity;
          });
        } else {
          // Hide text and icons before fade-in phase
          textSegmentRefs.current.forEach((segment) => {
            if (segment) gsap.set(segment, { opacity: 0 });
          });
          placeholderRefs.current.forEach((placeholder) => {
            if (!placeholder) return;
            const img = placeholder.querySelector("img");
            if (img) img.style.opacity = "0";
          });
        }
        // 4. Animate color blocks after text is revealed (last 10% of scroll)
        if (progress > 0.9) {
          const colorBlockProgress = (progress - 0.9) / 0.1;
          const clampedColorProgress = Math.max(
            0,
            Math.min(1, colorBlockProgress)
          );
          blocksRef.current.forEach((block, i) => {
            if (!block) return;
            // Staggered Y movement
            const blockStart = i * 0.1;
            const blockEnd = blockStart + 0.6;
            const blockProgress = gsap.utils.mapRange(
              blockStart,
              blockEnd,
              0,
              1,
              clampedColorProgress
            );
            const clampedProgress = Math.max(0, Math.min(1, blockProgress));
            const startY = window.innerHeight * 1.5;
            const endY = -window.innerHeight * 0.5;
            const currentY = startY + (endY - startY) * clampedProgress;
            // Opacity: 0 until color block animation starts, then 1
            const opacity = clampedColorProgress > 0 ? 1 : 0;
            gsap.set(block, {
              y: currentY,
              opacity,
            });
          });
        } else {
          // Keep color blocks hidden during text animation
          blocksRef.current.forEach((block) => {
            if (block) gsap.set(block, { opacity: 0 });
          });
        }
      },
    });
  });

  return (
    <>
      <section
        ref={heroRef}
        className="hero host-grotesk relative w-screen min-h-screen p-6 flex items-center justify-center text-[#141414] overflow-hidden"
      >
        {/* HERO HEADER - Logo and Tagline */}
        <div
          ref={heroHeaderRef}
          className="hero-header absolute left-1/2 top-1/2 flex items-center justify-center w-full mt-20"
          style={{ transform: "translate(-50%, -30%)" }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-8xl px-4 md:px-8 gap-8 md:gap-0">
            {/* Center - Logo and Tagline */}
            <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-8xl px-4 md:px-8 gap-8 md:gap-0">
              {/* Center - Logo and Tagline */}
              <div className="flex flex-col items-center justify-center gap-4 md:gap-8 order-1 md:order-2">
                <img
                  className="hackwave-img w-48 md:w-auto"
                  src="/loader-imgs/hackwave.svg"
                  alt="Hackwave Logo"
                />
                <p className="text-xl md:text-3xl font-normal text-center">
                  where the boldest builders come to play
                </p>
                <img
                  className="hackwave-img w-48 md:w-auto"
                  src="/assets/bella-kawaii-edition.png"
                  alt="Hackwave Logo"
                />
              </div>
              <div className="flex items-center w-full justify-between gap-4 md:gap-8 order-1 md:order-2 ">
                {/* Left - Dates */}
                <div className="flex flex-col items-start text-left mt-8 md:mt-46 order-2 md:order-1">
                  <p className="text-lg md:text-2xl font-normal">
                    36 Hours Hackathon
                  </p>
                  <p className="text-base md:text-xl font-normal text-gray-600">
                    from
                  </p>
                  <p className="text-2xl md:text-3xl font-bold">
                    March 15-17, 2025
                  </p>
                </div>
                {/* Right - Info */}
                <div className="flex flex-col items-end text-right mt-8 md:mt-46 order-3 md:order-3">
                  <p className="text-lg md:text-2xl font-normal">Join 500+</p>
                  <p className="text-base md:text-xl font-normal text-gray-600">
                    developers
                  </p>
                  <p className="text-2xl md:text-3xl font-bold">$50K+ Prizes</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* ANIMATED TEXT CONTAINER - Static for mobile */}
        <h1 className="hero-heading animated-text leading-none text-center text-2xl md:text-4xl lg:text-6xl">
          <div
            className="placeholder-icon"
            style={{
              visibility: "visible",
              position: "relative",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            ref={(el) => {
              placeholderRefs.current[0] = el;
            }}
          >
            <img
              src="/icons/icon_1.png"
              alt="Icon 1"
              style={{
                width: iconSize + "px",
                height: iconSize + "px",
                display: "inline-block",
                objectFit: "cover",
                verticalAlign: "middle",
              }}
            />
          </div>
          <span
            className="text-segment text-3xl md:text-4xl lg:text-6xl text-center"
            ref={(el) => {
              textSegmentRefs.current[0] = el;
            }}
          >
            Innovate with purpose.
          </span>
          <div
            className="placeholder-icon"
            style={{
              visibility: "visible",
              position: "relative",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            ref={(el) => {
              placeholderRefs.current[1] = el;
            }}
          >
            <img
              src="/icons/icon_2.png"
              alt="Icon 2"
              style={{
                width: iconSize + "px",
                height: iconSize + "px",
                display: "inline-block",
                objectFit: "cover",
                verticalAlign: "middle",
              }}
            />
          </div>
          <span
            className="text-segment text-3xl md:text-4xl lg:text-6xl text-center"
            ref={(el) => {
              textSegmentRefs.current[1] = el;
            }}
          >
            Design. Build. Disrupt.{" "}
          </span>
          <span
            className="text-segment text-3xl md:text-4xl lg:text-6xl text-center"
            ref={(el) => {
              textSegmentRefs.current[2] = el;
            }}
          >
            Code with your crew.
          </span>
          <div
            className="placeholder-icon"
            style={{
              visibility: "visible",
              position: "relative",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            ref={(el) => {
              placeholderRefs.current[2] = el;
            }}
          >
            <img
              src="/icons/icon_3.png"
              alt="Icon 3"
              style={{
                width: iconSize + "px",
                height: iconSize + "px",
                display: "inline-block",
                objectFit: "cover",
                verticalAlign: "middle",
              }}
            />
          </div>
          <span
            className="text-segment text-3xl md:text-4xl lg:text-6xl text-center"
            ref={(el) => {
              textSegmentRefs.current[3] = el;
            }}
          >
            Solve real problems.
          </span>
          <div
            className="placeholder-icon"
            style={{
              visibility: "visible",
              position: "relative",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            ref={(el) => {
              placeholderRefs.current[3] = el;
            }}
          >
            <img
              src="/icons/icon_4.png"
              alt="Icon 4"
              style={{
                width: iconSize + "px",
                height: iconSize + "px",
                display: "inline-block",
                objectFit: "cover",
                verticalAlign: "middle",
              }}
            />
          </div>
          <span
            className="text-segment text-3xl md:text-4xl lg:text-6xl text-center"
            ref={(el) => {
              textSegmentRefs.current[4] = el;
            }}
          >
            Join the wave that moves tech forward.
          </span>
          <div
            className="placeholder-icon"
            style={{
              visibility: "visible",
              position: "relative",
              display: "inline-block",
              verticalAlign: "middle",
            }}
            ref={(el) => {
              placeholderRefs.current[4] = el;
            }}
          >
            <img
              src="/icons/icon_5.png"
              alt="Icon 5"
              style={{
                width: iconSize + "px",
                height: iconSize + "px",
                display: "inline-block",
                objectFit: "cover",
                verticalAlign: "middle",
              }}
            />
          </div>
          <span
            className="text-segment text-3xl md:text-4xl lg:text-6xl text-center"
            ref={(el) => {
              textSegmentRefs.current[5] = el;
            }}
          >
            This is Hack<span className="text-pink-300">wave.</span>
          </span>
        </h1>
        {/* COLOR BLOCKS - Animated color blocks that reveal after text animation */}
        <div
          className="absolute top-0 left-0 w-full h-full z-50 flex"
          style={{ willChange: "transform" }}
        >
          {rainbowBlocks.map(({ color, radius }, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) blocksRef.current[i] = el;
              }}
              className="flex-1 z-50 h-[150vh] border-2 border-black"
              aria-hidden="true"
              style={{
                backgroundColor: color,
                borderTopLeftRadius: radius.split(" ")[0],
                borderTopRightRadius: radius.split(" ")[1],
                opacity: 0, // initial opacity
                transition: "opacity 0.3s cubic-bezier(.7,.2,.3,1)",
                willChange: "transform, opacity",
              }}
            />
          ))}
        </div>
      </section>
      <TextReveal />
    </>
  );
};

export default MobileHero;
