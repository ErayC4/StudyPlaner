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
    <div className="text-end">
      {zeit.map((index) => (
        <div>
          <p className="h-[60px]">
            {calculateTime(baseline, index) >= 10 ? (
              <p>{calculateTime(baseline, index)}:00</p>
            ) : (
              <p>0{calculateTime(baseline, index)}:00</p>
            )}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Timeline;
