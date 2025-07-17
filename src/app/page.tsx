"use client";

import Navbar from "@/components/global/nav";
import InfoCard from "@/components/landing/info-card";
import ResponsiveHero from "@/components/landing/responsive-hero";

export default function Home() {
  return (
    <>
      <Navbar />
      <ResponsiveHero />
      <InfoCard />
      {/* 
      <About/> */}

      {/* <section className="relative w-full h-screen p-8 flex flex-col justify-between">
        <Copy animateOnScroll={true} delay={0.2}>
          <span>
            HACKWAVE is a hackathon for the GOATS. It is a 364-hour hackathon
            that will be held on July 13-14, 2025.
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
      </section> */}

      {/*<section className="relative w-full h-max p-8 flex justify-center items-center py-32">
          <img
            src="/assets/bella-kawaii-edition.png"
            alt="about-img"
            className="w-1/5 aspect-[4/5]"
          />
        </section>

        <section className="relative w-full h-max p-8 flex gap-4 mb-32">
          <Copy animateOnScroll={true} delay={0.2}>
            <div className="flex-1">
              <h1>How hackwave started</h1>
            </div>
          </Copy>
          <div className="flex-1">
            <Copy animateOnScroll={true} delay={0.2}>
              <p>
                We are a group of visionary students who started HACKWAVE in
                2023 with a simple dream - to create the most challenging and
                rewarding hackathon experience. What began as late-night
                discussions in our college dorm rooms quickly evolved into a
                movement that captured imaginations across the tech community.
              </p>
              <p>
                Our first event brought together 50 determined hackers who coded
                for 48 hours straight. The energy was electric, the projects
                were groundbreaking, and we knew we had started something
                special. Since then, HACKWAVE has grown exponentially, pushing
                boundaries and setting new standards for what hackathons can
                achieve.
              </p>
              <p>
                Today, HACKWAVE stands as a testament to student innovation and
                determination. We've expanded to a 364-hour format because we
                believe great ideas need time to evolve from concept to reality.
                Our community has grown to include thousands of passionate
                developers, designers, and dreamers from across the globe.
              </p>
            </Copy>
          </div>
        </section>

        <section className="relative w-full h-screen p-8 flex flex-col justify-between bg-[#202020]">
          <Copy animateOnScroll={true} delay={0.2}>
            <span className="text-white">Our Philosophy</span>
          </Copy>
          <div>
            <Copy animateOnScroll={true} delay={0.4}>
              <h1 className="text-white">
                We believe in pushing limits, breaking barriers, and
                occasionally breaking keyboards. 364 hours of pure chaos,
                innovation, and probably too much coffee. Because normal
                hackathons are too mainstream, and sleep is overrated. Join us
                in this beautiful madness - where bugs become features and
                dreams become reality. ✨
              </h1>
            </Copy>
          </div>
        </section>

        <footer className="flex justify-between items-end gap-4 px-8 py-24 pb-6">
          <div className="flex flex-1">
            <div className="flex-1">
              <span>Terms & Conditions</span>
            </div>
            <div className="flex-1">
              <h1>Twitter</h1>
              <h1>LinkedIn</h1>
              <h1>Instagram</h1>
              <h1>Awwwards</h1>
              <h1>Email</h1>
            </div>
          </div>
          <div className="flex-1">
            <span>Copyright Greyloom 2025</span>
          </div>
        </footer> */}
    </>
  );
}
