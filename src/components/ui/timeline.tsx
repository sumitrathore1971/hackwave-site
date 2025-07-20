"use client";
import {
  useMotionValueEvent,
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import VariableProximity from "@/components/ui/VariableProximity";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        setHeight(rect.height);
      }
    };

    updateHeight();
    window.addEventListener("resize", updateHeight);

    // Delay height calculation to ensure DOM is fully rendered
    const timer = setTimeout(updateHeight, 100);

    return () => {
      window.removeEventListener("resize", updateHeight);
      clearTimeout(timer);
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 90%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // This ensures smooth updates of the timeline line
  });

  return (
    <div className="w-full bg-[#141414] font-sans" ref={containerRef}>
      {/* Hero Section with Large Centered Heading */}
      <div className="min-h-screen flex flex-col items-center justify-center px-6">
        <div className="text-center max-w-6xl mx-auto">
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white leading-tight">
            <VariableProximity
              label="Hackwave Timeline"
              fromFontVariationSettings="wght 200"
              toFontVariationSettings="wght 900"
              radius={400}
              containerRef={containerRef}
            />
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mt-8 leading-relaxed">
            Follow our journey from registration to the ultimate hackathon
            experience.
          </p>
        </div>
      </div>

      {/* Timeline Content */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10">
        <div ref={ref} className="relative pb-20">
          {data.map((item, index) => (
            <motion.div
              key={index}
              className="flex justify-start pt-10 md:pt-40 md:gap-10"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{
                opacity: 1,
                y: 0,
                transition: {
                  duration: 0.8,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: index * 0.1,
                },
              }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
                <motion.div
                  className="h-10 absolute left-[17.5px] md:left-[17.5px] w-10 rounded-full bg-white flex items-center justify-center border-2 border-[#ff6ec7]"
                  initial={{ scale: 0 }}
                  whileInView={{
                    scale: 1,
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      delay: index * 0.1 + 0.2,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  <div className="h-4 w-4 rounded-full bg-[#ff6ec7] dark:bg-[#ff6ec7]" />
                </motion.div>
                <motion.h3
                  className="hidden md:block text-xl md:pl-20 md:text-5xl font-black text-white"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut",
                      delay: index * 0.1 + 0.3,
                    },
                  }}
                  viewport={{ once: true }}
                >
                  {item.title}
                </motion.h3>
              </div>

              <motion.div
                className="relative pl-20 pr-4 md:pl-4 w-full"
                initial={{ opacity: 0, x: 30 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.7,
                    ease: "easeOut",
                    delay: index * 0.1 + 0.4,
                  },
                }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <h3 className="md:hidden block text-2xl mb-4 text-left font-black text-white">
                  {item.title}
                </h3>
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-[#141414]/10">
                  {item.content}
                </div>
              </motion.div>
            </motion.div>
          ))}
          <div
            style={{
              height: height + "px",
            }}
            className="absolute left-[37.5px] md:left-[37.5px] top-0 overflow-hidden w-[3px] bg-[#333]"
          >
            <motion.div
              style={{
                height: heightTransform,
                opacity: opacityTransform,
              }}
              className="absolute inset-x-0 top-0 w-[3px] bg-[#ff6ec7] rounded-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
