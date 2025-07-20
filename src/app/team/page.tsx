"use client";

import React from "react";
import { useState } from "react";
import Navbar from "@/components/global/nav";

// Team member interface
interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
}

// Faculty Coordinators data
const facultyCoordinators: TeamMember[] = [
  {
    id: 1,
    name: "Dr. Faculty Name 1",
    role: "Faculty Coordinator",
    bio: "Providing academic guidance and support for the hackathon event.",
    image: "/icons/icon_1.png",
    linkedin: "https://linkedin.com/in/faculty1"
  },
  {
    id: 2,
    name: "Dr. Faculty Name 2",
    role: "Faculty Coordinator",
    bio: "Overseeing academic standards and student mentorship throughout the event.",
    image: "/icons/icon_2.png",
    linkedin: "https://linkedin.com/in/faculty2"
  }
];

// Organizers data
const organizers: TeamMember[] = [
  {
    id: 1,
    name: "Atharvaraj Singh Thakur",
    role: "Technical Lead",
    bio: "Passionate about building communities and bringing innovative ideas to life through hackathons.",
    image: "/icons/icon_1.png",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "https://twitter.com/johndoe"
  },
  {
    id: 2,
    name: "Aniruddha Dubgey",
    role: "Technical Lead",
    bio: "Full-stack developer with expertise in mentoring and guiding participants through technical challenges.",
    image: "/icons/icon_2.png",
    linkedin: "https://linkedin.com/in/janesmith",
    github: "https://github.com/janesmith"
  },
  {
    id: 3,
    name: "Jigyarth Sharma",
    role: "Operation and Management",
    bio: "Building partnerships with industry leaders to provide amazing opportunities for participants.",
    image: "/icons/icon_3.png",
    linkedin: "https://linkedin.com/in/mikejohnson"
  },
  {
    id: 4,
    name: "Devansh Jagtap",
    role: "Operation and Management",
    bio: "Creating beautiful and intuitive experiences for both participants and organizers.",
    image: "/icons/icon_4.png",
    linkedin: "https://linkedin.com/in/sarahwilson",
    github: "https://github.com/sarahwilson"
  },
  {
    id: 5,
    name: "Anam Qureshi",
    role: "Design lead",
    bio: "Fostering an inclusive and supportive environment for all hackathon participants.",
    image: "/icons/icon_5.png",
    linkedin: "https://linkedin.com/in/alexchen",
    twitter: "https://twitter.com/alexchen"
  },
  {
    id: 6,
    name: "Ketan Tomar",
    role: "Logistics Coordinator",
    bio: "Ensuring everything runs smoothly from venue setup to catering and participant support.",
    image: "/icons/icon_6.png",
    linkedin: "https://linkedin.com/in/davidbrown"
  },
  {
    id: 7,
    name: "Tanishka Bhagat",
    role: "Design lead",
    bio: "Ensuring everything runs smoothly from venue setup to catering and participant support.",
    image: "/icons/icon_1.png",
    linkedin: "https://linkedin.com/in/davidbrown"
  }
];

// Team Members data (14 members)
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Team Member 1",
    role: "Developer",
    bio: "Contributing to the technical development and innovation.",
    image: "/icons/icon_1.png",
    linkedin: "https://linkedin.com/in/teammember1",
    github: "https://github.com/teammember1"
  },
  {
    id: 2,
    name: "Team Member 2",
    role: "Designer",
    bio: "Creating beautiful and user-friendly designs.",
    image: "/icons/icon_2.png",
    linkedin: "https://linkedin.com/in/teammember2"
  },
  {
    id: 3,
    name: "Team Member 3",
    role: "Marketing",
    bio: "Promoting the event and engaging with participants.",
    image: "/icons/icon_3.png",
    linkedin: "https://linkedin.com/in/teammember3",
    twitter: "https://twitter.com/teammember3"
  },
  {
    id: 4,
    name: "Team Member 4",
    role: "Content Creator",
    bio: "Developing engaging content for various platforms.",
    image: "/icons/icon_4.png",
    linkedin: "https://linkedin.com/in/teammember4"
  },
  {
    id: 5,
    name: "Team Member 5",
    role: "Technical Support",
    bio: "Providing technical assistance to participants.",
    image: "/icons/icon_5.png",
    linkedin: "https://linkedin.com/in/teammember5",
    github: "https://github.com/teammember5"
  },
  {
    id: 6,
    name: "Team Member 6",
    role: "Event Coordinator",
    bio: "Coordinating various aspects of the event.",
    image: "/icons/icon_6.png",
    linkedin: "https://linkedin.com/in/teammember6"
  },
  {
    id: 7,
    name: "Team Member 7",
    role: "Volunteer Manager",
    bio: "Managing and coordinating volunteer activities.",
    image: "/icons/icon_1.png",
    linkedin: "https://linkedin.com/in/teammember7"
  },
  {
    id: 8,
    name: "Team Member 8",
    role: "Social Media Manager",
    bio: "Managing social media presence and engagement.",
    image: "/icons/icon_2.png",
    linkedin: "https://linkedin.com/in/teammember8",
    twitter: "https://twitter.com/teammember8"
  },
  {
    id: 9,
    name: "Team Member 9",
    role: "Registration Coordinator",
    bio: "Handling participant registrations and queries.",
    image: "/icons/icon_3.png",
    linkedin: "https://linkedin.com/in/teammember9"
  },
  {
    id: 10,
    name: "Team Member 10",
    role: "Workshop Coordinator",
    bio: "Organizing workshops and educational sessions.",
    image: "/icons/icon_4.png",
    linkedin: "https://linkedin.com/in/teammember10"
  },
  {
    id: 11,
    name: "Team Member 11",
    role: "Sponsor Relations",
    bio: "Building and maintaining sponsor relationships.",
    image: "/icons/icon_5.png",
    linkedin: "https://linkedin.com/in/teammember11"
  },
  {
    id: 12,
    name: "Team Member 12",
    role: "Photographer",
    bio: "Capturing memorable moments throughout the event.",
    image: "/icons/icon_6.png",
    linkedin: "https://linkedin.com/in/teammember12"
  },
  {
    id: 13,
    name: "Team Member 13",
    role: "Audio/Visual Coordinator",
    bio: "Managing technical equipment and presentations.",
    image: "/icons/icon_1.png",
    linkedin: "https://linkedin.com/in/teammember13",
    github: "https://github.com/teammember13"
  },
  {
    id: 14,
    name: "Team Member 14",
    role: "Food & Hospitality",
    bio: "Ensuring participants are well-fed and comfortable.",
    image: "/icons/icon_2.png",
    linkedin: "https://linkedin.com/in/teammember14"
  }
];

