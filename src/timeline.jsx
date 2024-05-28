import React from "react";

function Timeline({ baseline }) {
  function calculateTime(startingTime, timeIndex) {
    if (!startingTime) return 0;

    const startingTimeParts = startingTime.split(":");

    // Umwandeln der Teile in Integer
    let startingHours = parseInt(startingTimeParts[0], 10);
    if (startingHours + timeIndex > 23) {
      startingHours = startingHours + timeIndex - 24;
    } else {
      startingHours = startingHours + timeIndex;
    }
    return startingHours;
  }
  const zeit = Array.from({ length: 24 }, (_, index) => index);

  return (
    <div>
      <div className="text-end">
        {zeit.map((index) => (
          <div key={index} className="flex flex-row justify-end">
            <div className="h-[60px] px-4 pt-10">
              {calculateTime(baseline, index) + 1>= 10 ? (
                <p>{calculateTime(baseline, index) + 1}:00</p>
              
              ) : (
                  <p>0{calculateTime(baseline, index) + 1}:00</p>
              )}
            </div>
            <div className="flex flex-col justify-around h-[60px] items-end">

              <span className="inline-block w-[8px] h-[1px] bg-black"></span>
              <span className="inline-block w-[12px] h-[1px] bg-black"></span>
              <span className="inline-block w-[8px] h-[1px] bg-black"></span>
              <span className="inline-block w-[20px] h-[1px] bg-black  "></span>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Timeline;
