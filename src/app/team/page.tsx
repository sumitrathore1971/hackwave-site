"use client";

import React, { useRef } from "react";
import { useState } from "react";
import Navbar from "@/components/global/nav";
import TeamCard from "@/components/ui/TeamCard";
import VariableProximity from "@/components/ui/VariableProximity";

// Team member interface matching TeamCard component
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio?: string;
  image: string;
  category: "organizer" | "faculty" | "team";
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

// Faculty Coordinators data
const facultyCoordinators: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Faculty Name 1",
    role: "Faculty Coordinator",
    image: "/icons/icon_1.png",
    category: "faculty",
    social: {
      linkedin: "https://linkedin.com/in/faculty1",
    },
  },
  {
    id: 2,
    name: "Dr. Faculty Name 2",
    role: "Faculty Coordinator",
    image: "/icons/icon_2.png",
    category: "faculty",
    social: {
      linkedin: "https://linkedin.com/in/faculty2",
    },
  },
];

// Organizers data
const organizers: TeamMember[] = [
  {
    id: 1,
    name: "Atharva Raj Singh Thakur",
    role: "Technical Lead",
    image: "/teamPhoto/atharva2.jpg",
    category: "organizer",
    social: {
      twitter: "https://x.com/codepaglu",
      linkedin: "https://www.linkedin.com/in/atharvarajthakur/",
    },
  },
  {
    id: 2,
    name: "Aniruddh Dubge",
    role: "Technical Lead",
    image: "/teamPhoto/AniruddhDubge.jpeg",
    category: "organizer",
    social: {
      twitter: "https://x.com/icantcodefyi",
      linkedin: "https://www.linkedin.com/in/aniruddhdubge/",
    },
  },
  {
    id: 3,
    name: "Devansh Jagtap",
    role: "Operation and Management lead",
    image: "/teamPhoto/Devansh Jagtap.jpg",
    category: "organizer",
    social: {
      linkedin: "https://www.linkedin.com/in/devansh-jagtap",
      twitter: "https://x.com/devansh_jagtap",
    },
  },
  {
    id: 4,
    name: "Jigyarth Sharma",
    role: "Operation and Management lead",
    image: "/teamPhoto/Jigyarth Sharma.jpg",
    category: "organizer",
    social: {
      linkedin: "https://www.linkedin.com/in/jigyarth",
      twitter: "https://twitter.com/btwitsjigz",
    },
  },
  {
    id: 5,
    name: "Anam Mansoori",
    role: "Design lead",
    image: "/teamPhoto/anam.jpg",
    category: "organizer",
    social: {},
  },
  {
    id: 6,
    name: "Ketan Thombare",
    role: "Outreach Lead",
    image: "/teamPhoto/Ketan Thombare.jpg",
    category: "organizer",
    social: {
      linkedin: "https://www.linkedin.com/in/ketanthombare-tech/",
      twitter: "https://x.com/ThombareKetan",
    },
  },
  {
    id: 7,
    name: "Tanishka Bhagat",
    role: "Design lead",
    image: "/teamPhoto/Tanishka Bhagat.jpg",
    category: "organizer",
    social: {
      linkedin: "https://www.linkedin.com/in/tanishka-bhagat",
      twitter: "https://x.com/Tanishkaverse?t=UKe7Tkqeas8PboMYMmS82Q&s=09",
    },
  },
];

