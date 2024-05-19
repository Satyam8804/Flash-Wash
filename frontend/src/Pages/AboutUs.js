import React from "react";
import Navbar from "../components/Navbar";
import MainCarImg from '../images/maincarimg.jpg'
import carImg from '../images/imgcar.jpg'
import carimg2 from '../images/carimg2.jpg'
import carimg3 from '../images/carimg3.jpg'

const AboutUs = () => {
  return (
    <div id="aboutDiv" className="bg-gray-100 dark:bg-gray">
      <Navbar />
      <div className="container mx-auto py-12 px-4 md:px-6 ">
        {/* About Us Details and Image */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* About Us Details */}
          <div>
            <h1 className="mb-6 text-3xl font-extrabold text-gray-500 dark:text-white md:text-5xl lg:text-5xl">
              <span className="text-transparent bg-clip-text bg-white">
                About Us
              </span>
            </h1>
            <p className="text-gray-200 dark:text-gray-200 text-left leading-relaxed lg:text-xl">
              Welcome to Flash Wash, your trusted partner for exceptional
              cleaning services. We take pride in our work and are dedicated to
              providing you with a clean and healthy environment. Our team of
              experienced professionals uses state-of-the-art equipment and
              eco-friendly cleaning products to ensure your space is not only
              clean but also safe for you, your family, or your employees.
            </p>
          </div>

          {/* Image */}
          <div className="text-center border-4">
            <img
              src={MainCarImg}
              alt="Flash Wash"
              className="rounded-lg shadow-md mx-auto h-100 w-100 object-cover"
            />
          </div>
        </div>

        <hr className="mt-16"></hr>
        {/* Mission, Vision, and Values Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-8 mt-20">
          {/* Mission Card */}
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-6">
            <img
              src={carImg}
              alt="Flash Wash Mission"
              className="mx-auto mb-4 object-cover"
              style={{ height: "250px", width: "300px" }}
            />
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-200 ">
              Our Mission
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-left leading-relaxed">
              Our mission is to provide top-notch cleaning services that exceed
              our customers' expectations, creating a clean and healthy
              environment for all.
            </p>
          </div>

          {/* Vision Card */}
          <div className="rounded-lg shadow-md bg-white p-6">
            <img
              src={carimg2}
              alt="Flash Wash Vision"
              className="mx-auto mb-4 object-cover"
              style={{ height: "250px", width: "300px" }}
            />
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-200">
              Our Vision
            </h2>
            <p className="text-gray-700 dark:text-gray-200 text-left leading-relaxed">
              We envision a world where cleanliness is not just a choice but a
              way of life, promoting well-being and happiness in every space we
              touch.
            </p>
          </div>

          {/* Values Card */}
          <div className="rounded-lg shadow-md bg-white p-6">
            <img
              src={carimg3}
              alt="Flash Wash Values"
              className="mx-auto mb-4 object-cover"
              style={{ height: "250px", width: "300px" }}
            />
            <h2 className="text-xl font-semibold text-center mb-2 text-gray-800 dark:text-gray-200">
              Our Values
            </h2>
            <ul className="list-disc space-y-2 pl-4 text-gray-700 dark:text-gray-200 text-left leading-relaxed">
              Quality: We are committed to delivering the highest quality
              cleaning services to our clients.
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
