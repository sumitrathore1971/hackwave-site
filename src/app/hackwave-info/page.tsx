import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import AnimatedTitle from "@/components/info/AnimatedTitle";
import Reveal from "@/components/info/Reveal";
import TimelineExpand from "@/components/ui/TimelineExpand";

export const metadata: Metadata = {
  title: "Hackwave Info",
  description:
    "All details about Hackwave 2.0: rounds, rules, prize pool, and full 3-day timeline.",
};

export default function HackwaveInfoPage() {
  const timelineDays = [
  {
    day: "Day 1",
    date: "23rd Aug 2025", 
    color: "#dcd0fe",
    events: [
      "2:00 PM — Checking Start",
      "2:00 PM - 4:00 PM — Inauguration Ceremony",
      "4:00 PM - 4:40 PM — High Tea",
      "4:40 PM - 5:00 PM — Problem Statement Time",
      "7:00 PM - 9:00 PM — Mentor Round 1",
      "8:00 PM — Dinner",
      "10:00 PM — Food Stall Setup",
      "12:00 AM — Jamming Session"
    ]
  },
  {
    day: "Day 2", 
    date: "24th Aug 2025",
    color: "#feaac0",
    events: [
      "8:00 AM — Breakfast",
      "1:00 PM — Lunch",
      "3:00 PM — Mentor Round Final",
      "8:00 PM — Dinner",
      "12:00 AM — Midnight Games"
    ]
  },
  {
    day: "Day 3",
    date: "25th Aug 2025", 
    color: "#f9ffa5",
    events: [
      "8:00 AM — Breakfast",
      "10:00 AM — Hack Ending",
      "10:15 AM — Judging Starts",
      "11:00 AM — Lunch",
      "12:30 PM - 3:00 PM — Closing Ceremony & Prize Distribution"
    ]
  }
];

  return (
    <main className="bg-[#141414] min-h-screen w-full text-[#fcf2e8]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 md:px-8 pt-24 pb-24">
        {/* Animated centered title */}
        <AnimatedTitle
          label="Hackwave Info"
          subtitle="Rounds, rules, prizes, and the full on-ground schedule — all in one place."
        />

        {/* Hero Description */}
  <div className="mb-10 md:mb-10">
          <Reveal>
            <div className="rounded-2xl p-6 md:p-10 bg-[#feaac0] text-[#141414]">
              <div className="mb-4">
                <span className="inline-block bg-[#141414] text-[#fcf2e8] px-4 py-2 rounded-full text-base font-medium">
                   Hackwave 2.0
                </span>
              </div>
              <div className="space-y-4 text-base md:text-lg font-medium">
                <p>
                  <b>Hackwave 2.0</b> is back — bigger, bolder, and sharper than ever! 
                  A <b>three-day offline hackathon</b> where passionate innovators, creators, 
                  and disruptors come together to transform ideas into reality.
                </p>
                <p>
                  With <b>36 hours of non-stop coding, brainstorming, and building</b> alongside 
                  like-minded peers, you'll push the limits of innovation while enjoying an 
                  electrifying environment filled with energy, mentorship, and collaboration.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="bg-[#141414] text-[#fcf2e8] px-3 py-1 rounded-full text-sm">⚡ Bring your boldest ideas</span>
                  <span className="bg-[#141414] text-[#fcf2e8] px-3 py-1 rounded-full text-sm">⚡ Build solutions that matter</span>
                  <span className="bg-[#141414] text-[#fcf2e8] px-3 py-1 rounded-full text-sm">⚡ Be part of the wave of change</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* Top grid: About, Problem Statements, Prize Pool */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 md:gap-10 items-stretch mb-10 md:mb-10">

          {/* Selection Process */}
          <Reveal delay={100}>
            <div className="rounded-2xl p-6 md:p-8 bg-[#c5ffc9] text-[#141414] h-full min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-[#141414] text-[#fcf2e8] px-4 py-2 rounded-full text-base font-medium">
                 Selection Guidelines
              </span>
            </div>
            <div className="space-y-3 text-base font-medium">
              <div>
                <h4 className="font-bold mb-1"> No Domain Restrictions</h4>
                <p className="text-sm">Innovation has no boundaries — pick what excites you most.</p>
              </div>
              <div>
                <h4 className="font-bold mb-1"> Preference-Based Allocation (FIFO)</h4>
                <ul className="text-sm list-disc ml-4 space-y-1">
                  <li>Submit up to <b>3 preferences</b> per team</li>
                  <li>First preference prioritized, then second/third</li>
                  <li>Earlier submissions get better chances</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-1"> Build From Scratch</h4>
                <p className="text-sm">All projects must be developed entirely during the hackathon.</p>
              </div>
            </div>
            </div>
          </Reveal>

          {/* Prize Pool */}
          <Reveal delay={200}>
            <div className="rounded-2xl p-6 md:p-8 bg-[#f9ffa5] text-[#141414] h-full min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-[#141414] text-[#fcf2e8] px-4 py-2 rounded-full text-base font-medium">
                 Prize Pool
              </span>
            </div>
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-[6rem] font-extrabold text-[#141414] mb-4">?</div>
              <div className="text-lg font-semibold text-center">Prize Pool Reveal Coming Soon</div>
              <p className="text-sm text-center mt-2 text-[#333]">
              Stay tuned for exciting updates!
              </p>
            </div>
            </div>
          </Reveal>
        </div>

        {/* Rules in a single wide card */}
        <div className="mb-12 md:mb-10">
          <Reveal>
            <div className="rounded-2xl p-6 md:p-10 bg-[#d1ecff] text-[#141414]">
            <div className="mb-4">
              <span className="inline-block bg-[#141414] text-[#fcf2e8] px-4 py-2 rounded-full text-base font-medium">
                 Rules & Guidelines
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold text-lg mb-3"> Eligibility & Team</h4>
                <ul className="list-disc ml-6 space-y-2 text-base font-medium">
                  <li><b>Eligibility:</b> Only shortlisted teams from Round 1 can participate in offline Round 2</li>
                  <li><b>Team Size:</b> 3–5 members. Changes after selection need organizer approval</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-3"> Project Rules</h4>
                <ul className="list-disc ml-6 space-y-2 text-base font-medium">
                  <li><b>Original Work:</b> All code must be written during the hackathon</li>
                  <li><b>Allowed Resources:</b> Open-source libraries and frameworks permitted</li>
                  <li><b>Code Ownership (IP):</b> Remains with the team</li>
                  <li><b>No Plagiarism:</b> Leads to immediate disqualification</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-3"> Judging & Mentorship</h4>
                <ul className="list-disc ml-6 space-y-2 text-base font-medium">
                  <li><b>Mentor Support:</b> Two dedicated sessions during the event</li>
                  <li><b>Judging Criteria:</b> Innovation, Execution, Feasibility, Impact, Presentation</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold text-lg mb-3"> Conduct & Decisions</h4>
                <ul className="list-disc ml-6 space-y-2 text-base font-medium">
                  <li><b>Code of Conduct:</b> Be respectful, collaborative, and inclusive</li>
                  <li><b>Organizer Decisions:</b> Final and binding</li>
                </ul>
              </div>
            </div>
            </div>
          </Reveal>
        </div>

        {/* Interactive Timeline */}
        <div>
          <div className="mb-8 text-center">
            <Badge className="text-[#141414] font-semibold text-2xl px-5 py-2" style={{ backgroundColor: "#c5ffc9" }}>
              Timeline
            </Badge>
            <p className="text-[#ccc] mt-4 text-lg">Hover over or click on any day to explore the detailed schedule</p>
          </div>
          <TimelineExpand days={timelineDays} />
        </div>
      </div>
    </main>
  );
}