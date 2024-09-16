import React, { useState, useEffect } from 'react';

const Applytime = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000); // Updates every 1 second
    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);
  return (
    <>
      <p className="text-center">
        <mark>
          {currentDateTime.toLocaleDateString()} {currentDateTime.toLocaleTimeString()}
        </mark></p>
    </>
  )
}

export default Applytime
