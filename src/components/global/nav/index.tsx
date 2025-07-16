import React, { useState } from "react";
import Link from "next/link";
import Copy from "@/components/ui/textAnimation/Copy";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props = {};

const Navbar = (props: Props) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-screen px-4 md:px-[3.5em] py-4 md:py-[2em] flex justify-between z-20 mix-blend-difference">
      <div className="flex justify-between items-center w-full">
        {/* Logo - Left side */}
        <Copy animateOnScroll={false} delay={0.2}>
          <Link
            href="/"
            className="text-[#fcf2e8] text-xl md:text-2xl font-bold flex items-center cursor-pointer"
            onClick={closeMenu}
          >
            HACKWAVE
          </Link>
        </Copy>

        {/* Right Side - Join Now Button + Hamburger (Desktop & Mobile) */}
        <div className="flex items-center gap-3 ">
          {/* Join Now Button */}
          <Button className="font-semibold cursor-pointer px-4 md:px-6 py-2 md:py-3 bg-[#fcf2e8]/10 hover:bg-[#fcf2e8]/20 border border-[#fcf2e8]/20 text-[#fcf2e8] rounded-xl text-sm md:text-base transition-all duration-150 hover:scale-105 transform mix-blend-normal">
            Join Now
          </Button>

          {/* Hamburger Menu with Dropdown */}
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <button
                className="flex flex-col justify-center items-center w-8 h-8 cursor-pointer z-30 relative"
                aria-label="Toggle menu"
              >
                <span
                  className={`w-6 h-0.5 bg-[#fcf2e8] transition-all duration-150 ease-in-out ${
                    isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-[#fcf2e8] transition-all duration-150 ease-in-out mt-1 ${
                    isMenuOpen ? "opacity-0 scale-x-0" : ""
                  }`}
                />
                <span
                  className={`w-6 h-0.5 bg-[#fcf2e8] transition-all duration-150 ease-in-out mt-1 ${
                    isMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
                  }`}
                />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent
              className="w-72 bg-[#141414] border-[#fcf2e8]/20 text-[#fcf2e8] mr-14 rounded-2xl p-6 shadow-2xl !animate-none data-[state=open]:!animate-none data-[state=closed]:!animate-none data-[side=bottom]:!slide-in-from-top-2 data-[side=left]:!slide-in-from-right-2 data-[side=right]:!slide-in-from-left-2 data-[side=top]:!slide-in-from-bottom-2"
              sideOffset={8}
            >
              {/* Navigation Links */}
              <div className="space-y-3 mb-6">
                <Copy animateOnScroll={false} delay={0.1}>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/"
                      className="text-lg font-semibold hover:text-[#fcf2e8]/80 transition-all duration-150 py-3 px-4 rounded-xl hover:bg-[#fcf2e8]/10 cursor-pointer"
                      onClick={closeMenu}
                    >
                      Home
                    </Link>
                  </DropdownMenuItem>
                </Copy>

                <Copy animateOnScroll={false} delay={0.2}>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/projects"
                      className="text-lg font-semibold hover:text-[#fcf2e8]/80 transition-all duration-150 py-3 px-4 rounded-xl hover:bg-[#fcf2e8]/10 cursor-pointer"
                      onClick={closeMenu}
                    >
                      Projects
                    </Link>
                  </DropdownMenuItem>
                </Copy>

                <Copy animateOnScroll={false} delay={0.3}>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/about"
                      className="text-lg font-semibold hover:text-[#fcf2e8]/80 transition-all duration-150 py-3 px-4 rounded-xl hover:bg-[#fcf2e8]/10 cursor-pointer"
                      onClick={closeMenu}
                    >
                      About
                    </Link>
                  </DropdownMenuItem>
                </Copy>

                <Copy animateOnScroll={false} delay={0.4}>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/lab"
                      className="text-lg font-semibold hover:text-[#fcf2e8]/80 transition-all duration-150 py-3 px-4 rounded-xl hover:bg-[#fcf2e8]/10 cursor-pointer"
                      onClick={closeMenu}
                    >
                      Lab
                    </Link>
                  </DropdownMenuItem>
                </Copy>
              </div>

              <DropdownMenuSeparator className="bg-[#fcf2e8]/20 mb-6" />

              {/* Social Icons Row */}
              <div className="flex justify-center space-x-4">
                <Copy animateOnScroll={false} delay={0.5}>
                  <a
                    href="https://twitter.com/hackwave"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#fcf2e8]/10 hover:bg-[#fcf2e8]/20 transition-all duration-150 rounded-full flex items-center justify-center text-[#fcf2e8] hover:scale-110 transform"
                    onClick={closeMenu}
                    aria-label="Twitter"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </Copy>

                <Copy animateOnScroll={false} delay={0.6}>
                  <a
                    href="https://instagram.com/hackwave"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#fcf2e8]/10 hover:bg-[#fcf2e8]/20 transition-all duration-150 rounded-full flex items-center justify-center text-[#fcf2e8] hover:scale-110 transform"
                    onClick={closeMenu}
                    aria-label="Instagram"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.718-1.297c-.875.807-2.026 1.297-3.323 1.297s-2.448-.49-3.323-1.297c-.807-.875-1.297-2.026-1.297-3.323s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323z" />
                    </svg>
                  </a>
                </Copy>

                <Copy animateOnScroll={false} delay={0.7}>
                  <a
                    href="https://linkedin.com/company/hackwave"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-[#fcf2e8]/10 hover:bg-[#fcf2e8]/20 transition-all duration-150 rounded-full flex items-center justify-center text-[#fcf2e8] hover:scale-110 transform"
                    onClick={closeMenu}
                    aria-label="LinkedIn"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                </Copy>

                <Copy animateOnScroll={false} delay={0.8}>
                  <a
                    href="mailto:hello@hackwave.com"
                    className="w-10 h-10 bg-[#fcf2e8]/10 hover:bg-[#fcf2e8]/20 transition-all duration-150 rounded-full flex items-center justify-center text-[#fcf2e8] hover:scale-110 transform"
                    onClick={closeMenu}
                    aria-label="Email"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </a>
                </Copy>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
