import React, { useState } from "react";
import Timeline from "./timeline.jsx";
import "./index.css";
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

  const dateInCalender = (dayIndex, type) => {
    const targetDate = new Date(
      datum.getFullYear(),
      datum.getMonth(),
      datum.getDate() + dayIndex - datum.getDay()
    );
    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, "0"); // Monate sind 0-basiert, also +1
    const day = String(targetDate.getDate()).padStart(2, "0");

    // Wochentagsnamen
    const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const dayOfWeek = daysOfWeek[targetDate.getDay()];

    const monthName = [
      "",
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
    ];

    // Suffix für den Tag-Zahl
    const getOrdinalSuffix = (n) => {
      const s = ["th", "st", "nd", "rd"];
      const v = n % 100;
      return s[(v - 20) % 10] || s[v] || s[0];
    };

    const dayWithSuffix = day + getOrdinalSuffix(day);
    if (type === "dayOfWeekAndDay") {
      return `${dayOfWeek} ${dayWithSuffix}`;
    } else if (type === "month") {
      return `${monthName[parseInt(month)]}`;
    } else {
      return `${day}.${month}.${year}`;
    }
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
        if (equals) {
          if (dayOfDate1 >= dayOfDate2) {
            return true;
          }
        }
        if (!equals) {
          if (dayOfDate1 > dayOfDate2) {
            return true;
          }
        } else {
          return false;
        }
      }
    }
  }
  return (
    <div>
      <div>
        <button className="h-8 w-8" onClick={handleBack}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-chevron-left"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"
            />
          </svg>
        </button>
        <button className="h-8 w-8" onClick={handleForth}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-chevron-right"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"
            />
          </svg>
        </button>
      </div>
      <div className="flex">
        <div className="flex border-t mt-[92px] border-black pt-[7px]">
          <Timeline baseline={baseline} />
        </div>

        <div className="grid grid-cols-7 w-full pt-1">
          {wochentage.map((day, dayIndex) => (
            <div key={dayIndex}>
              <div
                className={`text-xl text-center border-b border-black rounded-t-lg py-4 ${
                  getToday() === dateInCalender(dayIndex)
                    ? "bg-gradient-to-b from-[#FBD21D] to-white"
                    : ""
                }`}
              >
                <div>{dateInCalender(dayIndex, "month")}</div>
                <div>{dateInCalender(dayIndex, "dayOfWeekAndDay")}</div>
              </div>

              <div className="absolute z-20 ">
                {blocks.map((timeBlock, index) => (
                  <div key={index}>
                    {getBiggerDate(
                      dateInCalender(dayIndex),
                      timeBlock.startingDate,
                      true
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
                  

                  return (
                    <div
                      key={index}
                      
                    >
                      {getBiggerDate(
                        getToday(),
                        dateInCalender(dayIndex),
                        false
                      ) ? (
                        <div className={`hintergrund h-[30px] w-full border-l border-gray-600 ${
                          index % 2 === 0
                            ? "white"
                            : "bg-gray-200 border-b border-gray-600"
                        }`}></div>
                      ) : (
                        <div
                          className={`w-full h-[30px] border-l border-gray-600 ${
                            index % 2 === 0
                              ? "white"
                              : "bg-gray-200 border-b border-gray-600"
                          }`}
                        ></div>
                      )}
                    </div>
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
