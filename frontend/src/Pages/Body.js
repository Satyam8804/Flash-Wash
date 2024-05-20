import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "./../components/Navbar";
import Description from "../components/Cards/Description";
import { Description_Data } from "../utils/DescriptionData";
import Footer from "./Footer";
import chat_bot from "../images/chat_bot.png";
import ChatBot from "../Chatbot/ChatBot";
import Feedback from "../components/Cards/Feedback";

const Body = () => {
  const navigate = useNavigate();
  const [chatbotVisible , setChatbotVisible] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch("https://flash-wash-l6v3.onrender.com/api/v1/users/getAllFeedbacks");
        if (!response.ok) {
          throw new Error("Failed to fetch feedbacks");
        }
        const data = await response.json();
        setFeedbacks(data.data);
        console.log(data.data)
      } catch (error) {
        console.error("Error fetching feedbacks:", error.message);
        // Handle error, show error message to the user, etc.
      }
    };

    fetchFeedbacks();
  }, []);

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
      <section id="descriptionSection" className="p-8 bg-gray-200">
        <h1 class="text-4xl font-bold mb-8"><u>Our Happy Clients!</u></h1>
        <div class="flex overflow-x-scroll p-4 scrollbar justify-items-start max-w-[100vw] gap-4">
          {
            feedbacks && feedbacks.map((feedback)=>(
              <Feedback feedback={feedback} key={feedback?._id}/>
            ))
          }
        </div>
      </section>
      <div className="fixed flex flex-row bottom-12 right-8">
        {
          chatbotVisible && 
          <div className="">
            <ChatBot/>
          </div>
        }
        <img src={chat_bot} alt="chat-bot" className="relative h-14 w-14 bounce-image cursor-pointer" onClick={()=>setChatbotVisible(!chatbotVisible)}/>
      </div>
      
    </div>
  );
};
export default Body;
