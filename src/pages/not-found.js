import React, { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found!";
  }, []);

  return (
    <div className="bg-gray-background">
      <div className="flex items-center justify-center h-screen max-w-screen-lg mx-auto my-auto">
        <p className="text-2xl text-center">Not Found!</p>
      </div>
    </div>
  );
};

export default NotFound;
