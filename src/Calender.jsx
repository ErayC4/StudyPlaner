import React, {useState} from "react";

function Calender({ blocks }) {
  
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
  const [datum, setDatum] = useState(new Date()); // Aktuelles Datum als Standardwert

  const handleBack = () => {
    const neuesDatum = new Date(datum); // Kopie des aktuellen Datums erstellen
    neuesDatum.setDate(neuesDatum.getDate() - 7); // 7 Tage zurückgehen
    setDatum(neuesDatum); // Datum aktualisieren
  };

  const handleForth = () => {
    const neuesDatum = new Date(datum); // Kopie des aktuellen Datums erstellen
    neuesDatum.setDate(neuesDatum.getDate() + 7); // 7 Tage vorwärts gehen
    setDatum(neuesDatum); // Datum aktualisieren
  };
  var heute = new Date();
  var wochentagIndex = heute.getDay();
  // Ein Array mit den Wochentagen als Strings
  var wochentage = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];


  const stundenArray = Array.from({ length: 48 }, (_, index) => index);
  const dateInCalender = (dayIndex) => {
    return new Date(
      datum.getFullYear(),
      datum.getMonth(),
      datum.getDate() + dayIndex - 1
    ).toLocaleDateString();
  };
  return (
    <div>
      {}
      <button className="bg-yellow-400 py-2 px-8 rounded-full" onClick={handleBack}>back</button>
      <button className="ml-2 mt-4 bg-yellow-400 py-2 px-8 rounded-full" onClick={handleForth}>forth</button>

      <div className="grid grid-cols-7"></div>
      <div className="grid grid-cols-7">
        {wochentage.map((day, dayIndex) => (
          <div key={dayIndex}>
            <div
              className="border-b border-r p-2 text-xl border-gray-600"
              key={dayIndex}
            >
              {day}
              <div>
                {dateInCalender(dayIndex)}
              </div>
            </div>
            <div className="absolute z-10">
              {blocks.map((timeBlock, index) => (
                <div key={index}>
                  {dateInCalender(dayIndex) == timeBlock.date ? (
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
                      <div>{timeBlock.date}</div>
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
                  style={
                    day === wochentage[wochentagIndex - 1]
                      ? { filter: "brightness(80%)" }
                      : {}
                  }
                ></div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Calender;
