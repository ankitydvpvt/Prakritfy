"use client";

import Tree_section from "@/components/home/Tree_section";
import Footer from "@/components/Universal/Footer";
import { NavbarDemo } from "@/components/Universal/NavbarDemo";
import SplashScreen from "@/components/Universal/SplashScreen";

import { useState } from "react";


import { Box } from "@chakra-ui/react";

export default function Home() {
   const [showSplash, setShowSplash] = useState(true);
  return (

    <>
  {showSplash && (
        <SplashScreen onFinish={() => setShowSplash(false)} />
      )}
       {!showSplash && (
    <Box
      w="100%"
      minH="100vh"
      bgGradient="linear(to-r,  #026aa2, #35b6b4)"
    >
      <NavbarDemo/>
      


      {/* Main Content */}
      <Tree_section />

      {/* Footer */}
      <Footer  />
    </Box>
       )}
    </>
  );
}
