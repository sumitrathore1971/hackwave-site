"use client";

import React from "react";
import Navbar from "@/components/global/nav";
import { Timeline } from "@/components/ui/timeline";
import { Badge } from "@/components/ui/badge";

interface CardProps {
  badge: string;
  title: string;
  index: number;

  content: React.ReactNode;
  cta?: { label: string; onClick?: () => void; href?: string };
}

const badgeColors = [
  "#c5efff", // 1st card
  "#ddd1ff", // 2nd card
  "#c5efff", // 3rd card
  "#faffa5", // 4th card
  "#d1ecff", // 5th card
  "#ffc5dd", // 6th card (if needed)
];

const Card = ({ badge, title, content, cta, index }: CardProps) => {
  const badgeBg = badgeColors[index - 1] || "#c6fe69"; // fallback color
  return (
    <div
      className="card relative h-full text-[#141414] w-full"
      id={`card-${index + 1}`}
    >
      <div className="info-card-inner relative will-change-transform w-full h-full p-[2em] flex flex-col gap-[0.75rem] rounded-xl">
        <Badge
          className="inline-block text-[#141414] px-3 py-1.5 rounded-full text-base font-semibold border-1 border-[#141414]"
          style={{ backgroundColor: badgeBg }}
        >
          {badge}
        </Badge>
        <h3 className="text-[2.75rem] font-bold leading-tight  mb-10">
          {title}
        </h3>

        <div className="text-[1.1rem] font-medium text-left mb-4">
          {content}
        </div>
        {cta &&
          (cta.href ? (
            <a
              href={cta.href}
              className="inline-block mt-2 px-6 py-2 bg-[#141414] text-[#c6fe69] rounded-full font-semibold text-base transition-colors hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-[#c6fe69]"
              target="_blank"
              rel="noopener noreferrer"
            >
              {cta.label}
            </a>
          ) : (
            <button
              onClick={cta.onClick}
              className="inline-block mt-2 px-6 py-2 bg-[#141414] text-[#c6fe69] rounded-full font-semibold text-base transition-colors hover:bg-[#222] focus:outline-none focus:ring-2 focus:ring-[#c6fe69]"
            >
              {cta.label}
            </button>
          ))}
      </div>
    </div>
  );
};

export default function TimelinePage() {
  const data = [
    {
      title: "5th July 2025",
      content: (
        <Card
          index={1}
          badge="Round 1"
          title="Online Submission (via Unstop)"
          content={
            <>
              <b>Starts:</b> 5 July 2025, 12:00 PM IST
              <br />
              <b>Ends:</b> 31 July 2025, 12:00 PM IST
              <br />
              <b>Where:</b> Unstop
              <br />
              <br />
              Time to show off what your team&apos;s made of. Submit a short,
              punchy PPT (max 10 slides) showcasing a past project you&apos;re
              proud of.
              <br />
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Quick team intro</li>
                <li>What the project does (and why it&apos;s cool)</li>
                <li>What tech you used</li>
                <li>Some screenshots or links if you&apos;ve got &apos;em</li>
              </ul>
              <br />
              <b>Heads up:</b> This project is just for screening, You
              can&apos;t reuse it later in Round 2.
              <br />
              <b>Entry Fee For Round 1:</b> None, zip, nada. It&apos;s free to
              shoot your shot.
            </>
          }
          cta={{
            label: "Submit on Unstop",
            href: "https://unstop.com/o/szmvO5g?lb=2CqWo19U&utm_medium=Share&utm_source=shortUrl",
          }}
        />
      ),
    },
    {
      title: "23rd July 2025",
      content: (
        <Card
          index={2}
          badge="Approval"
          title="First Batch Approval"
          content={
            <>
              <b>Date:</b> 23 July 2025
              <br />
              First batch of selected teams will be announced today.
              <br />
              If you made the cut, you'll receive a{" "}
              <strong>Hackwave selection email</strong> and be added to a
              dedicated group for all further updates and event prep info.
              <br />
              <br />
              So check your inbox, this could be your entry into the real
              action.
            </>
          }
        />
      ),
    },
    {
      title: "31st July 2025",
      content: (
        <Card
          index={3}
          badge="Deadline"
          title="Submission Deadline"
          content={
            <>
              <b>Deadline:</b> 31 July 2025, 12:00 PM IST
              <br />
              This is your final call to upload your Round 1 submission.
              <br />
              Late entries? Not a chance. Set a reminder.
            </>
          }
        />
      ),
    },
    {
      title: "10th August 2025",
      content: (
        <Card
          index={4}
          badge="Approval"
          title="Second Batch Approval"
          content={
            <>
              <b>Date:</b> 10 August 2025
              <br />
              This is the last batch of approvals. If you&apos;ve made it this
              far, congrats, you&apos;re about to get everything you need to for
              Round 2.
              <br />
              Payment info and full prep kit incoming.
            </>
          }
        />
      ),
    },
    {
      title: "23rd August 2025",
      content: (
        <Card
          index={5}
          badge="Round 2"
          title="Offline Hackathon (Finale)"
          content={
            <>
              <b>Starts:</b> 23 August 2025, 09:00 AM IST
              <br />
              <b>Ends:</b> 25 August 2025, 02:00 PM IST
              <br />
              <b>Venue:</b> Chameli Devi Group of Institutions, Indore
              <br />
              <br />
              Only 50 teams make it to the big stage. It&apos;s a 36-hour
              build-from-scratch hackathon — no past projects, no shortcuts.
              <br />
              Fresh idea. Real code. Full chaos.
              <br />
              <b>Note:</b> You <i>cannot</i> reuse Round 1 Project, we&apos;re
              looking for fresh heat.
              <br />
              <b>Entry Fee:</b> ₹500 per team (only if selected — we&apos;ll
              send payment details later)
            </>
          }
        />
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div
        className="relative w-full min-h-screen bg-[#141414]"
        style={{ scrollBehavior: "smooth" }}
      >
        <Timeline data={data} />
      </div>
    </>
  );
}
