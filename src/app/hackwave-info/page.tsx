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
        "8:00–9:00 AM — Team Registration & Breakfast",
        "9:00–9:45 AM — Opening Ceremony & Welcome Note",
        "10:00 AM — Problem Statement Distribution",
        "11:00 AM — Hackathon Begins",
        "1:00–2:00 PM — Lunch",
        "2:00–7:00 PM — Development Time",
        "7:00–8:00 PM — Mentor Session 1",
        "8:30–9:30 PM — Dinner"
      ]
    },
    {
      day: "Day 2", 
      date: "24th Aug 2025",
      color: "#feaac0",
      events: [
        "8:00–9:00 AM — Breakfast",
        "9:00 AM–1:00 PM — Development Time", 
        "1:00–2:00 PM — Lunch",
        "2:30–3:30 PM — Mentor Session 2",
        "3:30–8:30 PM — Development Time",
        "8:30–9:30 PM — Dinner"
      ]
    },
    {
      day: "Day 3",
      date: "25th Aug 2025", 
      color: "#f9ffa5",
      events: [
        "8:00–9:00 AM — Breakfast",
        "9:30 AM–12:30 PM — Final Judging",
        "1:00–2:00 PM — Lunch", 
        "2:30–4:00 PM — Closing Ceremony & Prize Distribution"
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

        {/* Top grid: About, Problem Statements, Prize Pool */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 items-stretch mb-12 md:mb-16">
          {/* About */}
          <Reveal>
            <div className="rounded-2xl p-6 md:p-8 bg-[#dcd0fe] text-[#141414] h-full min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-[#141414] text-[#fcf2e8] px-4 py-2 rounded-full text-base font-medium">
                About Hackwave2.0
              </span>
            </div>
            <div className="space-y-3 text-base font-medium">
              <p>
                Hackwave 2.0 is a <b>three-day offline hackathon</b> uniting bold builders to solve
                <b> real-world challenges</b>.
              </p>
              <p>
                <b>No domain restrictions</b>. Choose any problem and any tech stack.
              </p>
              <ol className="list-decimal ml-6 space-y-1">
                <li>
                  <b>Round 1 – Online Selection:</b> Submit your best past project.
                </li>
                <li>
                  <b>Round 2 – Offline Hackathon:</b> Build from scratch in 36 hours at the venue.
                </li>
              </ol>
            </div>
            </div>
          </Reveal>

          {/* Problem Statements */}
          <Reveal delay={100}>
            <div className="rounded-2xl p-6 md:p-8 bg-[#feaac0] text-[#141414] h-full min-h-[300px] md:min-h-[340px] lg:min-h-[380px] flex flex-col">
            <div className="mb-4">
              <span className="inline-block bg-[#141414] text-[#fcf2e8] px-4 py-2 rounded-full text-base font-medium">
                Selection
              </span>
            </div>
            <ul className="list-disc ml-6 space-y-2 text-base font-medium">
              <li>
                <b>No domain restrictions</b> — pick what excites you most.
              </li>
              <li>
                <b>Preference-based allocation</b> (FIFO): up to <b>3 preferences</b> per team. If first is full, we may assign your second or third.
              </li>
              <li>
                <b>Build from scratch</b> during the hackathon only.
              </li>
            </ul>
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
            <ul className="list-disc ml-6 space-y-2 text-base font-medium">
              <li>
                 <b>Total:</b> ₹1,00,000
              </li>
              <li>
                <b>5 problem statements → 5 winners</b>
              </li>
              <li>
                <b>Each winner:</b> ₹20,000 (awarded during closing ceremony on 25th Aug)
              </li>
            </ul>
            </div>
          </Reveal>
        </div>

        {/* Rules in a single wide card */}
        <div className="mb-12 md:mb-16">
          <Reveal>
            <div className="rounded-2xl p-6 md:p-10 bg-[#d1ecff] text-[#141414]">
            <div className="mb-4">
              <span className="inline-block bg-[#141414] text-[#fcf2e8] px-4 py-2 rounded-full text-base font-medium">
                Need to Follow
              </span>
            </div>
            <ol className="list-decimal ml-6 space-y-3 text-base md:text-lg font-medium">
              <li>
                <b>Eligibility</b>: Only shortlisted teams from Round 1 may join the offline Round 2.
              </li>
              <li>
                <b>Team Size</b>: 3–5 members. Changes after selection require organizer approval.
              </li>
              <li>
                <b>Original Work</b>: All code must be written during the hackathon. Open-source libs are allowed.
              </li>
              <li>
                <b>Code Ownership (IP)</b>: Remains with the team.
              </li>
              <li>
                <b>Plagiarism</b>: Leads to immediate disqualification.
              </li>
              <li>
                <b>Mentor Support</b>: Two sessions during the event.
              </li>
              <li>
                <b>Judging Criteria</b>: Innovation, Execution, Feasibility, Impact, Presentation.
              </li>
              <li>
                <b>Conduct</b>: Be respectful, collaborative, and inclusive.
              </li>
              <li>
                <b>Organizer Decisions</b>: Final and binding.
              </li>
            </ol>
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


