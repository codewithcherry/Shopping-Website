import React, { useState } from 'react';
import { BsPinAngleFill } from "react-icons/bs";
import { StarIcon, CheckCircleIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const TaskCard = ({ task,setAlert,handleEditData,toggleEditTask }) => {
  const {
    _id,
    title,
    description,
    importance,
    deadline,
    status,
    starred,
    pinned,
  } = task;

  const [menuOpen, setMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(pinned);
  const [isStarred, setIsStarred] = useState(starred);
  const [currentStatus, setCurrentStatus] = useState(status);

  const token = localStorage.getItem('adminToken');

  const handlePinToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/admin/update-pinned?id=${_id}`,
        { pinned: !isPinned },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert(response.data)
      if (response.status === 200) {
        setIsPinned(!isPinned);
      }
    } catch (error) {
      console.error('Failed to toggle pinned state:', error);
      setAlert(error.response.data)
    }
    finally{
      setMenuOpen(false)
      toggleEditTask()
    }
  };

  const handleStarToggle = async () => {
    try {
      const response = await axios.post(
        `http://localhost:3000/admin/update-starred?id=${_id}`,
        { starred: !isStarred },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert(response.data)
      if (response.status === 200) {
        setIsStarred(!isStarred);
      }
    } catch (error) {
      console.error('Failed to toggle starred state:', error);
      setAlert(error.response.data)
    }
    finally{
      setMenuOpen(false)
    }
  };

  const handleStatusUpdate = async (newStatus) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/admin/update-task-status?id=${_id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert(response.data)
      if (response.status === 200) {
        setCurrentStatus(newStatus);
        setMenuOpen(false); // Close the menu after successful update
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      setAlert(error.response.data)
    }
    finally{
      setMenuOpen(false)
    }
  };

  const handleDeleteTask = async () => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/admin/delete-task?id=${_id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAlert(response.data)
      if (response.status === 200) {
        console.log('Task deleted successfully');
        // Optionally, trigger a parent function to update the UI or navigate away
        if (onDelete) {
          onDelete(task);
        }
      }
    } catch (error) {
      console.error('Failed to delete task:', error);
      setAlert(error.response.data)
    }
    finally{
      setMenuOpen(false)
    }
  };

  const handleEdit = () => {
    console.log('edit clicked');
    handleEditData(task);      // Set the edit ID
    setMenuOpen(false);  // Close the dropdown menu
    toggleEditTask();    // Toggle the Edit modal state
  };

  const date = new Date(deadline);

  const dateData = {
    day: date.toLocaleDateString('en-US', { weekday: 'long' }),
    month: date.toLocaleDateString('en-US', { month: 'long' }),
    date: date.getDate(),
    year: date.getFullYear(),
  };

  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });

  const statusOptions = ['In Progress', 'Cancelled', 'On Hold', 'To Do'];

  return (
    <div className="relative bg-gradient-to-tr from-gray-50 to-white backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-200 z-10">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <BsPinAngleFill
          onClick={handlePinToggle}
          className={`w-6 h-6 cursor-pointer ${
            isPinned ? 'text-blue-600' : 'text-gray-300'
          } hover:text-blue-700 transition-all duration-300`}
        />
        {isStarred ? (
          <StarIconSolid
            onClick={handleStarToggle}
            className="w-6 h-6 text-yellow-500 hover:text-yellow-600 transition-all duration-300 cursor-pointer"
          />
        ) : (
          <StarIcon
            onClick={handleStarToggle}
            className="w-6 h-6 text-gray-300 hover:text-yellow-500 transition-all duration-300 cursor-pointer"
          />
        )}
        <div className="relative">
          <EllipsisVerticalIcon
            className="w-6 h-6 cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg z-20">
              <div className="px-4 py-2 text-sm text-gray-700">
                <p className="font-semibold text-gray-800">Update Status</p>
                {statusOptions.map((option) => (
                  <button
                    key={option}
                    className={`block w-full text-left px-4 py-1 mt-1 rounded ${
                      currentStatus === option
                        ? 'bg-blue-100 text-blue-600'
                        : 'hover:bg-gray-100 text-gray-700'
                    }`}
                    onClick={() => handleStatusUpdate(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
              
              <button
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                onClick={() => {
                  handleEdit();
                  
                }}
              >
                <PencilIcon className="w-4 h-4 text-gray-700" />
                Edit
              </button>
              <button
  className="flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 w-full text-left"
  onClick={() => {
    handleDeleteTask();
    setMenuOpen(false);
  }}
>
  <TrashIcon className="w-4 h-4 text-red-600" />
  Delete
</button>
            </div>
          )}
        </div>
      </div>
      <div className="text-center mt-4">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>
      <div className="mt-4 bg-gradient-to-r from-indigo-50 to-white rounded-lg p-4 shadow-inner text-center">
        <div className="flex justify-between mb-2">
          <h1 className="text-sm">Deadline</h1>
          <h1 className="text-sm text-right font-medium text-indigo-500">{formattedTime}</h1>
        </div>
        <div className="flex gap-2 items-center text-gray-500">
          <h1 className="text-6xl">{dateData.date}</h1>
          <div className="text-left">
            <h2 className="text-2xl">{dateData.day}</h2>
            <p>
              {dateData.month}, {dateData.year}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
      </div>
      <div className="mt-6 flex justify-between items-center">
        <span
          className={`text-sm font-semibold px-3 py-1 rounded-full ${
            currentStatus === 'completed'
              ? 'bg-green-100 text-green-600'
              : 'bg-yellow-100 text-yellow-600'
          } shadow-sm`}
        >
          {currentStatus}
        </span>
        <p className="text-sm text-gray-500">
          Priority: <span className="font-semibold text-gray-800">{importance}</span>
        </p>
      </div>
      <div
  className={`mt-6 flex items-center gap-3 cursor-pointer group ${
    currentStatus === "completed" ? "opacity-50 cursor-not-allowed" : ""
  }`}
  onClick={() => {
    if (currentStatus !== "Completed") {
      handleStatusUpdate("Completed");
    }
  }}
>
  <p
    className={`text-sm font-medium transition-all duration-300 ${
      currentStatus === "completed"
        ? "text-green-600"
        : "text-gray-700 group-hover:text-green-600"
    }`}
  >
    {currentStatus === "Completed" ? "Completed" : "Mark as Completed"}
  </p>
  <CheckCircleIcon
    className={`w-6 h-6 transition-all duration-300 ${
      currentStatus === "Completed"
        ? "text-green-500"
        : "text-gray-300 group-hover:text-green-500"
    }`}
  />
</div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-gray-200/30 rounded-xl pointer-events-none"></div>
    </div>
  );
};

export default TaskCard;
