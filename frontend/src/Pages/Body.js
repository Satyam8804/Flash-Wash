import React from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./../components/Navbar";
import Description from "../components/Cards/Description";
import { Description_Data } from "../utils/DescriptionData";
import Footer from "./Footer";

const Body = () => {
  const navigate = useNavigate();
  return (
    <div>
      <section className="headerSection bg-gray-900 text-white">
        <Navbar />
        <div className="headerDiv mx-auto text-center py-16 w-full flex flex-col gap-8 mt-12">
          <div className="">
            <h1>Unparalleled Cleanliness Guaranteed!</h1>
            <p className="mt-4 text-lg">
              Where Every Drop Counts for Perfection
            </p>
          </div>
          <Link
            className="btn headerBtn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2"
            to="/service"
            onClick={() => {
              navigate("/service");
              window.location.reload();
            }}
          >
            Book Now
          </Link>
        </div>
      </section>
      {/* Description Section Starts */}
      <section id="descriptionSection" class="p-8">
        <h1 class="text-3xl font-bold mb-8">How It Works!</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          <div class="p-4">
            <Description {...Description_Data[0]} />
          </div>
          <div class="p-4">
            <Description {...Description_Data[1]} />
          </div>
          <div class="p-4">
            <Description {...Description_Data[2]} />
          </div>
        </div>
      </section>
      {/* Description Section Ends */}
      {/* Banner Section Starts */}
      <section id="bannerSection">
        <div className="bannerDiv mx-auto text-center flex flex-col gap-8">
          <div>
            <h1>What Are You Waiting For?</h1>
            <p>Give Your Car The Wash, It Deserves!</p>
          </div>
          <Link
            to="/service"
            onClick={() => {
              navigate("/service");
              window.location.reload();
            }}
          >
            <button className="btn headerBtn text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 ">
              Book Now
            </button>
          </Link>
        </div>
      </section>
      {/* Banner Section Ends */}
      <section id="descriptionSection" class="p-8">
        <h1 class="text-3xl font-bold mb-8">Our Happy Clients!</h1>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
          <div class="p-4">
            <Description {...Description_Data[0]} />
          </div>
          <div class="p-4">
            <Description {...Description_Data[1]} />
          </div>
          <div class="p-4">
            <Description {...Description_Data[2]} />
          </div>
          <div class="p-4">
            <Description {...Description_Data[2]} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Body;
