import React, { useEffect, useState } from 'react'

function Container() {

  const [date, setdate] = useState(new Date());
  const [currentTime, setcurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setcurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const dateString = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;

  const timeString = currentTime.toLocaleTimeString();

  return (
    <div className='w-screen h-screen flex flex-col gap-4 items-center justify-center'>
      <p className='font-bold text-4xl'>Welcome to CHARUSAT!!!!</p>
      <p className='font-bold text-4xl'>It is <span className='uppercase'>{ dateString }</span></p>
      <p className='font-bold text-4xl'>It is <span className='uppercase'>{ timeString }</span></p>
    </div>
  )
}

export default Container;