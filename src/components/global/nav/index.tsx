import React from "react";
import Link from "next/link";
import Copy from "@/components/ui/textAnimation/Copy";
import { Button } from "@/components/ui/button";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="fixed top-0 left-0 w-screen px-[3.5em] py-[2em] flex justify-between z-20 mix-blend-difference">
      <div className="flex justify-between items-center w-full">
        <Copy animateOnScroll={false} delay={0.2}>
          <Link
            href="/"
            className="text-[#fcf2e8] text-2xl font-bold flex items-center cursor-pointer"
          >
            HACKWAVE
          </Link>
        </Copy>

        <div className="flex gap-10 flex-row text-[#fcf2e8] font-medium items-center">
          <Copy animateOnScroll={false} delay={0.3}>
            <Link
              href="/"
              className="relative group cursor-pointer mix-blend-difference text-[#fcf2e8] no-underline font-medium"
            >
              Home
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#fcf2e8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </Copy>
          <Copy animateOnScroll={false} delay={0.4}>
            <Link
              href="/projects"
              className="relative group cursor-pointer mix-blend-difference text-[#fcf2e8] no-underline font-medium"
            >
              Projects
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#fcf2e8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </Copy>
          <Copy animateOnScroll={false} delay={0.5}>
            <Link
              href="/about"
              className="relative group cursor-pointer mix-blend-difference text-[#fcf2e8] no-underline font-medium"
            >
              About
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#fcf2e8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </Copy>
          <Copy animateOnScroll={false} delay={0.6}>
            <Link
              href="/lab"
              className="relative group cursor-pointer mix-blend-difference text-[#fcf2e8] no-underline font-medium"
            >
              Lab
              <span className="absolute left-0 -bottom-1 w-full h-0.5 bg-[#fcf2e8] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          </Copy>
        </div>
        <div className="flex flex-row gap-2">
          <Button className="font-medium cursor-pointer px-4 py-2 bg-transparent border border-[#fcf2e8] text-[#fcf2e8] rounded transition-all duration-300 hover:bg-[#fcf2e8] hover:text-[#141414]">
            Join Now
          </Button>
          <Button className="font-medium cursor-pointer px-4 py-2 bg-transparent border border-[#fcf2e8] text-[#fcf2e8] rounded transition-all duration-300 hover:bg-[#fcf2e8] hover:text-[#141414]">
            Let's talk
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
