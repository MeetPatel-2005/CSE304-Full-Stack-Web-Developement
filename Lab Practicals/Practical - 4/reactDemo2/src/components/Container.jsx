import React, { useState } from 'react'

function Container() {
  
  const [count, setCount] = useState(0);

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");

  return (
    <div className='w-screen h-screen flex flex-col gap-6 items-center justify-center'>

      <p className='font-bold text-4xl'>Count : { count }</p>

      <div className='flex gap-2'>
        <button className='border-black border-2 p-1 px-2 rounded-lg' onClick={ () => setCount(0)}>Reset</button>
        <button className='border-black border-2 p-1 px-2 rounded-lg' onClick={ () => setCount(count+1)}>Increment</button>
        <button className='border-black border-2 p-1 px-2 rounded-lg' onClick={ () => setCount(count-1)}>Decrement</button>
        <button className='border-black border-2 p-1 px-2 rounded-lg' onClick={ () => setCount(count+5)}>Increment 5</button>
      </div>

      <p className='font-bold text-4xl'>Welcome to CHARUSAT!!!!</p>

      <div>
        <label htmlFor="f-name">First Name : </label>
        <input id='f-name' type="text" value={ fname } onChange={(e) => setFname(e.target.value)} className='border-black border-2 p-1 px-2 rounded-lg' />
        <br /><br />
        <label htmlFor="f-name">Last Name : </label>
        <input id='l-name' type="text" value={ lname } onChange={(e) => setLname(e.target.value)} className='border-black border-2 p-1 px-2 rounded-lg' />
      </div>

      <div className='flex flex-col gap-3'>
        <p>First Name : { fname }</p>
        <p>Last Name : { lname }</p>
      </div>
    </div>
  );
}

export default Container;