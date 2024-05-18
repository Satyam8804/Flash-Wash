import React from "react";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";

const Feedback = ({ feedback }) => {
  console.log(feedback);
  return (
    <div className="w-[300px] mx-auto hover:transform hover:scale-105 transition-transform">
      <div className="bg-white shadow-lg p-4 rounded-lg border-b-4  border-gray-500">
        <div className=" flex items-center gap-4 border-b-2 pb-4">
          <img
            className="w-16 h-16 rounded-full "
            src={feedback?.user?.avatar}
            alt="Card"
          />
          <div className="flex flex-col items-start">
          <span>
            <strong>{feedback?.user?.fullName}</strong>
          </span>
          <span className="text-[10px] text-gray-400 font-bold">
            Posted on : {feedback?.updatedAt}
          </span>
          <Rating
            initialRating={feedback?.ratings}
            emptySymbol={<FaStar className="text-gray-400" size={20} />} // Empty star icon
            fullSymbol={<FaStar className="text-yellow-500" size={20} />}
            
          />
          </div>
        </div>
        <div className="p-4 flex flex-col justify-between gap-4">
          <span className="text-gray-600 text-left">
            <FaQuoteLeft size={10} color="#a9f5e2" />
            {feedback?.comment} 
            <FaQuoteRight size={10} color="#a9f5e2" className="float-right" />
          </span>
         
        </div>
      </div>
    </div>
  );
};

export default Feedback;
