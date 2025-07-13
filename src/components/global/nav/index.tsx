import React, { useState } from "react";
import Link from "next/link";
import Copy from "@/components/ui/textAnimation/Copy";
import { Button } from "@/components/ui/button";

type Props = {};

const Navbar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-screen px-4 md:px-[3.5em] py-4 md:py-[2em] flex justify-between z-20 mix-blend-difference">
      <div className="flex justify-between items-center w-full">
        <Copy animateOnScroll={false} delay={0.2}>
          <Link
            href="/"
            className="text-[#fcf2e8] text-xl md:text-2xl font-bold flex items-center cursor-pointer"
            onClick={closeMenu}
          >
            HACKWAVE
          </Link>
        </Copy>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 lg:gap-10 flex-row text-[#fcf2e8] font-medium items-center">
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex flex-row gap-2">
          <Button className="font-medium cursor-pointer px-4 py-2 bg-transparent border border-[#fcf2e8] text-[#fcf2e8] rounded transition-all duration-300 hover:bg-[#fcf2e8] hover:text-[#141414]">
            Join Now
          </Button>
          <Button className="font-medium cursor-pointer px-4 py-2 bg-transparent border border-[#fcf2e8] text-[#fcf2e8] rounded transition-all duration-300 hover:bg-[#fcf2e8] hover:text-[#141414]">
            Let's talk
          </Button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          onClick={toggleMenu}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 cursor-pointer z-30"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-[#fcf2e8] transition-all duration-300 ${
              isMenuOpen ? "rotate-45 translate-y-1.5" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#fcf2e8] transition-all duration-300 mt-1 ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-[#fcf2e8] transition-all duration-300 mt-1 ${
              isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-90 z-20 transition-opacity duration-300 ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={closeMenu}
      />

      {/* Mobile Menu Content */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-[#141414] z-30 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-8">
          {/* Close button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={closeMenu}
              className="text-[#fcf2e8] text-2xl font-bold"
              aria-label="Close menu"
            >
              ×
            </button>
          </div>

          {/* Mobile Navigation Links */}
          <div className="flex flex-col space-y-6 mb-8">
            <Copy animateOnScroll={false} delay={0.1}>
              <Link
                href="/"
                className="text-[#fcf2e8] text-2xl font-medium hover:text-[#fcf2e8]/80 transition-colors duration-300"
                onClick={closeMenu}
              >
                Home
              </Link>
            </Copy>
            <Copy animateOnScroll={false} delay={0.2}>
              <Link
                href="/projects"
                className="text-[#fcf2e8] text-2xl font-medium hover:text-[#fcf2e8]/80 transition-colors duration-300"
                onClick={closeMenu}
              >
                Projects
              </Link>
            </Copy>
            <Copy animateOnScroll={false} delay={0.3}>
              <Link
                href="/about"
                className="text-[#fcf2e8] text-2xl font-medium hover:text-[#fcf2e8]/80 transition-colors duration-300"
                onClick={closeMenu}
              >
                About
              </Link>
            </Copy>
            <Copy animateOnScroll={false} delay={0.4}>
              <Link
                href="/lab"
                className="text-[#fcf2e8] text-2xl font-medium hover:text-[#fcf2e8]/80 transition-colors duration-300"
                onClick={closeMenu}
              >
                Lab
              </Link>
            </Copy>
          </div>

          {/* Mobile Buttons */}
          <div className="flex flex-col space-y-4 mt-auto">
            <Button
              className="font-medium cursor-pointer px-6 py-3 bg-transparent border border-[#fcf2e8] text-[#fcf2e8] rounded transition-all duration-300 hover:bg-[#fcf2e8] hover:text-[#141414] text-lg"
              onClick={closeMenu}
            >
              Join Now
            </Button>
            <Button
              className="font-medium cursor-pointer px-6 py-3 bg-transparent border border-[#fcf2e8] text-[#fcf2e8] rounded transition-all duration-300 hover:bg-[#fcf2e8] hover:text-[#141414] text-lg"
              onClick={closeMenu}
            >
              Let's talk
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
