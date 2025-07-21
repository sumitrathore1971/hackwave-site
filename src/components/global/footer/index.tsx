"use client";

import Link from "next/link";
import { Twitter, Instagram, Linkedin } from "lucide-react";
import { Card } from "@/components/ui/card";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Team", href: "/team" },
  { name: "Timeline", href: "/timeline" },
  { name: "FAQ", href: "/#faq" },
];

export default function Footer() {
  return (
    <div className="w-full flex flex-col justify-center bg-[#141414] py-14 px-4 items-center border-[#222]">
      <Card className="w-full max-w-5xl bg-[#faffa5] border border-[#e5e5e5] rounded-2xl flex flex-col md:flex-row items-center md:items-start justify-between gap-12 md:gap-12 p-8">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start gap-4 w-full md:w-1/3">
          <div className="flex items-center gap-3">
            <img
              src="/loader-imgs/hackwave.svg"
              alt="Hackwave Logo"
              className="w-14 h-14 object-contain"
            />
          </div>
          <p className="text-[#222] text-base max-w-xs text-center md:text-left font-semibold">
            The ultimate student hackathon experience. Code, create, and connect
            with the best minds in India.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex flex-col items-center md:items-start gap-2 w-full md:w-1/3">
          <span className="inline-block bg-[#141414] text-[#fcf2e8] px-3 py-1 rounded-full text-sm font-semibold mb-2">
            Navigate
          </span>
          <ul className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="text-[#141414] hover:text-[#feaac0] transition-colors font-bold text-base rounded px-2 py-1"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Socials */}
        <div className="flex flex-col items-center md:items-end gap-2 w-full md:w-1/3">
          <span className="inline-block bg-[#141414] text-[#fcf2e8] px-3 py-1 rounded-full text-sm font-semibold mb-2">
            Connect
          </span>
          <div className="flex gap-4 mt-1">
            <a
              href="https://twitter.com/hackwaveindia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#feaac0] hover:bg-[#fec4dc] transition-colors rounded-full p-2 flex items-center justify-center"
              aria-label="Twitter"
            >
              <Twitter className="w-6 h-6 text-[#141414]" />
            </a>
            <a
              href="https://instagram.com/hackwaveindia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#feaac0] hover:bg-[#fec4dc] transition-colors rounded-full p-2 flex items-center justify-center"
              aria-label="Instagram"
            >
              <Instagram className="w-6 h-6 text-[#141414]" />
            </a>
            <a
              href="https://linkedin.com/company/hackwaveindia"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#feaac0] hover:bg-[#fec4dc] transition-colors rounded-full p-2 flex items-center justify-center"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 text-[#141414]" />
            </a>
          </div>
        </div>
      </Card>
      <div className="w-full text-center text-[#666] text-xs mt-8">
        &copy; {new Date().getFullYear()} Hackwave. All rights reserved.
      </div>
    </div>
  );
}
