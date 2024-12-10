import React, { useState } from 'react';
import AddTeamForm from '../Dashboard/components/Team/AddTeamForm';
import { PlusIcon } from '@heroicons/react/24/solid';
import Alert from '../../Alert/Alert'

const AdminTeam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert,setAlert]=useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-6">
     <div className='w-full z-20'> {alert && <Alert type={alert.type} message={alert.message} onClose={()=>setAlert(null)} />}</div>
      <div className="flex justify-end">
        <button
          onClick={toggleModal}
          className="flex items-center gap-1 bg-indigo-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-indigo-600"
        >
          <PlusIcon className='w-5 h-5 text-white'/>
          Add Teammate
        </button>
      </div>
      {isModalOpen && <AddTeamForm closeModal={toggleModal} setAlert={setAlert} />}
    </div>
  );
};

export default AdminTeam;
