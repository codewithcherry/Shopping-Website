import React, { useEffect, useState } from 'react'
import AddTaskForm from './components/Todo/AddTaskForm';
import Alert from '../../Alert/Alert';
import Loading from '../../Alert/Loading';
import TaskCard from './components/Todo/TaskCard';
import axios from 'axios';

const AdminTodo = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [alert,setAlert]=useState();
  const [loading,setLoading]=useState(false)

  const [tasks,setTasks]=useState([]);

  const [type, setType] = useState('All'); // Default state is 'all'

  const statuses = ['All', 'To Do', 'Starred' ,'In Progress', 'Completed', 'Cancelled'];

  const token=localStorage.getItem('adminToken');

  const toggleAddTask=()=>{
      setIsOpen(!isOpen)
  }

  const fetchTasks=async () => {
    try{
      setLoading(true)
      const response=await axios.get('http://localhost:3000/admin/get-tasks',{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      console.log(response.data);
      setTasks(response.data.tasks);
    }
    catch(err){
      console.log(err);
      setAlert(err.response.data)
    }
    finally{
      setLoading(false);
    }
  }
  useEffect(()=>{
    fetchTasks()
  },[])
  return (
    <div className='w-full bg-gray-100'>
      {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)} />}
     <div className='flex justify-between items-center mx-10 mt-10'>
      <h1 className='text-xl font-semibold text-gray-800'>To-do List</h1>
      <button className='p-2 bg-indigo-500 text-white text-md font-semibold  rounded-lg' onClick={toggleAddTask}>Add Task</button>
     </div>
     <AddTaskForm isOpen={isOpen} setIsOpen={setIsOpen} setAlert={setAlert}/>
     <div className="flex gap-6 justify-center my-10">
      {statuses.map((status) => (
        <button
          key={status}
          onClick={() => setType(status)}
          className={`px-6 py-2 rounded-lg text-sm font-medium transition duration-300 
            border-2 border-transparent focus:outline-none focus:ring-2 focus:ring-gray-300 
            ${type === status 
              ? 'bg-indigo-500 text-white border-indig0-600' 
              : 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
          `}
        >
          {status}
        </button>
      ))}
    </div>
     {
      loading?<Loading />:
      <div>{
        tasks.length==0?<div className='w-full mx-auto p-20'>
            <p className='text-center text-lg text-gray-700 font-medium'> No tasks to display. Go and add tasks now</p>
        </div>:
        <div className='grid grid-cols-4 gap-4 mx-2 p-2'>
        {tasks.map((task,index)=>{
          return <TaskCard task={task} key={index} setAlert={setAlert}/>
        })}
      </div> 
      }
      </div>
     }
    </div>
  )
}

export default AdminTodo
