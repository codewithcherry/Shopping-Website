import React, { useEffect, useState } from 'react';
import AddTeamForm from '../Dashboard/components/Team/AddTeamForm';
import { PlusIcon,UserIcon } from '@heroicons/react/24/solid';
import Alert from '../../Alert/Alert'
import TeamMemberCard from './components/Team/TeamMemberCard';
import axios from 'axios';
import Loading from '../../Alert/Loading';

const baseURL=import.meta.env.VITE_API_BACKEND;

const AdminTeam = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert,setAlert]=useState();
  const [teamMembers,setTeamMembers]=useState([]);
  const [loading,setLoading]=useState(false);

  const adminToken=localStorage.getItem('adminToken')

  const fetchTeamMembers=async () => {
    try {
      setLoading(true)
      const response=await axios.get(baseURL+'/admin/get-team-members',
        {
          headers:{
            Authorization:`Bearer ${adminToken}`
          }
        }
      )
      setTeamMembers(response.data)
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  }

  useEffect(()=>{
    fetchTeamMembers()
  },[])

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div className="p-6 w-full bg-gray-100">
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
      <div className='text-xl text-gray-700 font-medium mx-8 flex items-center gap-1 '><UserIcon className='w-5 h-5 text-gray-700'/> Team </div>
      {loading?<Loading />:
      <div className='w-full mx-auto p-6'>
      {teamMembers.length==0?<div>
       <p>No Team mates added</p>
      </div>:
      <div className=' grid grid-cols-4 gap-4'>
       {teamMembers.map((member,index)=>{
          return <TeamMemberCard key={index} image={member.imageUrl} firstName={member.firstname} role={member.role} lastName={member.lastname} email={member.email} phone={member.phone} socialLinks={{linkedin:member.linkedin,email:member.email,twitter:member.twitter,github:member.github}}/>
       })}
      </div>
      }
     </div>}
    </div>
  );
};

export default AdminTeam;
