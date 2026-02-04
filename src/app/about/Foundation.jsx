import React from "react";
import DotLottiePlayer from "@/components/ui/DotLottiePlayer";
const foundation = () => {
  return (
    <div className="p-15">
      <div className="text-5xl font-bold flex items-center justify-center ">
        Our Foundation
      </div>
      <section className="flex items-center justify-center h-35">
        <DotLottiePlayer
          src="https://lottie.host/0205e4fd-8b55-4084-9263-a8720fe43f02/nDCYh73mTf.lottie"
          className="w-80 h-80"
        />
      </section>
      <div className="text-xl p-5 sm:w-1/2  mx-auto font-bold flex items-center justify-center bg-amber-400 rounded-2xl">
        We are on a mission to empower every individual to take charge of their
        own health and wellness. To live a medicine- and illness-free life,
        where chronic diseases are eliminated.
      </div>
      
    </div>
  );
};

export default foundation;
