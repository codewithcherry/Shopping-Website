import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Heroicons
import axios from 'axios';
import Alert from '../../Alert/Alert';

const baseURL=import.meta.env.VITE_API_BACKEND;

const AdminCalendar = () => {
  const [events, setEvents] = useState([]);
  const [modalOpen, setModalOpen] = useState(false); // First modal: view event
  const [editModalOpen, setEditModalOpen] = useState(false); // Second modal: edit event
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    start: '',
    end: '',
    category: '',
    link: '',
    id: null,
  });
  const [isEditing, setIsEditing] = useState(false); // Flag to determine whether we're editing or creating
  const [loading, setLoading] = useState(false); // Loading state to show spinner
  const [alert,setAlert] = useState();
  const token = localStorage.getItem('adminToken');

  const fetchEvents = async () => {
    console.log("events")
    try {
      const response = await axios.get(baseURL+'/admin/get-admin-events', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEvents(response.data.events); // Assuming each event includes 'id' (_id from DB)
      
    } catch (err) {
      console.error(err);
      setAlert(err.response.data)
    }
  };

  const createNewEvent = async (eventData) => {
    try {
      const response = await axios.post(
        baseURL+'/admin/create-new-event',
        eventData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvents(response.data.events); // Add the new event to the state
      setAlert(response.data)
    } catch (error) {
      console.error(error);
      setAlert(error.response.data)
    }
  };

  const updateEvent = async () => {
    if (eventData.id) {
      try {
        const response = await axios.put(
          baseURL+`/admin/update-event/${eventData.id}`,
          eventData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const updatedEvents = events.map((event) =>
          event.id === eventData.id ? response.data.event : event
        );
        setEvents(updatedEvents); // Update the event in the state
        setAlert(response.data)
      } catch (error) {
        console.error('Error updating event:', error);
        setAlert(error.response.data)
      }
    }
  };

  const deleteEvent = async () => {
    if (eventData.id) {
      try {
        setLoading(true); // Start loading
        const response = await axios.delete(baseURL+`/admin/delete-event/${eventData.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvents(events.filter((event) => event.id !== eventData.id)); // Remove the deleted event from state
        setModalOpen(false);
        setAlert(response.data);
      } catch (error) {
        console.error('Error deleting event:', error);
        setAlert(error.response.data)
      } finally {
        setLoading(false); // End loading
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [alert]);

  const handleSaveEvent = async () => {
    setLoading(true); // Start loading
    try {
      if (isEditing) {
        await updateEvent(); // Update existing event
      } else {
        await createNewEvent(eventData); // Create new event
      }
    } catch (error) {
      console.error('Error saving event:', error);
    } finally {
      setLoading(false); // End loading
      setEditModalOpen(false);
      setEventData({
        title: '',
        description: '',
        start: '',
        end: '',
        category: '',
        link: '',
        id: null,
      });
    }
  };

  const handleCancelEdit = () => {
    setEditModalOpen(false);
  };

  const handleCancelView = () => {
    setModalOpen(false);
  };

  const handleEdit = () => {
    setModalOpen(false);
    setIsEditing(true); // Edit mode
    setEditModalOpen(true);
  };

  const dateClick = (info) => {
    const clickedDate = info.dateStr;
    setEventData({
      title: '',
      description: '',
      start: clickedDate + "T09:00", // Set to 9 AM by default
      end: clickedDate + "T10:00", // Set to 10 AM by default
      category: '',
      link: '',
      id: null,
    });
    setIsEditing(false); // Set to false because it's a new event
    setEditModalOpen(true); // Open the form modal for event creation
  };

  const eventClick = (info) => {
    const event = info.event;
    setEventData({
      title: event.title,
      description: event.extendedProps.description,
      start: event.startStr.slice(0, 16),
      end: event.endStr.slice(0, 16),
      category: event.extendedProps.category,
      link: event.extendedProps.link,
      id: event.id,
    });
    setIsEditing(true); // Edit mode
    setModalOpen(true); // First open the view modal
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      {alert && <Alert type={alert.type} message={alert.message} onClose={()=>{setAlert(null)}} />}
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-screen-xl mx-auto min-h-screen">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable
          selectable
          events={events.map((event) => ({
            ...event,
            id: event._id,
            className: event.category === 'Work' 
                                          ? 'bg-blue-500' 
                                          : event.category === 'Other' 
                                          ? 'bg-green-500' 
                                          : 'bg-red-500',

          }))}
          dateClick={dateClick}
          eventClick={eventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height="auto"
          contentHeight="auto"
        />
      </div>

      {/* First Modal: View Event */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={handleCancelView}
        appElement={document.getElementById('root')}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto mt-24 bg-gradient-to-r from-blue-100 to-blue-50 transition-all transform"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <button
          onClick={handleCancelView}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* Event Card Design */}
        <div className="relative p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Event Details</h2>

          <div className="space-y-4">
            {/* Title Section */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700">Title:</span>
              <p className="text-lg text-gray-800 font-medium">{eventData.title}</p>
            </div>

            {/* Description Section */}
            <div className="flex items-start space-x-4">
              <span className="text-lg font-semibold text-gray-700">Description:</span>
              <p className="text-gray-700 text-md">{eventData.description}</p>
            </div>

            {/* Category Section */}
            <div className="flex items-center space-x-4">
              <span className="text-lg font-semibold text-gray-700">Category:</span>
              <span className={`px-4 py-2 rounded-full text-white text-sm ${eventData.category === 'Work' ? 'bg-blue-500' : 'bg-green-500'}`}>
                {eventData.category}
              </span>
            </div>

            {/* Link Section */}
            {eventData.link && (
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-700">Link:</span>
                <a
                  href={eventData.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 transition-all"
                >
                  {eventData.link}
                </a>
              </div>
            )}

            {/* Time Section */}
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-center space-x-2 ">
                <span className="text-lg font-semibold text-gray-700">Start:</span>
                <p className="text-gray-700 whitespace-nowrap">
                  {new Date(eventData.start).toLocaleString()}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-lg font-semibold text-gray-700">End:</span>
                <p className="text-gray-700 whitespace-nowrap">
                  {new Date(eventData.end).toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-6 flex justify-between space-x-2">
            <button
              onClick={handleEdit}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition-all flex items-center space-x-2"
            >
              <PencilIcon className="w-5 h-5" />
              <span>Edit</span>
            </button>
            <button
              onClick={deleteEvent}
              className="bg-red-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-red-600 transition-all flex items-center space-x-2"
              disabled={loading} // Disable button when loading
            >
              {loading ? (
                <span className="spinner-border animate-spin"></span>
              ) : (
                <>
                  <TrashIcon className="w-5 h-5" />
                  <span>Delete</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Modal>

      {/* Second Modal: Edit Event */}
      <Modal
        isOpen={editModalOpen}
        onRequestClose={handleCancelEdit}
        appElement={document.getElementById('root')}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto mt-24 transition-all transform"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <button
          onClick={handleCancelEdit}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>
        <div className="relative">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">Edit Event</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={eventData.title}
                onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={eventData.description}
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              ></textarea>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select
                  value={eventData.category}
                  onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option value="">Select a category</option>
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Link</label>
                <input
                  type="url"
                  value={eventData.link}
                  onChange={(e) => setEventData({ ...eventData, link: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Start</label>
                <input
                  type="datetime-local"
                  value={eventData.start}
                  onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">End</label>
                <input
                  type="datetime-local"
                  value={eventData.end}
                  onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />
              </div>
            </div>

            {/* Save and Cancel Buttons */}
            <div className="mt-6 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEvent}
                disabled={loading} // Disable save button when loading
                className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-600 transition-all"
              >
                {loading ? (
                  <span className="spinner-border animate-spin"></span>
                ) : (
                  'Save'
                )}
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCalendar;
