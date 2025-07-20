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
  bio: string;
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
    bio: "Providing academic guidance and support for the hackathon event.",
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
    bio: "Overseeing academic standards and student mentorship throughout the event.",
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
    name: "Atharvaraj Singh Thakur",
    role: "Technical Lead",
    bio: "Passionate about building communities and bringing innovative ideas to life through hackathons.",
    image: "/icons/icon_1.png",
    category: "organizer",
    social: {
      linkedin: "https://linkedin.com/in/johndoe",
      github: "https://github.com/johndoe",
      twitter: "https://twitter.com/johndoe",
    },
  },
  {
    id: 2,
    name: "Aniruddha Dubgey",
    role: "Technical Lead",
    bio: "Full-stack developer with expertise in mentoring and guiding participants through technical challenges.",
    image: "/icons/icon_2.png",
    category: "organizer",
    social: {
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
  },
  {
    id: 3,
    name: "Jigyarth Sharma",
    role: "Operation and Management",
    bio: "Building partnerships with industry leaders to provide amazing opportunities for participants.",
    image: "/icons/icon_3.png",
    category: "organizer",
    social: {
      linkedin: "https://linkedin.com/in/mikejohnson",
    },
  },
  {
    id: 4,
    name: "Devansh Jagtap",
    role: "Operation and Management",
    bio: "Creating beautiful and intuitive experiences for both participants and organizers.",
    image: "/icons/icon_4.png",
    category: "organizer",
    social: {
      linkedin: "https://linkedin.com/in/sarahwilson",
      github: "https://github.com/sarahwilson",
    },
  },
  {
    id: 5,
    name: "Anam Qureshi",
    role: "Design lead",
    bio: "Fostering an inclusive and supportive environment for all hackathon participants.",
    image: "/icons/icon_5.png",
    category: "organizer",
    social: {
      linkedin: "https://linkedin.com/in/alexchen",
      twitter: "https://twitter.com/alexchen",
    },
  },
  {
    id: 6,
    name: "Ketan Tomar",
    role: "Logistics Coordinator",
    bio: "Ensuring everything runs smoothly from venue setup to catering and participant support.",
    image: "/icons/icon_6.png",
    category: "organizer",
    social: {
      linkedin: "https://linkedin.com/in/davidbrown",
    },
  },
  {
    id: 7,
    name: "Tanishka Bhagat",
    role: "Design lead",
    bio: "Ensuring everything runs smoothly from venue setup to catering and participant support.",
    image: "/icons/icon_1.png",
    category: "organizer",
    social: {
      linkedin: "https://linkedin.com/in/davidbrown",
    },
  },
];

// Team Members data (14 members)
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Team Member 1",
    role: "Developer",
    bio: "Contributing to the technical development and innovation.",
    image: "/icons/icon_1.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember1",
      github: "https://github.com/teammember1",
    },
  },
  {
    id: 2,
    name: "Team Member 2",
    role: "Designer",
    bio: "Creating beautiful and user-friendly designs.",
    image: "/icons/icon_2.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember2",
    },
  },
  {
    id: 3,
    name: "Team Member 3",
    role: "Marketing",
    bio: "Promoting the event and engaging with participants.",
    image: "/icons/icon_3.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember3",
      twitter: "https://twitter.com/teammember3",
    },
  },
  {
    id: 4,
    name: "Team Member 4",
    role: "Content Creator",
    bio: "Developing engaging content for various platforms.",
    image: "/icons/icon_4.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember4",
    },
  },
  {
    id: 5,
    name: "Team Member 5",
    role: "Technical Support",
    bio: "Providing technical assistance to participants.",
    image: "/icons/icon_5.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember5",
      github: "https://github.com/teammember5",
    },
  },
  {
    id: 6,
    name: "Team Member 6",
    role: "Event Coordinator",
    bio: "Coordinating various aspects of the event.",
    image: "/icons/icon_6.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember6",
    },
  },
  {
    id: 7,
    name: "Team Member 7",
    role: "Volunteer Manager",
    bio: "Managing and coordinating volunteer activities.",
    image: "/icons/icon_1.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember7",
    },
  },
  {
    id: 8,
    name: "Team Member 8",
    role: "Social Media Manager",
    bio: "Managing social media presence and engagement.",
    image: "/icons/icon_2.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember8",
      twitter: "https://twitter.com/teammember8",
    },
  },
  {
    id: 9,
    name: "Team Member 9",
    role: "Registration Coordinator",
    bio: "Handling participant registrations and queries.",
    image: "/icons/icon_3.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember9",
    },
  },
  {
    id: 10,
    name: "Team Member 10",
    role: "Workshop Coordinator",
    bio: "Organizing workshops and educational sessions.",
    image: "/icons/icon_4.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember10",
    },
  },
  {
    id: 11,
    name: "Team Member 11",
    role: "Sponsor Relations",
    bio: "Building and maintaining sponsor relationships.",
    image: "/icons/icon_5.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember11",
    },
  },
  {
    id: 12,
    name: "Team Member 12",
    role: "Photographer",
    bio: "Capturing memorable moments throughout the event.",
    image: "/icons/icon_6.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember12",
    },
  },
  {
    id: 13,
    name: "Team Member 13",
    role: "Audio/Visual Coordinator",
    bio: "Managing technical equipment and presentations.",
    image: "/icons/icon_1.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember13",
      github: "https://github.com/teammember13",
    },
  },
  {
    id: 14,
    name: "Team Member 14",
    role: "Food & Hospitality",
    bio: "Ensuring participants are well-fed and comfortable.",
    image: "/icons/icon_2.png",
    category: "team",
    social: {
      linkedin: "https://linkedin.com/in/teammember14",
    },
  },
];

const TeamPage = () => {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#141414] text-[#fcf2e8] py-20 px-6">
        {/* Header Section */}
        <div
          ref={containerRef}
          className="text-center h-screen mb-16 flex flex-col items-center justify-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl text-[#fcf2e8] mb-6">
            <VariableProximity
              label="Meet The Team"
              fromFontVariationSettings="wght 300"
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
