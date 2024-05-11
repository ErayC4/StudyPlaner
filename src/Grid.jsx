import React from "react";

function Grid() {
  const daysOfWeek = [
    { name: "Monday" },
    { name: "Tuesday" },
    { name: "Wednesday" },
    { name: "Thursday" },
    { name: "Friday" },
    { name: "Saturday" },
    { name: "Sunday" },
  ];

  const timeBlocks = [
    {
      name: "THI",
      isActiveOn: "Wednesday",
      startingTime: "08:25",
      endingTime: "09:25",
    },
    {
      name: "THI",
      isActiveOn: "Monday",
      startingTime: "01:25",
      endingTime: "09:25",
    },

    {
      name: "THI",
      isActiveOn: "Thursday",
      startingTime: "05:25",
      endingTime: "19:25",
    },
  ];
  function calculateTime(startingTime, endingTime) {
    const endingTimeParts = endingTime.split(":");
    const startingTimeParts = startingTime.split(":");

    // Umwandeln der Teile in Integer
    const endingHours = parseInt(endingTimeParts[0]);
    const endingMinutes = parseInt(endingTimeParts[1]);
    const startingHours = parseInt(startingTimeParts[0]);
    const startingMinutes = parseInt(startingTimeParts[1]);
    const timeLength =
      endingHours * 60 + endingMinutes - (startingHours * 60 + startingMinutes);
    return timeLength;
  }

  function calculateBaseline(blocks){
    if (!blocks || blocks.length === 0) {
      return null; 
    }
    blocks.sort((a, b) => {
      return new Date("1970/01/01 " + a.startingTime) - new Date("1970/01/01 " + b.startingTime);
    });
    return blocks[0].startingTime;
  }
  const baseline = calculateBaseline(timeBlocks)

  const stundenArray = Array.from({ length: 48 }, (_, index) => index);
  return (
    <div className="px-16">
      <div className="grid grid-cols-7"></div>
      <div className="grid grid-cols-7">
        {daysOfWeek.map((day, dayIndex) => (
          <div key={dayIndex}>
            <p
              className="border-b border-r p-2 text-xl border-gray-600"
              key={dayIndex}
            >
              {day.name}
            </p>
            <div className="absolute z-10">
              {timeBlocks.map((timeBlock, index) => (
                <div key={index}>
                  {day.name == timeBlock.isActiveOn ? (
                    <div
                      style={{
                        backgroundColor: "#34D399",
                        height: `${calculateTime(
                          timeBlock.startingTime,
                          timeBlock.endingTime
                        )}px`,
                        marginTop:`${calculateTime(
                          baseline,
                          timeBlock.startingTime
                        )}px`
                      }}
                      className="absolute mx-2 rounded-lg"
                    >
                      <div>
                      {timeBlock.startingTime}
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              ))}
            </div>

            <div className="relative">
              {stundenArray.map((index) => (
                <div
                  key={index}
                  className={`w-full h-[30px] border-r border-gray-600 ${
                    index % 2 == 0
                      ? "bg-transparent"
                      : "bg-gray-300 border-b border-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Grid;
