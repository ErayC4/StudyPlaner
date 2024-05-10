import React from 'react'

function Grid() {
    const daysOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ];

    const stundenArray = Array.from({ length: 48 }, (_, index) => index);

  return (
    <div className='px-16'>
        <div className='grid grid-cols-7'>
        {daysOfWeek.map((day, dayIndex)=>(
            <div key={dayIndex}>
            <p key ={dayIndex}>{day}</p>
            {stundenArray.map((index) => (
        <div key={index} className={`w-full h-8 border-r border-gray-600 ${index % 2 != 0 ? "bg-transparent" : "bg-gray-300 border-b border-gray-600"}`}></div>
      ))}
            </div>
        ))}
        </div>
        
      
    </div>
  );
}

export default Grid