"use client";
import { useRef } from "react";

interface CardProps {
  title: string;
  copy: string;
  index: number;
}

const Card = ({ title, copy, index }: CardProps) => {
  return (
    <div
      className="card relative h-[300px] text-[#141414]"
      id={`card-${index + 1}`}
    >
      <div className="info-card-inner relative will-change-transform w-full h-full p-[2em] flex gap-[4em]">
        <div className="card-content flex-[3]">
          <h1 className="text-[4rem] font-semibold leading-none mb-[2.5em] md:mb-[4rem]">
            {title}
          </h1>
          <p className="text-[1.25rem] font-medium">{copy}</p>
        </div>
        <div className="card-img flex-[1] aspect-[16/9] rounded-[0.75em] overflow-hidden hidden lg:block">
          <img
            className="w-full h-full object-cover"
            src={`/loader-imgs/${index + 1}.webp`}
            alt={`card-${index + 1}`}
          />
        </div>
      </div>
    </div>
  );
};

export default function InfoCard() {
  const cards = [
    {
      title: "Brand Foundation",
      copy: "The heart of your company's story. It shapes your vision, values, and voice, ensuring a clear and powerful impact in every interaction.",
    },
    {
      title: "Design Identity",
      copy: "Your brand's visual fingerprint. It crafts a distinctive look that sparks recognition and builds emotional connections with your audience.",
    },
    {
      title: "Digital Presence",
      copy: "Our web solutions combine cutting-edge design and seamless functionality to create experiences that captivate and inspire your audience.",
    },
    {
      title: "Growth Strategy",
      copy: "We help you scale with data-driven insights, innovative campaigns, and a roadmap tailored to your brand's ambitions.",
    },
  ];

  return (
    <div className="bg-[#141414] text-[#fcf2e8]">
      {/* ============================================================================
          HERO SECTION - Green background with main heading
          ============================================================================ */}
      {/* <div className="relative w-screen h-screen p-3 sm:p-4 md:p-6 lg:p-8 overflow-hidden">
        <div className="w-full h-full flex justify-center items-center text-center rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl bg-[#c6fe69] p-4 sm:p-6 md:p-8">
          <h1 className="w-full max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] text-[#141414] text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-black leading-relaxed sm:leading-tight md:leading-tight lg:leading-tight px-2 sm:px-4">
            Playground for bold ideas and creative interfaces.
          </h1>
        </div>
      </div> */}

      {/* ============================================================================
          INTRO SECTION - Static intro text
          ============================================================================ */}
      <div className="info-card-starting relative w-screen h-screen p-[2em] flex items-center">
        <h1 className="font-semibold leading-none text-[2rem] md:text-3xl lg:text-5xl mb-[2.5em] md:mb-[4rem]">
          Creating standout brands for startups that bring joy and leave lasting
          impressions.
        </h1>
      </div>

      {/* ============================================================================
          CARDS SECTION - Static cards layout
          ============================================================================ */}
      <div className="cards flex flex-col">
        {cards.map((card, index) => (
          <Card key={index} {...card} index={index} />
        ))}
      </div>

      {/* ============================================================================
          OUTRO SECTION - Static outro text
          ============================================================================ */}
      <div className="info-card-ending relative w-screen h-screen p-[2em] flex items-center">
        <h1 className="font-semibold leading-none text-[2rem] md:text-3xl lg:text-5xl mb-[2.5em] md:mb-[4rem]">
          Let's build a brand that leaves a mark.
        </h1>
      </div>
    </div>
  );
}
