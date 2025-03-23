import React from "react";
import "../app/globals.css";

const RoomShimmer = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {Array(12)
        .fill(1)
        .map((_, index) => {
          return (
            <div
              key={index}
              className="boder-2 border-red-500 h-[150px] rounded bg-gradient-to-r from-gray-500 via-gray-300 to-gray-500 shimmer bg-[length:200%_100%]"
            ></div>
          );
        })}
    </div>
  );
};

export default RoomShimmer;
