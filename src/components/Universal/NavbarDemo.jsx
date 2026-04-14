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
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";

import { useState } from "react";
import { Button, Textarea } from "@chakra-ui/react";
import Form from "../home/Form";
export function NavbarDemo() {
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/about" },
    { name: "Contact", link: "/contact" },
    // { name: "Product", link: "/product" },

    { name: "Patient Inquiry", link: "/patient-conditions-inquiry" },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  function book() {
    setOpen(true);
  }

  function handleSubmit(e) {
    e.preventDefault();
    alert("Form submitted successfully!");
    setOpen(false);
  }

  return (
    <div className="relative w-full">
      {/* ================= NAVBAR ================= */}
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} className="text-white font-bold text-lg" />
          <NavbarButton onClick={book} variant="primary" className="!bg-yellow-400 !text-black">
            Book a Consultant
          </NavbarButton>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            className="bg-gradient-to-b from-[#061411] via-[#0b2620] to-[#0f3d2e] backdrop-blur-sm"
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            <div className="px-4 py-6 space-y-3">
              {navItems.map((item, idx) => (
                <a
                  key={idx}
                  href={item.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-6 py-4 text-center font-bold text-base text-slate-100 bg-gradient-to-r from-[#4fb9a0] to-[#35b6b4] rounded-xl shadow-lg hover:shadow-xl hover:from-[#5cc9af] hover:to-[#45c6c4] transition-all duration-300 hover:scale-105 active:scale-95 border border-[#4fb9a0]/30"
                >
                  {item.name}
                </a>
              ))}

              <div className="pt-4 mt-4 border-t border-[#4fb9a0]/20">
                <NavbarButton
                  variant="primary"
                  className="w-full !bg-yellow-400 !text-slate-900 !font-bold hover:bg-yellow-300 transition-all duration-300 shadow-lg hover:shadow-xl"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    setOpen(true);
                  }}
                >
                  Book a Consultation
                </NavbarButton>
              </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* ================= POPUP FORM ================= */}
      <Form open={open} setOpen={setOpen} />
    </div>
  );
}
