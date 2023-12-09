import React from "react";

function Intro() {
  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center">
      <div className="lg:grid lg:grid-cols-2 max-w-6xl mx-auto p-8 lg:p-16 lg:gap-8">
        <div className="lg:order-2 mt-4 lg:mt-0"> {/* Adjusted the top margin */}
          <img
            className="w-full h-auto lg:h-96 object-cover rounded-xl shadow-2xl"
            src="https://images.pexels.com/photos/5676744/pexels-photo-5676744.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt="Ad- woman on a beach"
          />
        </div>
        <div className="lg:order-1 mt-8 lg:mt-0">
          <h1 className="font-bold text-3xl lg:text-5xl text-gray-800 mb-4">
            Elevate Your Project with Pitch Crest
          </h1>
          <p className="text-lg lg:text-xl text-gray-600 leading-7">
            Pitch Crest is your gateway to revolutionizing project pitches.
            Connect with visionary creators and astute investors. Together, we
            drive the growth of groundbreaking projects that shape the future.
          </p>
          <div className="flex items-center justify-center mt-6">
            <button className="bg-blue-500 p-4 lg:p-3 rounded-full text-white font-bold hover:bg-blue-700">
              Get Started Today!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Intro;
