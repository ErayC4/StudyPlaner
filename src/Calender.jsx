import React, { useState } from "react";
import Timeline from "./timeline.jsx";

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
    return Math.abs(timeLength);
  }

  function calculateBaseline(blocks) {
    //default bei 06:00 falls keine blöcke da sind
    if (!blocks || blocks.length === 0) {
      return "06:00";
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

  // Wochentage im kalender
  var wochentage = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];

  //halbe stunde * 48 = ein tag
  const stundenArray = Array.from({ length: 48 }, (_, index) => index);

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

  const dateInCalender = (dayIndex) => {
    const targetDate = new Date(
      datum.getFullYear(),
      datum.getMonth(),
      datum.getDate() + dayIndex - datum.getDay()
    );

    // Manuelle Formatierung des Datums
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0"); // Monate sind 0-basiert, also +1
    const day = String(targetDate.getDate()).padStart(2, "0");

    return `${day}.${month}.${year}`;
  };

  const getToday = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}.${month}.${year}`;
  };

  function getBiggerDate(date1, date2, equals) {
    const date1Array = date1.split(".");
    const date2Array = date2.split(".");

    const dayOfDate1 = parseInt(date1Array[0]);
    const monthOfDate1 = parseInt(date1Array[1]);
    const yearOfDate1 = parseInt(date1Array[2]);

    const dayOfDate2 = parseInt(date2Array[0]);
    const monthOfDate2 = parseInt(date2Array[1]);
    const yearOfDate2 = parseInt(date2Array[2]);

    if (yearOfDate1 > yearOfDate2) {
      return true;
    } else if (yearOfDate1 < yearOfDate2) {
      return false;
    } else {
      // Jahre sind gleich, Monate vergleichen
      if (monthOfDate1 > monthOfDate2) {
        return true;
      } else if (monthOfDate1 < monthOfDate2) {
        return false;
      } else {
        // Monate sind gleich, Tage vergleichen
        if(equals){
          if (dayOfDate1 >= dayOfDate2) {
            return true;
          } 
        }
        if(!equals){
          if (dayOfDate1 > dayOfDate2) {
            return true;
          } 
        }
        else {
          return false;
        }
      }
    }
  }
  return (
    <div>
      <button
        className="bg-yellow-400 py-2 px-8 rounded-full"
        onClick={handleBack}
      >
        back
      </button>
      <button
        className="ml-2 mt-4 bg-yellow-400 py-2 px-8 rounded-full"
        onClick={handleForth}
      >
        forth
      </button>
      <div className="flex">
        <div className="col-span-1 mt-[75px] border-t border-black pt-[7px] inline-block">
          <Timeline baseline={baseline} />
        </div>
        <div className="grid grid-cols-7 w-full pt-1">
          {wochentage.map((day, dayIndex) => (
            <div key={dayIndex}>
              <div className="text-xl text-center">
                {day}
                <div>{dateInCalender(dayIndex)}</div>
              </div>
              <div
                className="border-b border-l h-4  border-gray-600"
                key={dayIndex}
              ></div>

              <div className="absolute z-20 ">
                {blocks.map((timeBlock, index) => (
                  <div key={index}>
                    {getBiggerDate(
                      dateInCalender(dayIndex),
                      timeBlock.startingDate, true
                    ) &&
                      (day == timeBlock.repetitionDay ||
                        timeBlock.dailyRepeat) && (
                        <div
                          style={{
                            backgroundColor: "#ff9900",
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
                          <div className="pt-2 pl-4">
                            <p className="text-xl">{timeBlock.name}</p>
                            <p className="text-lg">
                              {timeBlock.startingTime} - {timeBlock.endingTime}
                            </p>
                          </div>
                        </div>
                      )}
                  </div>
                ))}
              </div>

              <div className="relative">
                {stundenArray.map((index) => {
                  let style = {};

                  if (getBiggerDate(getToday(), dateInCalender(dayIndex), false)) {
                    style = { filter: "brightness(85%)" };
                  } else if (getToday() === dateInCalender(dayIndex)) {
                    style = { filter: "brightness(105%)" };
                  }

                  return (
                    <div
                      key={index}
                      className={`w-full h-[30px] border-l border-gray-600 ${
                        index % 2 === 0
                          ? "bg-gray-200"
                          : "bg-gray-300 border-b border-gray-600"
                      }`}
                      style={style}
                    ></div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Calender;
