import Copy from "@/components/ui/textAnimation/Copy";
import React from "react";

const About = () => {
  return (
    <section className="relative w-full h-screen p-8 flex flex-col justify-between">
      <Copy animateOnScroll={true} delay={0.2}>
        <span>
          HACKWAVE is a hackathon for the GOATS. It is a 364-hour hackathon that
          will be held on July 13-14, 2025.
        </span>
      </Copy>

      <div>
        <Copy animateOnScroll={true} delay={0.2}>
          <h1>
            We are a group of visionary students who started HACKWAVE in 2023
            with a simple dream - to create the most challenging and rewarding
            hackathon experience. What began as late-night discussions in our
            college dorm rooms quickly evolved into a movement that captured
            imaginations across the tech community.
          </h1>
        </Copy>
      </div>
    </section>
  );
};

export default About;
