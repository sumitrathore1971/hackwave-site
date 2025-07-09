import React from "react";

const Nav = () => (
  <nav className="hidden md:fixed w-full p-4 md:flex gap-8 z-30 font-archivo">
    <div className="links flex-1 flex justify-around text-sm items-center gap-8">
      <a href="#" className="no-underline uppercase text-black">
        Index
      </a>
      <a href="#" className="no-underline uppercase text-black">
        Work
      </a>
    </div>
    <div className="nav-logo flex-1 text-center flex justify-center">
      <a
        href="#"
        className="font-black text-4xl leading-none font-clash text-black"
      >
        Echelon
      </a>
      <a
        href="#"
        className="font-bold text-4xl leading-none font-clash text-black"
      >
        Dev
      </a>
    </div>
    <div className="links flex-1 flex justify-around items-center gap-8">
      <a href="#" className="no-underline uppercase text-black">
        About
      </a>
      <a href="#" className="font-sans no-underline uppercase text-black">
        Contact
      </a>
    </div>
  </nav>
);

export default Nav;
