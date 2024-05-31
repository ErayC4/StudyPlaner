import React, { useState } from "react";
import Calender from "./Calender.jsx";

function AddTimeBlock() {
  const [isOpen, setIsOpen] = useState(false);
  const changeOpenState = () => {
    setIsOpen(!isOpen);
  };

  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [timeBlocks, setTimeBlocks] = useState([]);
  const [selectedDay, setSelectedDay] = useState("empty");
  const [dailyRepeat, setDailyRepeat] = useState(false);
  const [timeblockName, setTimeblockName] = useState("");

  const handleNameChange = (event) => {
    setTimeblockName(event.target.value);
  };

  const handleCheckboxChange = () => {
    setDailyRepeat(!dailyRepeat);
  };

  const handleStartTimeChange = (event) => {
    setStartingTime(event.target.value);
  };

  const handleEndTimeChange = (event) => {
    setEndingTime(event.target.value);
  };

  const today = new Date();

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${day}.${month}.${year}`;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTimeBlock = {
      startingTime: startingTime.toString(),
      endingTime: endingTime.toString(),
      startingDate: formatDate(today),
      endingDate: formatDate(today),
      repetitionDay: selectedDay,
      dailyRepeat: dailyRepeat,
      //activeOnCertainDay: "09.06.2024",
      name: timeblockName,
    };
    setTimeBlocks([...timeBlocks, newTimeBlock]);
    setStartingTime("");
    setEndingTime("");
    setSelectedDay("empty");
    setTimeblockName("");
  };

  return (
    <div className="px-32">
      <button
        onClick={changeOpenState}
        className="bg-gradient-to-r from-[#FBD21D] to-yellow-300 text-black py-2 px-4 rounded-xl"
      >
        <div className="flex items-center space-x-2">
          {" "}
          {/* Added space-x-2 for spacing between icon and text */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-plus"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
            />
          </svg>
          <p className="text-xl">Timeblock</p>
        </div>
      </button>

      <button className="bg-gradient-to-r from-[#49fb1d] to-green-300 text-black py-2 px-4 rounded-xl ml-4">
        <div className="flex items-center justify-center space-x-2">
          {" "}
          {/* Added space-x-2 for spacing between icon and text */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            className="bi bi-pencil"
            viewBox="0 0 16 16"
          >
            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
          </svg>
          <p className="text-xl">Edit</p>
        </div>
      </button>

      <Calender blocks={timeBlocks} />
      {isOpen ? (
        <div className="w-[50%] p-8 bg-white border-gray-600 border-2 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <form onSubmit={handleSubmit}>
            <p className="text-4xl">Add a Time block</p>
            <p className="text-xl mt-16">Task Name:</p>
            <input
              type="text"
              value={timeblockName}
              onChange={handleNameChange}
              className="w-full border-b border-black"
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

            {dailyRepeat ? (
              <div className="text-gray-500 flex">
                <p className="pr-2">Every </p>
                <p>{selectedDay}</p>
              </div>
            ) : (
              <div>
                <label className="pr-2">Every </label>
                <select
                  id="wochentag"
                  name="wochentag"
                  value={selectedDay}
                  onChange={(e) => setSelectedDay(e.target.value)}
                >
                  <option value="empty">please select</option>
                  <option value="monday">Monday</option>
                  <option value="tuesday">Tuesday</option>
                  <option value="wednesday">Wednesday</option>
                  <option value="thursday">Thursday</option>
                  <option value="friday">Friday</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday">Sunday</option>
                </select>
              </div>
            )}

            {selectedDay == "empty" || dailyRepeat ? (
              <div className="mt-4">
                <label>Everyday</label>
                <input
                  type="checkbox"
                  id="exampleCheckbox"
                  name="exampleCheckbox"
                  checked={dailyRepeat}
                  onChange={handleCheckboxChange}
                />
              </div>
            ) : (
              <div className="mt-4 text-gray-500">
                <label>Everyday</label>
                <input
                  type="checkbox"
                  id="exampleCheckbox"
                  name="exampleCheckbox"
                  checked={dailyRepeat}
                  onChange={handleCheckboxChange}
                />
              </div>
            )}

            <div className="flex mt-8">
              <label>Select Colors</label>
              <button>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-palette"
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
