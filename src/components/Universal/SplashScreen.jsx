"use client";
import { useEffect } from "react";

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish();
    }, 2500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-r from-[#026aa2] to-[#35b6b4]">
      <img
        src="/Final.png"
        alt="Splash"
        className="w-1/3 h-1/3 rounded-full object-cover animate-splash ring-4 ring-white shadow-[0_0_40px_rgba(255,255,255,0.7)]"
      />
    </div>
  );
}