const TeamPage = () => {
  const [hoveredMember, setHoveredMember] = useState<string | number | null>(null);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-[#fcf2e8] to-[#f0f9ff] py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#141414] mb-6">
              Meet Our
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#34D399] to-[#FBBF24]">
                Amazing Team
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
              The passionate individuals behind Hackwave who work tirelessly to create 
              an unforgettable experience for all participants.
            </p>
          </div>

          {/* Faculty Coordinators Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#141414] mb-4">
                Faculty
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#EC4899] via-[#F472B6] to-[#FB7185]"> Coordinators</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Academic leaders providing guidance and support for our hackathon
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {facultyCoordinators.map((member) => (
                <div
                  key={`faculty-${member.id}`}
                  className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    hoveredMember === `faculty-${member.id}` ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredMember(`faculty-${member.id}`)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#EC4899]/10 via-[#F472B6]/10 to-[#FB7185]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 relative">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-[#EC4899] transition-colors duration-300">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#F472B6] opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-500" />
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-[#141414] mb-2">
                        {member.name}
                      </h3>
                      <p className="text-lg font-semibold text-[#EC4899] mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#EC4899] text-white rounded-full flex items-center justify-center hover:bg-[#DB2777] transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Organizers Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#141414] mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A78BFA] via-[#34D399] to-[#FBBF24]">Organizers</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                The core team driving the vision and execution of Hackwave
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {organizers.map((member) => (
                <div
                  key={`organizer-${member.id}`}
                  className={`group relative bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    hoveredMember === `organizer-${member.id}` ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredMember(`organizer-${member.id}`)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA]/10 via-[#34D399]/10 to-[#FBBF24]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-24 h-24 mx-auto mb-6 relative">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-[#A78BFA] transition-colors duration-300">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#34D399] opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-500" />
                    </div>

                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-[#141414] mb-2">
                        {member.name}
                      </h3>
                      <p className="text-lg font-semibold text-[#FBBF24] mb-4">
                        {member.role}
                      </p>
                      <p className="text-gray-600 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div className="flex justify-center space-x-4">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#A78BFA] text-white rounded-full flex items-center justify-center hover:bg-[#8B5CF6] transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#34D399] text-white rounded-full flex items-center justify-center hover:bg-[#10B981] transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 bg-[#FB923C] text-white rounded-full flex items-center justify-center hover:bg-[#EA580C] transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Members Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-[#141414] mb-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FB923C] via-[#FBBF24] to-[#34D399]">Team Members</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                Dedicated individuals making Hackwave a memorable experience
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teamMembers.map((member) => (
                <div
                  key={`team-${member.id}`}
                  className={`group relative bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 ${
                    hoveredMember === `team-${member.id}` ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setHoveredMember(`team-${member.id}`)}
                  onMouseLeave={() => setHoveredMember(null)}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#FB923C]/10 via-[#FBBF24]/10 to-[#34D399]/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-4 relative">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-[#FB923C] transition-colors duration-300">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="absolute -inset-2 rounded-full border-2 border-dashed border-[#FBBF24] opacity-0 group-hover:opacity-100 group-hover:animate-spin transition-opacity duration-500" />
                    </div>

                    <div className="text-center mb-4">
                      <h3 className="text-lg font-bold text-[#141414] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm font-semibold text-[#FB923C] mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>

                    <div className="flex justify-center space-x-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-[#FB923C] text-white rounded-full flex items-center justify-center hover:bg-[#EA580C] transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-[#34D399] text-white rounded-full flex items-center justify-center hover:bg-[#10B981] transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {member.twitter && (
                        <a
                          href={member.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-8 h-8 bg-[#FBBF24] text-white rounded-full flex items-center justify-center hover:bg-[#F59E0B] transition-colors duration-300 transform hover:scale-110"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TeamPage;
