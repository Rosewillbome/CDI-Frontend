"use client";

import { useEffect, useState } from "react";

const Loader = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Hide the loader after 5 seconds (adjust as needed)
    const timer = setTimeout(() => {
      setVisible(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (!visible) return null;

  return (
    <div className="loaderContainer">
      <div className="welcomeText">
        Welcome to Uganda Drought Monitoring Tool
      </div>
    </div>
  );
};

export default Loader;