// Team Members data (14 members)
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Himanshu Verma",
    role: "Technical Team",
    image: "/teamPhoto/Himanshu Verma.jpg",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/himanshuverma765/",
    },
  },
  {
    id: 2,
    name: "Kamaksha Raghuwanshi",
    role: "Outreach Team",
    image: "/teamPhoto/Kamaksha.jpg",
    category: "team",
    social: {
      linkedin:
        "https://www.linkedin.com/in/kamaksha-r-793983252?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 3,
    name: "SUMIT RATHORE",
    role: "Technical Team",
    image: "/teamPhoto/Sumit Rathore.jpg",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/rathore-sumit/",
      twitter: "https://x.com/Sumit197105",
    },
  },
  {
    id: 4,
    name: "Shreya Girase",
    role: "Social & content team",
    image: "/teamPhoto/Shreya Girase.jpg",
    category: "team",
    social: {
      linkedin:
        "https://www.linkedin.com/in/shreya-girase-4951aa290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 5,
    name: "Jayditya Sawai ",
    role: "Operations & Management Team",
    image: "/teamPhoto/JaydityaSawai.jpg",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/jayditya-sawai",
      twitter: "https://twitter.com/jayd1tya",
    },
  },
  {
    id: 6,
    name: "Anish Sarkar",
    role: "Operations & Management Team",
    image: "/teamPhoto/Anish Sarkar.jpg",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/anishsarkar-",
      twitter: "https://x.com/anishsarkars",
    },
  },
  {
    id: 7,
    name: "Saloni Pathak",
    role: "Operations & Management Team",
    image: "/teamPhoto/Saloni Pathak.jpg",
    category: "team",
    social: {
      linkedin:
        "https://www.linkedin.com/in/saloni-pathak-555505290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 8,
    name: "Tapan Porwal",
    role: "Operations & Management Team",
    image: "/teamPhoto/tapan Porwal.jpg",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/tapan-porwal-b46826205",
      twitter: "https://x.com/PorwalTapan?t=1FNs38m5J3RjvI4cu3ZUYw&s=09",
    },
  },
  {
    id: 9,
    name: "Riya Singh ",
    role: "Social & content team",
    image: "/teamPhoto/Riya Singh.png",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/riya-singh-00505b294/",
      twitter: "https://twitter.com/riya5667",
    },
  },
  {
    id: 10,
    name: "Sumit chouhan ",
    role: "Social & content team",
    image: "/teamPhoto/Sumit Chouhan.jpg",
    category: "team",
    social: {
      linkedin:
        "https://www.linkedin.com/in/sumit-chouhan-a3858b290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      twitter: "https://x.com/SumitChouh46839?s=09",
    },
  },
  {
    id: 11,
    name: "Paridhi Jain",
    role: "Social & content team",
    image: "/teamPhoto/Paridhi Jain.jpg",
    category: "team",
    social: {
      linkedin:
        "https://www.linkedin.com/in/paridhi-jain-240a69297?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 12,
    name: "Prashant chouhan ",
    role: "Technical Team",
    image: "/teamPhoto/Prashant Chouhan.jpg",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/prashantt-chouhan/",
    },
  },
  {
    id: 13,
    name: "Vaidehi gupta",
    role: "Outreach Team",
    image: "/teamPhoto/Vaidehi Gupta.jpg",
    category: "team",
    social: {
      linkedin:
        "https://www.linkedin.com/in/vaidehi-gupta-739970290?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    },
  },
  {
    id: 14,
    name: "Jishan Ansari ",
    role: "Technical Team",
    image: "/teamPhoto/Jishan Ansari.jpg",
    category: "team",
    social: {
      linkedin: "https://www.linkedin.com/in/jishan-ansari-74363a280",
      twitter: "https://twitter.com/Ansarixjishan",
    },
  },
];

const TeamPage = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#141414] text-[#fcf2e8] pb-20 px-6">
        {/* Header Section */}
        <div
          ref={containerRef}
          className="text-center h-screen mb-16 flex flex-col items-center justify-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-[#fcf2e8] mb-6">
            <VariableProximity
              label="Meet The Team"
              fromFontVariationSettings="wght 200"
              toFontVariationSettings="wght 900"
              radius={400}
              containerRef={containerRef}
            />
          </h1>
          <p className="text-xl md:text-2xl text-[#ccc] max-w-3xl mx-auto">
            The passionate individuals behind Hackwave who work tirelessly to
            create an unforgettable experience for all participants.
          </p>
        </div>
        <div className="max-w-7xl mx-auto">
          {/* Faculty Coordinators Section */}
          {false && (
            <div className="mb-20">
              <div className="text-center mb-12">
                <h2 className="flex flex-row items-center justify-center text-4xl md:text-5xl font-black text-[#fcf2e8] mb-4 gap-4">
                  Faculty
                  <span className="inline-block px-2 sm:px-3 md:px-4 lg:px-6 bg-pink-300 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 sm:border-3 md:border-4 lg:border-6">
                    {" "}
                    Coordinators
                  </span>
                </h2>
                <p className="text-lg md:text-xl text-[#ccc] max-w-2xl mx-auto">
                  Academic leaders providing guidance and support for our
                  hackathon
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {facultyCoordinators.map((member) => (
                  <TeamCard
                    key={`faculty-${member.id}`}
                    member={member}
                    onMouseEnter={setHoveredMember}
                    onMouseLeave={() => setHoveredMember(null)}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Organizers Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#fcf2e8] mb-4">
                <span className="inline-block px-2 sm:px-3 md:px-4 lg:px-6 bg-pink-300 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 sm:border-3 md:border-4 lg:border-6">
                  Organizers
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[#ccc] max-w-2xl mx-auto">
                The core team driving the vision and execution of Hackwave
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {organizers.map((member) => (
                <TeamCard
                  key={`organizer-${member.id}`}
                  member={member}
                  onMouseEnter={setHoveredMember}
                  onMouseLeave={() => setHoveredMember(null)}
                />
              ))}
            </div>
          </div>

          {/* Team Members Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-[#fcf2e8] mb-4">
                <span className="inline-block px-2 sm:px-3 md:px-4 lg:px-6 bg-pink-300 rounded-lg sm:rounded-xl md:rounded-2xl lg:rounded-3xl border-2 sm:border-3 md:border-4 lg:border-6">
                  Team Members
                </span>
              </h2>
              <p className="text-lg md:text-xl text-[#ccc] max-w-2xl mx-auto">
                Dedicated individuals making Hackwave a memorable experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <TeamCard
                  key={`team-${member.id}`}
                  member={member}
                  onMouseEnter={setHoveredMember}
                  onMouseLeave={() => setHoveredMember(null)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
