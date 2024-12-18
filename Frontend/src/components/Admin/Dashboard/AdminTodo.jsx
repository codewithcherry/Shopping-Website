import React, { useState } from 'react'
import AddTaskForm from './components/Todo/AddTaskForm';
import Alert from '../../Alert/Alert';

const AdminTodo = () => {

  const [isOpen, setIsOpen] = useState(false);
  const [alert,setAlert]=useState();

  const toggleAddTask=()=>{
      setIsOpen(!isOpen)
  }
  return (
    <div className='w-full '>
      {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)} />}
     <div className='flex justify-between items-center mx-10 mt-10'>
      <h1 className='text-lg font-semibold text-gray-800'>To-do List</h1>
      <button className='p-2 bg-indigo-500 text-white text-md font-semibold  rounded-lg' onClick={toggleAddTask}>Add Task</button>
     </div>
     <div>
        <AddTaskForm isOpen={isOpen} setIsOpen={setIsOpen} setAlert={setAlert}/>
     </div>
    </div>
  )
}

export default AdminTodo
