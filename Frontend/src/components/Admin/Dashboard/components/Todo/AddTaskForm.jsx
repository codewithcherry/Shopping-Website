import axios from 'axios';
import React, { useState } from 'react';
import Loading from '../../../../Alert/Loading';

const AddTaskForm = ({isOpen, setIsOpen,setAlert}) => {
  
  const [task, setTask] = useState({
    title: '',
    description: '',
    importance: 'medium',
    deadline: '',
  });
  const [loading,setLoading]=useState(false);
  const [message,setMessage]=useState('');
  const token=localStorage.getItem('adminToken');

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (task.title && task.description && task.deadline) {
    //   console.log('Task added:', task);
        try {
            setLoading(true)
            const response=await axios.post('http://localhost:3000/admin/add-task',task,
                {
                    headers:{
                        Authorization:`Bearer ${token}`
                    }
                }
            )
            // console.log(response.data);
            toggleModal();
            setAlert(response.data)
            setTask({
                title: '',
                description: '',
                importance: 'medium',
                deadline: '',
              });
            
        } catch (err) {
            console.log(err)
            setMessage(err.response.data.message)
        } 
        finally{
            setLoading(false);
        }
    }
    return setMessage("Please fill all the fields")
  };

  return (
    <div className='w-full'>
      

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-96 lg:w-1/2 ">
            <h2 className="text-xl font-bold mb-4">Add a new task</h2>
            {
                loading?<Loading />:
                <form onSubmit={handleSubmit}>
                    <div>
                <p className='text-sm text-red-500 text-center '>{message}</p>
              </div>
              {/* Title */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700">Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter task title"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">Description</label>
                <textarea
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                  placeholder="Enter task description"
                />
              </div>

              {/* Importance */}
              <div className="mb-4">
                <label htmlFor="importance" className="block text-gray-700">Importance</label>
                <select
                  id="importance"
                  name="importance"
                  value={task.importance}
                  onChange={handleChange}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              {/* Deadline */}
              <div className="mb-4">
                <label htmlFor="deadline" className="block text-gray-700">Deadline</label>
                <input
                  type="datetime-local"
                  id="deadline"
                  name="deadline"
                  value={task.deadline}
                  onChange={handleChange}
                  className="mt-2 p-2 border border-gray-300 rounded-md w-full"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="bg-gray-300 text-black py-2 px-4 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                >
                  Add Task
                </button>
              </div>
              
            </form>
            }
          </div>
        </div>
      )}
    </div>
  );
};

export default AddTaskForm;
