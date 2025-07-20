"use client";

import React from "react";
import Navbar from "@/components/global/nav";
import { Timeline } from "@/components/ui/timeline";

export default function TimelinePage() {
  const data = [
    {
      title: "5th July - Registrations Start",
      content: (
        <div>
          <div className="mb-6">
            <span className="inline-block bg-[#c6fe69] text-[#141414] px-3 py-1 rounded-full text-sm font-medium mb-4">
              Phase 1
            </span>
          </div>
          <p className="mb-8 text-base font-medium text-[#141414] leading-relaxed">
            Hackwave registrations are now open! Form your teams and prepare for the ultimate coding challenge.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&h=300&fit=crop&crop=center"
              alt="team registration"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=500&h=300&fit=crop&crop=center"
              alt="team formation"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1553028826-f4804a6dba3b?w=500&h=300&fit=crop&crop=center"
              alt="project ideas"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=500&h=300&fit=crop&crop=center"
              alt="strategy planning"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "22nd July - First Batch Approval",
      content: (
        <div>
          <div className="mb-6">
            <span className="inline-block bg-[#ff6ec7] text-[#141414] px-3 py-1 rounded-full text-sm font-medium mb-4">
              Phase 2
            </span>
          </div>
          <p className="mb-4 text-base font-medium text-[#141414] leading-relaxed">
            First round of team selections completed. Selected teams receive confirmation emails and access to exclusive resources.
          </p>
          <p className="mb-8 text-base font-medium text-[#666] leading-relaxed">
            Check your inbox for the exciting news! Approved teams get early access to mentorship and workshop materials.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop&crop=center"
              alt="team selection"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1596526131083-e8c633c948d2?w=500&h=300&fit=crop&crop=center"
              alt="confirmation emails"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=500&h=300&fit=crop&crop=center"
              alt="mentorship access"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=500&h=300&fit=crop&crop=center"
              alt="workshop materials"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "31st July - Registration Deadline",
      content: (
        <div>
          <div className="mb-6">
            <span className="inline-block bg-[#4f8cff] text-[#141414] px-3 py-1 rounded-full text-sm font-medium mb-4">
              Phase 3
            </span>
          </div>
          <p className="mb-6 text-base font-medium text-[#141414] leading-relaxed">
            Final day to register for Hackwave! Don't miss this incredible opportunity.
          </p>
          <div className="mb-8 space-y-3">
            <div className="flex items-center gap-3 text-base text-[#666] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ff6ec7]"></span>
              Last chance to register your team
            </div>
            <div className="flex items-center gap-3 text-base text-[#666] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#c6fe69]"></span>
              Submit all required documents
            </div>
            <div className="flex items-center gap-3 text-base text-[#666] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#4f8cff]"></span>
              Registration portal closes at midnight
            </div>
            <div className="flex items-center gap-3 text-base text-[#666] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#ff6d38]"></span>
              Prepare for selection process
            </div>
            <div className="flex items-center gap-3 text-base text-[#666] font-medium">
              <span className="w-2 h-2 rounded-full bg-[#faffa5]"></span>
              Get ready for the ultimate hackathon experience
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=500&h=300&fit=crop&crop=center"
              alt="final call"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=500&h=300&fit=crop&crop=center"
              alt="last submissions"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=500&h=300&fit=crop&crop=center"
              alt="deadline"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1556155092-8707de31f9c4?w=500&h=300&fit=crop&crop=center"
              alt="no more entries"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2nd August - Second Batch Approval",
      content: (
        <div>
          <div className="mb-6">
            <span className="inline-block bg-[#ffc5dd] text-[#141414] px-3 py-1 rounded-full text-sm font-medium mb-4">
              Phase 4
            </span>
          </div>
          <p className="mb-8 text-base font-medium text-[#141414] leading-relaxed">
            Final round of team selections and confirmations. All selected teams receive comprehensive preparation materials.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=500&h=300&fit=crop&crop=center"
              alt="final selection"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&h=300&fit=crop&crop=center"
              alt="confirmation round 2"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop&crop=center"
              alt="team finalization"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&h=300&fit=crop&crop=center"
              alt="hackathon prep"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "23rd-25th August - Hackathon Days",
      content: (
        <div>
          <div className="mb-6">
            <span className="inline-block bg-[#ff6ec7] text-[#141414] px-3 py-1 rounded-full text-sm font-medium mb-4">
              Final Phase
            </span>
          </div>
          <p className="mb-4 text-base font-medium text-[#141414] leading-relaxed">
            The ultimate 36-hour buildathon begins! Join us on campus for an intense coding marathon where innovation meets creativity.
          </p>
          <p className="mb-8 text-base font-medium text-[#666] leading-relaxed">
            Compete, collaborate, and innovate with the best minds across the nation. Build your prototype and compete for the grand prize!
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=300&fit=crop&crop=center"
              alt="36-hour build"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1567427017947-545c5f8d16ad?w=500&h=300&fit=crop&crop=center"
              alt="grand prize"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1556761175-b413da4baf72?w=500&h=300&fit=crop&crop=center"
              alt="team collaboration"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
            <img
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&h=300&fit=crop&crop=center"
              alt="innovation wave"
              width={500}
              height={500}
              className="h-20 w-full rounded-xl object-cover border border-[#141414]/10 md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <div 
        className="relative w-full min-h-screen bg-[#141414]"
        style={{ scrollBehavior: 'smooth' }}
      >
        <Timeline data={data} />
      </div>
    </>
  );
}
