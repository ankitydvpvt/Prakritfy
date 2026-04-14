"use client";

import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
} from "@/components/ui/resizable-navbar";

import { useState } from "react";
import Form from "../home/Form";

export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    { name: "Patient Inquiry", link: "/patient-conditions-inquiry" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  function book() {
    setOpen(true);
  }

  return (
    <div className="relative w-full">
      {/* NAVBAR */}
      <Navbar>
        {/* Desktop */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} className="text-white font-bold text-lg" />
          <NavbarButton
            onClick={book}
            variant="primary"
            className="!bg-yellow-400 !text-black"
          >
            Book a Consultant
          </NavbarButton>
        </NavBody>

        {/* MOBILE */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          {/* ✅ COMPACT FULL-WIDTH MENU */}
          {isMobileMenuOpen && (
            <div className="fixed left-0 right-0 top-16 w-screen bg-white z-50 shadow-lg">
              
              {/* Menu Items */}
              <div className="flex flex-col">
                {navItems.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="!px-4 !py-3 !text-gray-900 !text-sm !font-semibold hover:bg-gray-100"
                  >
                    {item.name}
                  </a>
                ))}
              </div>

              {/* Button */}
              <div className="px-4 py-4">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setOpen(true);
                  }}
                  className="w-full !bg-yellow-400 !text-black !font-bold !py-3 !rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300"
                >
                  Book a Consultant
                </button>
              </div>

            </div>
          )}
        </MobileNav>
      </Navbar>

      {/* FORM */}
      <Form open={open} setOpen={setOpen} />
    </div>
  );
}