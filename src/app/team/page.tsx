"use client";

import { useState, useRef } from "react";
import VariableProximity from "@/components/ui/VariableProximity";
import TeamCard from "@/components/ui/TeamCard";
import { Button } from "@/components/ui/button";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  image: string;
  bio: string;
  category: "organizer" | "faculty" | "team";
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

const teamMembers: TeamMember[] = [
  // Organizers (6)
  {
    id: 1,
    name: "Alex Chen",
    role: "Founder & CEO",
    image: "/assets/team/alex.jpg",
    bio: "Visionary leader who started HACKWAVE with a dream to create the most challenging hackathon experience.",
    category: "organizer",
    social: {
      twitter: "https://twitter.com/alexchen",
      linkedin: "https://linkedin.com/in/alexchen",
    },
  },
  {
    id: 2,
    name: "Sarah Kim",
    role: "Technical Director",
    image: "/assets/team/sarah.jpg",
    bio: "Engineering wizard who ensures every line of code at HACKWAVE runs flawlessly.",
    category: "organizer",
    social: {
      twitter: "https://twitter.com/sarahkim",
      linkedin: "https://linkedin.com/in/sarahkim",
    },
  },
  {
    id: 3,
    name: "Marcus Rodriguez",
    role: "Community Lead",
    image: "/assets/team/marcus.jpg",
    bio: "The heart of our community, bringing together hackers from around the world.",
    category: "organizer",
    social: {
      twitter: "https://twitter.com/marcusrod",
      linkedin: "https://linkedin.com/in/marcusrod",
    },
  },
  {
    id: 4,
    name: "Emily Johnson",
    role: "Event Coordinator",
    image: "/assets/team/emily.jpg",
    bio: "Master of logistics and event planning, ensuring every detail is perfect.",
    category: "organizer",
    social: {
      twitter: "https://twitter.com/emilyjohnson",
      linkedin: "https://linkedin.com/in/emilyjohnson",
    },
  },
  {
    id: 5,
    name: "David Wilson",
    role: "Sponsorship Lead",
    image: "/assets/team/david.jpg",
    bio: "Building strategic partnerships and securing resources for HACKWAVE's success.",
    category: "organizer",
    social: {
      twitter: "https://twitter.com/davidwilson",
      linkedin: "https://linkedin.com/in/davidwilson",
    },
  },
  {
    id: 6,
    name: "Sophia Lee",
    role: "Marketing Director",
    image: "/assets/team/sophia.jpg",
    bio: "Creative strategist spreading the HACKWAVE vision across digital platforms.",
    category: "organizer",
    social: {
      twitter: "https://twitter.com/sophialee",
      linkedin: "https://linkedin.com/in/sophialee",
    },
  },
  // Faculty Coordinators (6)
  {
    id: 7,
    name: "Dr. Priya Patel",
    role: "Faculty Coordinator",
    image: "/assets/team/priya.jpg",
    bio: "Academic advisor and mentor who bridges the gap between academia and innovation.",
    category: "faculty",
    social: {
      twitter: "https://twitter.com/priyapatel",
      linkedin: "https://linkedin.com/in/priyapatel",
    },
  },
  {
    id: 8,
    name: "Prof. David Park",
    role: "Technical Advisor",
    image: "/assets/team/david-park.jpg",
    bio: "Expert mentor guiding students through complex technical challenges and innovation.",
    category: "faculty",
    social: {
      twitter: "https://twitter.com/davidpark",
      linkedin: "https://linkedin.com/in/davidpark",
    },
  },
  {
    id: 9,
    name: "Dr. Michael Brown",
    role: "Research Advisor",
    image: "/assets/team/michael.jpg",
    bio: "Leading research initiatives and fostering academic excellence in hackathon projects.",
    category: "faculty",
    social: {
      twitter: "https://twitter.com/michaelbrown",
      linkedin: "https://linkedin.com/in/michaelbrown",
    },
  },
  {
    id: 10,
    name: "Prof. Lisa Chen",
    role: "Innovation Mentor",
    image: "/assets/team/lisa-chen.jpg",
    bio: "Inspiring creativity and innovation through hands-on mentorship and guidance.",
    category: "faculty",
    social: {
      twitter: "https://twitter.com/lisachen",
      linkedin: "https://linkedin.com/in/lisachen",
    },
  },
  {
    id: 11,
    name: "Dr. James Wilson",
    role: "Academic Director",
    image: "/assets/team/james.jpg",
    bio: "Overseeing academic standards and ensuring educational value in all hackathon activities.",
    category: "faculty",
    social: {
      twitter: "https://twitter.com/jameswilson",
      linkedin: "https://linkedin.com/in/jameswilson",
    },
  },
  {
    id: 12,
    name: "Prof. Rachel Green",
    role: "Student Affairs",
    image: "/assets/team/rachel.jpg",
    bio: "Supporting student development and ensuring a positive learning environment.",
    category: "faculty",
    social: {
      twitter: "https://twitter.com/rachelgreen",
      linkedin: "https://linkedin.com/in/rachelgreen",
    },
  },
  // Team Members (12)
  {
    id: 13,
    name: "Emma Thompson",
    role: "Marketing Lead",
    image: "/assets/team/emma.jpg",
    bio: "Storyteller extraordinaire who spreads the HACKWAVE message across the globe.",
    category: "team",
    social: {
      twitter: "https://twitter.com/emmathompson",
      linkedin: "https://linkedin.com/in/emmathompson",
    },
  },
  {
    id: 14,
    name: "Ryan Zhang",
    role: "Design Lead",
    image: "/assets/team/ryan.jpg",
    bio: "Creative genius behind HACKWAVE's stunning visual identity and user experience.",
    category: "team",
    social: {
      twitter: "https://twitter.com/ryanzhang",
      linkedin: "https://linkedin.com/in/ryanzhang",
    },
  },
  {
    id: 15,
    name: "Lisa Wang",
    role: "Operations Manager",
    image: "/assets/team/lisa.jpg",
    bio: "The mastermind behind the scenes, making sure everything runs like clockwork.",
    category: "team",
    social: {
      twitter: "https://twitter.com/lisawang",
      linkedin: "https://linkedin.com/in/lisawang",
    },
  },
  {
    id: 16,
    name: "Kevin Martinez",
    role: "Tech Lead",
    image: "/assets/team/kevin.jpg",
    bio: "Technical expert ensuring all systems run smoothly and efficiently.",
    category: "team",
    social: {
      twitter: "https://twitter.com/kevinmartinez",
      linkedin: "https://linkedin.com/in/kevinmartinez",
    },
  },
  {
    id: 17,
    name: "Anna Rodriguez",
    role: "Content Creator",
    image: "/assets/team/anna.jpg",
    bio: "Creating compelling content that tells the HACKWAVE story.",
    category: "team",
    social: {
      twitter: "https://twitter.com/annarodriguez",
      linkedin: "https://linkedin.com/in/annarodriguez",
    },
  },
  {
    id: 18,
    name: "Chris Taylor",
    role: "Developer",
    image: "/assets/team/chris.jpg",
    bio: "Building the digital infrastructure that powers HACKWAVE's platform.",
    category: "team",
    social: {
      twitter: "https://twitter.com/christaylor",
      linkedin: "https://linkedin.com/in/christaylor",
    },
  },
  {
    id: 19,
    name: "Maria Garcia",
    role: "Community Manager",
    image: "/assets/team/maria.jpg",
    bio: "Fostering connections and building a vibrant hacker community.",
    category: "team",
    social: {
      twitter: "https://twitter.com/mariagarcia",
      linkedin: "https://linkedin.com/in/mariagarcia",
    },
  },
  {
    id: 20,
    name: "Tom Anderson",
    role: "UX Designer",
    image: "/assets/team/tom.jpg",
    bio: "Crafting intuitive user experiences that make HACKWAVE accessible to all.",
    category: "team",
    social: {
      twitter: "https://twitter.com/tomanderson",
      linkedin: "https://linkedin.com/in/tomanderson",
    },
  },
  {
    id: 21,
    name: "Jessica Kim",
    role: "Data Analyst",
    image: "/assets/team/jessica.jpg",
    bio: "Turning data into insights to improve the HACKWAVE experience.",
    category: "team",
    social: {
      twitter: "https://twitter.com/jessicakim",
      linkedin: "https://linkedin.com/in/jessicakim",
    },
  },
  {
    id: 22,
    name: "Alex Rivera",
    role: "Security Specialist",
    image: "/assets/team/alex-rivera.jpg",
    bio: "Ensuring the safety and security of all HACKWAVE participants and systems.",
    category: "team",
    social: {
      twitter: "https://twitter.com/alexrivera",
      linkedin: "https://linkedin.com/in/alexrivera",
    },
  },
  {
    id: 23,
    name: "Sarah Johnson",
    role: "Event Coordinator",
    image: "/assets/team/sarah-j.jpg",
    bio: "Coordinating logistics and ensuring smooth event execution.",
    category: "team",
    social: {
      twitter: "https://twitter.com/sarahjohnson",
      linkedin: "https://linkedin.com/in/sarahjohnson",
    },
  },
  {
    id: 24,
    name: "Mike Davis",
    role: "Support Lead",
    image: "/assets/team/mike.jpg",
    bio: "Providing exceptional support to all HACKWAVE participants and partners.",
    category: "team",
    social: {
      twitter: "https://twitter.com/mikedavis",
      linkedin: "https://linkedin.com/in/mikedavis",
    },
  },
];

