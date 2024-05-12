import React from "react";

function AddTimeBlock() {
  const [isOpen, setIsOpen] = React.useState(false);
  const changeOpenState = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="px-16">
      <button
        onClick={changeOpenState}
        className="bg-blue-500 text-white py-2 px-16 rounded-full"
      >
        Add a Timeblock
      </button>
      {isOpen ? (
        <div className="w-[50%] p-8 bg-white border-gray-600 border-2 rounded-xl absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
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
              <input type="time" id="start-time" step="300" />
            </div>
          </div>
          <div>
            <p>To:</p>
            <p>Hour/Minute</p>
            <div className="flex">
              <input type="time" id="start-time" step="300" />
            </div>
          </div>
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
          <input type="checkbox" />

          <label>Only Once</label>
        </div>
        <div className="flex">
          <input type="checkbox" />

          <label>Weekly Repeat</label>
        </div>
        <div className="flex">
          <input type="date" name="" id="" />

          <p>On Certain Date</p>
        </div>
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
          <button className="bg-green-400 text-xl py-2 px-16 rounded-full border-green-500 border-2 mt-16">
            Submit
          </button>
          <button onClick={changeOpenState} className="bg-red-400 text-xl py-2 px-16 rounded-full border-red-500 border-2 mt-16">
            Cancel
          </button>
        </div>
      </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default AddTimeBlock;
