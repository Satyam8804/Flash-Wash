import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 text-center">
      <div className="container mx-auto">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Flash Wash. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