const getCategoryTitle = (category: string) => {
  switch (category) {
    case "organizer":
      return "Organizers";
    case "faculty":
      return "Faculty Coordinators";
    case "team":
      return "Team Members";
    default:
      return "Team";
  }
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case "organizer":
      return "bg-purple-500";
    case "faculty":
      return "bg-blue-500";
    case "team":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

interface TeamSectionProps {
  title: string;
  members: TeamMember[];
  gridCols: string;
  onMouseEnter: (id: number) => void;
  onMouseLeave: () => void;
}

const TeamSection: React.FC<TeamSectionProps> = ({
  title,
  members,
  gridCols,
  onMouseEnter,
  onMouseLeave,
}) => {
  const category = members[0]?.category || "team";

  return (
    <div className="mb-20">
      <div className="mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          {title}
        </h2>
        <div className={`w-24 h-1 ${getCategoryColor(category)} ml-1`}></div>
      </div>
      <div className={`grid ${gridCols} gap-6`}>
        {members.map((member) => (
          <TeamCard
            key={member.id}
            member={member}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          />
        ))}
      </div>
    </div>
  );
};

export default function TeamPage() {
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const organizers = teamMembers.filter(
    (member) => member.category === "organizer"
  );
  const faculty = teamMembers.filter((member) => member.category === "faculty");
  const team = teamMembers.filter((member) => member.category === "team");

  return (
    <div
      className="min-h-screen bg-[#FDF5ED] text-[#1f1f1f]"
      ref={containerRef}
    >
      {/* Hero Section */}
      <section className="relative w-full min-h-[60vh] flex flex-col justify-center items-center p-8">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-6">
            <VariableProximity
              label="Meet the Team"
              fromFontVariationSettings="'wght' 400"
              toFontVariationSettings="'wght' 900"
              containerRef={containerRef}
              radius={300}
              falloff="gaussian"
              className="text-6xl md:text-8xl text-[#e6d9cf] font-bold"
            />
          </h1>
          <p className="text-xl md:text-2xl text-[#556] max-w-2xl mx-auto leading-relaxed">
            The visionary minds behind HACKWAVE. We're a group of passionate
            students who believe that great ideas need time to evolve from
            concept to reality.
          </p>
        </div>
      </section>

      {/* Team Members Grid */}
      <div className="w-full p-8 pb-24 bg-[#141414]">
        <div className="max-w-7xl mx-auto">
          <TeamSection
            title={getCategoryTitle("organizer")}
            members={organizers}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
            onMouseEnter={setHoveredMember}
            onMouseLeave={() => setHoveredMember(null)}
          />

          <TeamSection
            title={getCategoryTitle("faculty")}
            members={faculty}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
            onMouseEnter={setHoveredMember}
            onMouseLeave={() => setHoveredMember(null)}
          />

          <TeamSection
            title={getCategoryTitle("team")}
            members={team}
            gridCols="grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4"
            onMouseEnter={setHoveredMember}
            onMouseLeave={() => setHoveredMember(null)}
          />
        </div>
      </div>

      {/* Call to Action Section */}
      <section className="w-full text-white py-24">
        <div className="max-w-4xl mx-auto text-center p-8">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            We're always looking for passionate individuals who share our vision
            of pushing the boundaries of what's possible in hackathons.
          </p>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-full transition-colors duration-300">
            Get in Touch
          </Button>
        </div>
      </section>
    </div>
  );
}
