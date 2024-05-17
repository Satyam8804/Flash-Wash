import React from "react";
import { Link } from "react-router-dom";

const Description = (props) => {
  return (
      <div className="w-auto mx-auto">
        <div className="bg-white shadow-md overflow-hidden">
          <img className="w-full" src={props.url} alt="Card Image" />
          <div className="p-4">
            <h2 className="text-xl font-semibold">{props.title}</h2>
            <p className="text-gray-600">{props.text}</p>
            <Link to={props.route}>
            <button className="mt-4 px-4 py-2 bg-gray-100 text-gray-800 border border-gray-300 rounded-md hover:bg-gray-200 transition duration-300">
              {props.btnText}
            </button>
            </Link>
          </div>
        </div>
      </div>
  );
};

export default Description;