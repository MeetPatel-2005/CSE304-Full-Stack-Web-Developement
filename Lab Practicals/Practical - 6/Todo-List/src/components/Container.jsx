import React, { useState } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function Container() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleAddOrUpdateTask = () => {
    if (task.trim() === "") return;

    if (editIndex === null) {
      setTasks([...tasks, task]); // Add
    } else {
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task; // Update
      setTasks(updatedTasks);
      setEditIndex(null);
    }

    setTask("");
  };

  const handleUpdateClick = (index) => {
    setTask(tasks[index]);
    setEditIndex(index);
  };

  const handleDeleteClick = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    // 1. tasks.filter(...)
    // filter() is an array method.
    // 
    // It returns a new array with only those elements for which the callback returns true.
    // 
    // 2. (_, i) => i !== index
    // _ is the first parameter: the actual task value (not needed here, so we name it _ to ignore it).
    // 
    // i is the second parameter: the index of the current item.
    setTasks(newTasks);
    if (editIndex === index) {
      setTask('');
      setEditIndex(null);
    }
  };

  return (
    <div className='h-screen w-screen bg-gray-400 flex items-center justify-center select-none'>
      <div className='w-[25%] bg-gray-900 border-[0.75rem] border-violet-600 rounded-lg pb-5'>
        <div className='w-full text-white font-bold text-3xl text-center mt-5 p-5'>Get Things Done!</div>

        <div className='w-full'>
          <input
            type="text"
            placeholder="What is the task today?"
            className="h-[40px] w-[70%] text-white bg-gray-700 ml-6 my-3 pl-2 border-2 border-violet-500 outline-none"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button
            className='h-[40px] w-[20%] font-bold text-white bg-violet-500'
            onClick={handleAddOrUpdateTask}
          >
            {editIndex === null ? "Add Task" : "Update"}
          </button>
        </div>

        <div className='task-list'>
          {tasks.map((t, index) => (
            <div
              key={index}
              className='h-[40px] mt-4 mx-6 bg-violet-500 text-white font-bold text-lg flex items-center p-2 rounded-lg justify-between'
            >
              <p>{t}</p>
              <div className='flex gap-4 text-xl mr-3'>
                <button onClick={() => handleUpdateClick(index)}><FaEdit /></button>
                <button onClick={() => handleDeleteClick(index)}><MdDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Container;
