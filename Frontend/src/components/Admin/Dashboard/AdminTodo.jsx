import React, { useEffect, useState } from 'react';
import AddTaskForm from './components/Todo/AddTaskForm';
import Alert from '../../Alert/Alert';
import Loading from '../../Alert/Loading';
import TaskCard from './components/Todo/TaskCard';
import axios from 'axios';
import EditTaskForm from './components/Todo/EditTaskForm';

const AdminTodo = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editData, setEditData] = useState('');
  const [alert, setAlert] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(0);

  const [tasks, setTasks] = useState([]);

  const [type, setType] = useState('All'); // Default state is 'all'

  const statuses = ['All', 'To Do', 'Starred', 'In Progress', 'Completed','On Hold', 'Cancelled'];

  const token = localStorage.getItem('adminToken');

  const toggleAddTask = () => {
    setIsOpen(!isOpen);
  };

  const toggleEditTask = () => {
    setIsEditOpen(!isEditOpen);
  };

  const handleEditData = (task) => {
    setEditData(task);
    toggleEditTask();  // Open the modal immediately after setting data
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // Fetch tasks filtered by selected status
      const response = await axios.get(`http://localhost:3000/admin/get-tasks?status=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response.data);
      setTasks(response.data.tasks);
    } catch (err) {
      console.log(err);
      setAlert(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [type, refresh]); // Fetch tasks when type or refresh changes

  return (
    <div className="w-full bg-gray-100">
      {alert && <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />}
      <div className="flex justify-between items-center mx-10 mt-10">
        <h1 className="text-xl font-semibold text-gray-800">To-do List</h1>
        <button className="p-2 bg-indigo-500 text-white text-md font-semibold rounded-lg" onClick={toggleAddTask}>
          Add Task
        </button>
      </div>
      <AddTaskForm isOpen={isOpen} setIsOpen={setIsOpen} setAlert={setAlert} setRefresh={setRefresh} />
      <EditTaskForm isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen} setAlert={setAlert} editData={editData} setRefresh={setRefresh} />
      <div className="flex gap-6 justify-center my-10">
        {statuses.map((status) => (
          <button
            key={status}
            onClick={() => setType(status)}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-300 
              border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 
              ${type === status
                ? 'bg-indigo-500 text-white border-indigo-600'
                : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
            `}
          >
            {status}
          </button>
        ))}
      </div>
      {loading ? <Loading /> : (
        <div>
          {tasks.length === 0 ? (
            <div className="w-full mx-auto p-20">
              <p className="text-center text-lg text-gray-700 font-medium">No tasks to display. Go and add tasks now</p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 mx-2 p-2">
              {tasks.map((task, index) => (
                <TaskCard task={task} key={index} setAlert={setAlert} handleEditData={handleEditData} toggleEditTask={toggleEditTask} setRefresh={setRefresh}/>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AdminTodo;
