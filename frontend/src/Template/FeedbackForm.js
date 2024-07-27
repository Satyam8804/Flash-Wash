import React, { useState } from "react";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import { toast } from 'react-hot-toast';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    ratings: 0, // Assuming the initial rating is 0
    comment: "",
  });

  const data = JSON.parse(localStorage.getItem("currentUser"));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRatingChange = (value) => {
    setFormData({
      ...formData,
      ratings: value,
    });
  };

  const accessToken = localStorage.getItem("accessToken");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://flash-wash-l6v3.onrender.com/api/v1/users/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(accessToken)}`,
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data); // Handle response from the backend
        toast.success(data?.message);
      } else {
        const errorData = await response.json();
        toast.error(errorData?.message);
      }
    } catch (error) {
      console.error("Error posting feedback:", error);
      toast.error("Error posting feedback");
    }
  };

  return (
    <div className="w-full max-w-md p-6 md:p-8 bg-white rounded-lg shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-black">Give us your feedback</h2>
        <p className="text-gray-500 dark:text-gray-400">
          We value your opinion and want to improve our service.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-semibold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={data?.user?.fullName}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2 ">
            <label htmlFor="email" className="text-sm font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={data?.user?.email}
              disabled
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="space-y-2 flex items-center justify-center gap-4">
          <label htmlFor="ratings" className="text-sm font-semibold">
            Rating
          </label>
          <Rating
            initialRating={formData.ratings}
            onChange={handleRatingChange}
            emptySymbol={<FaStar className="text-gray-400" size={30} />} // Empty star icon
            fullSymbol={<FaStar className="text-yellow-500" size={30} />}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="comment" className="text-sm font-semibold">
            Comment
          </label>
          <textarea
            id="comment"
            name="comment"
            placeholder="Share your thoughts..."
            value={formData.comment}
            onChange={handleChange}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 resize-none min-h-[100px]"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
}

export default FeedbackForm;
