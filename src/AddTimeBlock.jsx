import React, { useState, useEffect } from "react";
import Calender from "./Calender.jsx";

function AddTimeBlock() {
  const [isOpen, setIsOpen] = React.useState(false);
  const changeOpenState = () => {
    setIsOpen(!isOpen);
  };

  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [datum, setDatum] = useState(new Date()); // Aktuelles Datum als Standardwert

  const handleStartTimeChange = (event) => {
    setStartingTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndingTime(event.target.value);
  };

  // Funktion zur manuellen Formatierung des Datums
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const dayOfWeek = datum.getDay();
    const wochentage = [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];
    const newTimeBlock = {
      startingTime: startingTime.toString(),
      endingTime: endingTime.toString(),
      startingDate: formatDate(datum), // Formatieren des Datums
      repetitionDay: wochentage[dayOfWeek - 1],
      weeklyRepetionValue: 2,
      weekyRepeat: true,
      dailyRepeat: false,
      activeOnCertainDay: false,
    };
    setTimeBlocks([...timeBlocks, newTimeBlock]);
    setStartingTime("");
    setEndingTime("");
    setSelectedDay("");
    setDatum(new Date());
  };

  // Funktion zum Berechnen des Datums basierend auf dem ausgewählten Tag
  const calculateDateBasedOnSelectedDay = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 für Sonntag, 1 für Montag usw.
    let selectedDayIndex;

    switch (selectedDay.toLowerCase()) {
      case "monday":
        selectedDayIndex = 1;
        break;
      case "tuesday":
        selectedDayIndex = 2;
        break;
      case "wednesday":
        selectedDayIndex = 3;
        break;
      case "thursday":
        selectedDayIndex = 4;
        break;
      case "friday":
        selectedDayIndex = 5;
        break;
      case "saturday":
        selectedDayIndex = 6;
        break;
      case "sunday":
        selectedDayIndex = 0;
        break;
      default:
        return;
    }

    today.setDate(today.getDate() + selectedDayIndex - dayOfWeek);

    setDatum(today);
  };

  useEffect(() => {
    calculateDateBasedOnSelectedDay();
  }, [selectedDay]);

  return (
    <div className="px-16">
      <button
        onClick={changeOpenState}
        className="bg-blue-500 text-white py-2 px-16 rounded-full"
      >
        Add a Timeblock
      </button>
      <Calender blocks={timeBlocks} />

      {isOpen ? (
        <div className="w-[50%] p-8 bg-white border-gray-600 border-2 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <form onSubmit={handleSubmit}>
            <p className="text-4xl">Add a Time block</p>
            <p className="text-xl mt-16">Task Name:</p>
            <input
              type="text"
              name=""
              id=""
              className="w-full border-b border-black "
            />
            <div className="grid grid-cols-2 w-full mt-8">
              <div>
                <p>From:</p>
                <p>Hour/Minute</p>
                <div className="flex">
                  <input
                    type="time"
                    id="start-time"
                    step="300"
                    value={startingTime}
                    onChange={handleStartTimeChange}
                  />
                </div>
              </div>
              <div>
                <p>To:</p>
                <p>Hour/Minute</p>
                <div className="flex">
                  <input
                    type="time"
                    id="start-time"
                    step="300"
                    value={endingTime}
                    onChange={handleEndTimeChange}
                  />
                </div>
              </div>
            </div>
            <p className="text-red-500"></p>
            <label>Everyday</label>
            <input
              type="checkbox"
              id="exampleCheckbox"
              name="exampleCheckbox"
              value="1"
            />

            <div>
              <label className="pr-2">Active on </label>
              <select
                id="wochentag"
                name="wochentag"
                value={selectedDay}
                onChange={(e) => setSelectedDay(e.target.value)}
              >
                <option>please select</option>

                <option value="monday">Monday</option>
                <option value="tuesday">Tuesday</option>
                <option value="wednesday">Wednesday</option>
                <option value="thursday">Thursday</option>
                <option value="friday">Friday</option>
                <option value="saturday">Saturday</option>
                <option value="sunday">Sunday</option>
              </select>
            </div>

            <p className="pt-8">Or</p>
            <div className="flex">
              <input type="date" name="" id="" />

              <p>On Certain Date</p>
            </div>
            <p className="text-red-500 mt-8">
              This time is already occupied by HelloWorld (11:15-14:20)!
            </p>

            <button className="bg-blue-500 text-white py-1 px-7 rounded-full mt-2">
              Edit HelloWorld
            </button>
            <button className="bg-blue-500 text-white py-1 px-7 rounded-full ml-4">
              Show Timeplan
            </button>

            <div className="flex mt-8">
              <label>Select Colors</label>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-palette"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3m4 3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3M5.5 7a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m.5 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
                  <path d="M16 8c0 3.15-1.866 2.585-3.567 2.07C11.42 9.763 10.465 9.473 10 10c-.603.683-.475 1.819-.351 2.92C9.826 14.495 9.996 16 8 16a8 8 0 1 1 8-8m-8 7c.611 0 .654-.171.655-.176.078-.146.124-.464.07-1.119-.014-.168-.037-.37-.061-.591-.052-.464-.112-1.005-.118-1.462-.01-.707.083-1.61.704-2.314.369-.417.845-.578 1.272-.618.404-.038.812.026 1.16.104.343.077.702.186 1.025.284l.028.008c.346.105.658.199.953.266.653.148.904.083.991.024C14.717 9.38 15 9.161 15 8a7 7 0 1 0-7 7" />
                </svg>
              </button>
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-green-400 text-xl py-2 px-16 rounded-full border-green-500 border-2 mt-16"
              >
                Submit
              </button>
              <button
                onClick={changeOpenState}
                className="bg-red-400 text-xl py-2 px-16 rounded-full border-red-500 border-2 mt-16"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddTimeBlock;
