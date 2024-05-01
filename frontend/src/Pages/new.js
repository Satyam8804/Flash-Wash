import React from "react";
import Navbar from "../components/Navbar";
// import TeamMember from "./TeamMember"; // Assuming TeamMember component

const AboutUs = () => {
  return (
    <div id="aboutDiv" className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <Navbar />
      <div className="container mx-auto px-4 md:px-6 py-16">
        <h1 className="text-4xl font-bold text-center mb-8">About Flash Wash</h1>
        <div className="grid sm:grid-cols-2 gap-8">
          <div className="flex flex-col space-y-6">
            <p className="text-gray-700 dark:text-gray-200 text-xl leading-relaxed">
              Flash Wash is a leading cleaning service provider dedicated to ensuring your spaces are spotless and fresh. We go beyond just cleaning surfaces; we create a clean and healthy environment for you and your loved ones.
            </p>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-md transition duration-300 ease-in-out">
              Get a Free Quote
            </button>
          </div>
          <div className="hidden sm:block">
            <img
              src="https://wallpapercave.com/wp/wp7395272.jpg" // Replace with the path to your image
              alt="Flash Wash Team Cleaning"
              className="rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
              Our mission is to provide top-notch cleaning services that exceed our customers' expectations, creating a clean and healthy environment for all.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
            <p className="text-gray-700 dark:text-gray-200 text-base leading-relaxed">
              We envision a world where cleanliness is not just a choice but a way of life, promoting well-being and happiness in every space we touch.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Our Values</h2>
            <ul className="list-disc space-y-2 pl-4">
              <li className="text-gray-700 dark:text-gray-200 text-base">
                Quality: We are committed to delivering the highest quality cleaning services to our clients.
              </li>
              <li className="text-gray-700 dark:text-gray-200 text-base">
                Reliability: Our team is reliable and dedicated to ensuring your satisfaction with our services.
              </li>
              <li className="text-gray-700 dark:text-gray-200 text-base">
                Customer Satisfaction: Customer satisfaction is our top priority, and we strive to exceed expectations.
              </li>
              <li className="text-gray-700 dark:text-gray-200 text-base">
                Innovation: We continuously innovate to provide cutting-edge cleaning solutions for our clients.
              </li>
            </ul>
          </div>
        </div>
        <h2 className="text-2xl font-semibold text-center mt-16 mb-8">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Replace TeamMember components with actual team member data */}
          {/* <TeamMember name="John Doe" title="Head of Cleaning Crew" />
          <TeamMember name="Jane Smith" title="Cleaning Specialist" /> */}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
