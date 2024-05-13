import React from "react";

function Grid({blocks}) {
  const daysOfWeek = [
    { name: "monday" },
    { name: "tuesday" },
    { name: "wednesday" },
    { name: "thursday" },
    { name: "friday" },
    { name: "saturday" },
    { name: "sunday" },
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

  function calculateBaseline(blocks) {
    if (!blocks || blocks.length === 0) {
      return null;
    }
    // Funktion, um die Minuten auf 00 zu setzen
    function roundDownToHour(timeString) {
      const [hours] = timeString.split(":");
      return hours + ":00";
    }
    // Die Zeitblöcke sortieren
    blocks.sort((a, b) => {
      const timeA = roundDownToHour(a.startingTime);
      const timeB = roundDownToHour(b.startingTime);
      return new Date("1970/01/01 " + timeA) - new Date("1970/01/01 " + timeB);
    });
    // Den kleinsten Wert zurückgeben
    return roundDownToHour(blocks[0].startingTime);
  }
  const baseline = calculateBaseline(blocks);


    // Erstelle ein neues Date-Objekt
    var heute = new Date();
    // Extrahiere den Tag aus dem Date-Objekt
    var tag = heute.getDate();

    // Extrahiere den Monat aus dem Date-Objekt (beachte: Januar ist 0 und Dezember ist 11)
    var monat = heute.getMonth() + 1; // Füge 1 hinzu, da die Monate bei 0 beginnen

    // Extrahiere das Jahr aus dem Date-Objekt
    var jahr = heute.getFullYear();

    var wochentagIndex = heute.getDay();
    // Ein Array mit den Wochentagen als Strings
    var wochentage = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

    

  const stundenArray = Array.from({ length: 48 }, (_, index) => index);

  return (
    <div className="">
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
              {blocks.map((timeBlock, index) => (
                <div key={index}>
                  {day.name == timeBlock.isActiveOn ? (
                    <div
                      style={{
                        backgroundColor: timeBlock.color,
                        height: `${calculateTime(
                          timeBlock.startingTime,
                          timeBlock.endingTime
                        )}px`,
                        marginTop: `${calculateTime(
                          baseline,
                          timeBlock.startingTime
                        )}px`,
                      }}
                      className="absolute mx-2 rounded-lg w-48"
                    >
                      <div>{timeBlock.startingTime}</div>
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
                  style={day.name === wochentage[wochentagIndex] ? { filter: "brightness(80%)" } : {}}
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
