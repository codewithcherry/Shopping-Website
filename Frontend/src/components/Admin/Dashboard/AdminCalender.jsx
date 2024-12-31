import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import Modal from 'react-modal';
import { XMarkIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline'; // Heroicons

const AdminCalendar = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Meeting',
      description: 'Team sync meeting',
      start: '2024-12-31T10:00:00',
      end: '2024-12-31T11:00:00',
      category: 'Work',
      link: ''
    },
    {
      id: 2,
      title: 'Conference',
      description: 'Tech conference',
      start: '2024-12-31T14:00:00',
      end: '2024-12-31T16:00:00',
      category: 'Personal',
      link: 'https://example.com'
    },
  ]);
  const [modalOpen, setModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [newEvent, setNewEvent] = useState({ title: '', description: '', start: '', end: '', category: '', link: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleDateClick = (info) => {
    setNewEvent({ title: '', description: '', start: info.dateStr, end: info.dateStr, category: '', link: '' });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEventClick = (info) => {
    const event = info.event;
    setSelectedEvent(event);
    
    // Strip the seconds from start and end times to match datetime-local format
    const start = event.startStr.slice(0, 16);  // "YYYY-MM-DDTHH:MM"
    const end = event.endStr.slice(0, 16);      // "YYYY-MM-DDTHH:MM"
    
    setNewEvent({
      title: event.title,
      description: event.extendedProps.description,
      start: start,  // Correctly formatted start time
      end: end,      // Correctly formatted end time
      category: event.extendedProps.category,
      link: event.extendedProps.link
    });
    
    setIsEditing(true);
    setDetailsModalOpen(true);
  };

  const saveEvent = () => {
    if (selectedEvent) {
      selectedEvent.setProp('title', newEvent.title);
      selectedEvent.setExtendedProp('description', newEvent.description);
      selectedEvent.setExtendedProp('link', newEvent.link);
      selectedEvent.setExtendedProp('category', newEvent.category);
      selectedEvent.setDates(newEvent.start, newEvent.end);
    } else {
      setEvents([ 
        ...events, 
        { 
          id: events.length + 1, 
          title: newEvent.title, 
          description: newEvent.description, 
          start: newEvent.start, 
          end: newEvent.end, 
          category: newEvent.category, 
          link: newEvent.link 
        }
      ]);
    }
    setModalOpen(false);
    setSelectedEvent(null);
  };

  const deleteEvent = () => {
    if (selectedEvent) {
      selectedEvent.remove();
    }
    setModalOpen(false);
    setSelectedEvent(null);
    setDetailsModalOpen(false);
  };

  const discardChanges = () => {
    setModalOpen(false);
    setIsEditing(false);
    setSelectedEvent(null);
    setDetailsModalOpen(false);
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen w-full">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-screen-xl mx-auto min-h-screen">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          editable
          selectable
          events={events.map((event) => ({
            ...event,
            className: event.category === 'Work' ? 'bg-blue-500' : 'bg-green-500',
          }))}
          dateClick={handleDateClick}
          eventClick={handleEventClick}
          headerToolbar={{
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay',
          }}
          height="auto"  // Let FullCalendar manage height dynamically based on content
          contentHeight="auto" // Ensures the calendar scales properly within the available space
        />
      </div>

      {/* Modal for adding/editing events */}
      <Modal
        isOpen={modalOpen}
        onRequestClose={discardChanges}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto mt-24 transition-all transform"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <button
            onClick={discardChanges}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-all"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        <div className="relative">
          <h2 className="text-xl font-semibold text-center mb-6 text-gray-800">
            {isEditing ? 'Edit Event' : 'Add Calendar Event'}
          </h2>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Title</label>
              <input
                type="text"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              ></textarea>
            </div>
            <div className='grid grid-cols-2 gap-2'>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <select
                value={newEvent.category}
                onChange={(e) => setNewEvent({ ...newEvent, category: e.target.value })}
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
                value={newEvent.link}
                onChange={(e) => setNewEvent({ ...newEvent, link: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>
            <div>
  <label className="block text-sm font-medium text-gray-700">Start Time</label>
  <input
    type="datetime-local"
    value={newEvent.start}  // Populated with the start time of the event
    onChange={(e) => setNewEvent({ ...newEvent, start: e.target.value })}
    className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
</div>
<div>
  <label className="block text-sm font-medium text-gray-700">End Time</label>
  <input
    type="datetime-local"
    value={newEvent.end}    // Populated with the end time of the event
    onChange={(e) => setNewEvent({ ...newEvent, end: e.target.value })}
    className="w-full border border-gray-300 rounded-xl p-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
  />
</div>


            
            </div>
          </form>
          <div className="mt-6 flex justify-end space-x-4">
            {isEditing && (
              <button
                onClick={deleteEvent}
                className="bg-red-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-red-600 transition-all flex items-center space-x-2"
              >
                <TrashIcon className="w-5 h-5" />
                <span>Delete</span>
              </button>
            )}
            <button
              onClick={discardChanges}
              className="bg-gray-400 text-white px-6 py-3 rounded-xl text-lg hover:bg-gray-500 transition-all flex items-center space-x-2"
            >
              <XMarkIcon className="w-5 h-5" />
              <span>Discard</span>
            </button>
            <button
              onClick={saveEvent}
              className="bg-blue-500 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-600 transition-all flex items-center space-x-2"
            >
              <PencilIcon className="w-5 h-5" />
              <span>Save</span>
            </button>
          </div>
        </div>
      </Modal>

      {/* Event Details Modal */}
      <Modal
        isOpen={detailsModalOpen}
        onRequestClose={() => setDetailsModalOpen(false)}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-lg mx-auto mt-24 transition-all transform"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center"
      >
        <button
          onClick={() => setDetailsModalOpen(false)}
          className="absolute top-3 right-3 bg-gray-50 rounded-full"
        >
          <XMarkIcon className="h-5 w-5 text-gray-600" />
        </button>
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-4">
            <h2 className="text-3xl font-semibold text-center text-gray-800">{selectedEvent?.title}</h2>
            <button
              onClick={() => {
                setDetailsModalOpen(false);
                setModalOpen(true);
              }}
              className="flex items-center gap-1 text-blue-500"
            >
              <PencilIcon className="h-4 w-4 text-blue-500" />
              edit
            </button>
          </div>
          <p className="text-lg text-gray-600">{selectedEvent?.extendedProps.description}</p>
          <p className="text-sm text-gray-500">Category: {selectedEvent?.extendedProps.category}</p>
          <p className="text-sm text-gray-500">
            Start Time: {new Date(selectedEvent?.start).toLocaleString()}
          </p>
          <p className="text-sm text-gray-500">
            End Time: {new Date(selectedEvent?.end).toLocaleString()}
          </p>
          <p className="text-sm text-blue-500">
            <a href={selectedEvent?.extendedProps.link} target="_blank" rel="noopener noreferrer">
              {selectedEvent?.extendedProps.link}
            </a>
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default AdminCalendar;
