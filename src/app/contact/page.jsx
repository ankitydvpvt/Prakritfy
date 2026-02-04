import React from "react";

const Page = () => {
  return (
    <div className="bg-[#163796] min-h-screen w-full flex flex-col">
      
      {/* Top Heading */}
      <div
        id="contact"
        className="text-center font-extrabold text-white text-5xl sm:text-6xl md:text-7xl py-10"
      >
        CONTACT US
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row flex-1 items-center justify-center px-6 md:px-16 gap-10">
        
        {/* Left Image Section */}
        <div className="w-full md:w-[40%] flex justify-center">
          <img
            src="https://img.freepik.com/free-vector/flat-design-illustration-customer-support_23-2148887720.jpg?semt=ais_hybrid&w=740&q=80"
            alt="Customer Support Illustration"
            className="max-w-full h-auto rounded-xl shadow-lg"
          />
        </div>

        {/* Right Content Section */}
        <div className="w-full md:w-[60%] flex flex-col items-center text-center text-white">
          {/* Sub Heading */}
          <h2 className="font-bold text-lg sm:text-4xl italic mb-6">
            Feel Free to Contact
          </h2>
          

          {/* Description */}
          <div className="max-w-xl font-medium text-lg leading-relaxed space-y-4">
            <p>
              Feel free to contact us — your health and well-being are our top
              priority.
            </p>
            <p>
              We’re here to listen, care, and guide you. Reach out anytime with
              confidence.
            </p>
            <p>
              Have questions about your health? We’re just a message away.
            </p>
          </div>

          {/* Contact Details Card */}
          <div className="mt-8 bg-white text-[#163796] rounded-xl shadow-lg p-6 w-full max-w-md text-left">
            <p className="font-semibold text-lg mb-2">
              📞 Phone: <span className="font-normal">***********</span>
            </p>
            <p className="font-semibold text-lg mb-2">
              ✉️ Email: <span className="font-normal">xxxxxx@gmail.com</span>
            </p>
            <p className="font-semibold text-lg">
              📍 Address:{" "}
              <span className="font-normal">
                Hospital Health Care **********
              </span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Page;
