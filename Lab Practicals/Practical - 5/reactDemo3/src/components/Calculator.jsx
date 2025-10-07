import React, { useState } from 'react'

function isValidInput(value) {
  const allowed = /^[0-9+\-*/.=]*$/;
  return allowed.test(value);
}

function Calculator() {

  const [input, setInput] = useState(' ');

  return (
    <div className='w-screen h-screen bg-zinc-400 font-bold flex items-center justify-center'>
      <div className='w-[450px] h-[500px]'>
        <div className='w-[100%] h-[100%] bg-gray-950 rounded-2xl'>
          <div className='w-[100%] h-[18%] p-3 text-white text-4xl flex flex-row-reverse items-end'>
            <input type="text" className='w-[100%] h-[100%] pr-2 text-right text-white text-3xl bg-gray-700 rounded-lg outline-none' onChange={ (e) => { if(isValidInput(e.target.value)) { setInput(e.target.value) } } }  value={ input } />
          </div>

          <div className='w-[100%] h-[16%] bg-[#DB1F5A] flex flex-row items-center gap-2 text-3xl text-white'>
            <button className='h-[100%] w-[50%]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>/</button>
            <button className='h-[100%] w-[50%]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>*</button>
            <button className='h-[100%] w-[50%]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>+</button>
            <button className='h-[100%] w-[50%]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>-</button>
            <button className='h-[100%] w-[50%]' onClick={ (e) => { setInput(prev => String(prev).slice(0, -1)); }}>DEL</button>
            <button className='h-[100%] w-[50%]' onClick={ (e) => { setInput("") }}>C</button>
          </div>

          <div className='h-[66%] w-[100%] text-white text-3xl flex flex-row flex-wrap gap-2 items-center justify-center'>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>1</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>2</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>3</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>4</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>5</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>6</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>7</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>8</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>9</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>0</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { setInput((prev) => prev + e.target.textContent) }}>.</button>
            <button className='h-[23%] w-[140px]' onClick={ (e) => { try { setInput(eval(input)) } catch(err) { setInput("Error") } } }>=</button>
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default Calculator;