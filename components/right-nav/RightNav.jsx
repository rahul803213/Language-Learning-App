import React from "react";
import { FaFire, FaHeart, FaDice, FaStar } from "react-icons/fa";
import ReactCountryFlag from "react-country-flag";

const RightNav = () => {
  return (
    <div className="w-1/4 h-30  flex items-center justify-between p-4">

<div className="flex items-center space-x-2">
      <ReactCountryFlag
                countryCode='US'
               
                svg
                style={{ width: '2em', height: '2em' }}
                title="English"
                
                
              />
      </div>
      <div className="flex items-center space-x-2">
        <FaFire className="w-6 h-6 text-blue-500" />
        <span className="text-lg font-semibold">25</span>
      </div>
     
      <div className="flex items-center space-x-2">
        <FaHeart className="w-6 h-6 text-red-500" />
        <span className="text-lg font-semibold">18</span>
      </div>
      
    </div>
  );
};

export default RightNav;
