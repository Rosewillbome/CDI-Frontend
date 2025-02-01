"use client"
import React, { useState } from 'react';

function Navbtn() {
  const [isActive, setIsActive] = useState(false);

  return (
    <button
      onClick={() => setIsActive(!isActive)}
      className={`text-black font-bold text-xl mt-6 hover:text-blue-600 ${isActive ? 'border-b-2 border-blue-600' : ''}`}
    >
      Overview
    </button>
  );
}

export default Navbtn;

