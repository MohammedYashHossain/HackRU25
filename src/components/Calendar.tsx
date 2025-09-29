import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  CalendarIcon, 
  ClockIcon, 
  MapPinIcon,
  BellIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

interface Class {
  id: string;
  name: string;
  time: string;
  location: string;
  days: string[];
  color: string;
}

const Calendar: React.FC = () => {
  const [classes, setClasses] = useState<Class[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('');
  const [newClass, setNewClass] = useState({
    name: '',
    time: '',
    location: '',
    days: [] as string[],
    color: 'blue'
  });

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const colors = [
    { name: 'Blue', value: 'blue', class: 'bg-blue-500' },
    { name: 'Green', value: 'green', class: 'bg-green-500' },
    { name: 'Purple', value: 'purple', class: 'bg-purple-500' },
    { name: 'Red', value: 'red', class: 'bg-red-500' },
    { name: 'Yellow', value: 'yellow', class: 'bg-yellow-500' },
    { name: 'Pink', value: 'pink', class: 'bg-pink-500' }
  ];

  useEffect(() => {
    // Load sample data
    setClasses([
      {
        id: '1',
        name: 'Computer Science 101',
        time: '10:00 AM - 11:30 AM',
        location: 'Room 201',
        days: ['Monday', 'Wednesday', 'Friday'],
        color: 'blue'
      },
      {
        id: '2',
        name: 'Mathematics 205',
        time: '2:00 PM - 3:30 PM',
        location: 'Room 105',
        days: ['Tuesday', 'Thursday'],
        color: 'green'
      }
    ]);
  }, []);

  const handleAddClass = () => {
    if (newClass.name && newClass.time && newClass.days.length > 0) {
      const classToAdd: Class = {
        id: Date.now().toString(),
        ...newClass
      };
      setClasses([...classes, classToAdd]);
      setNewClass({
        name: '',
        time: '',
        location: '',
        days: [],
        color: 'blue'
      });
      setShowAddForm(false);
    }
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
  };

  const toggleDay = (day: string) => {
    setNewClass(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const getClassesForDay = (day: string) => {
    return classes.filter(c => c.days.includes(day));
  };

  const getColorClass = (color: string) => {
    const colorObj = colors.find(c => c.value === color);
    return colorObj?.class || 'bg-blue-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Class Schedule</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Manage your classes and get reminders
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Class</span>
        </button>
      </div>

      {/* Weekly Calendar View */}
      <div className="card mb-8">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Weekly Schedule</h2>
        <div className="grid grid-cols-7 gap-4">
          {days.map((day) => (
            <div key={day} className="text-center">
              <h3 className="font-medium text-gray-900 dark:text-white mb-4">{day}</h3>
              <div className="space-y-2 min-h-[200px]">
                {getClassesForDay(day).map((classItem) => (
                  <div
                    key={classItem.id}
                    className={`p-3 rounded-lg text-white text-sm ${getColorClass(classItem.color)}`}
                  >
                    <div className="font-medium">{classItem.name}</div>
                    <div className="text-xs opacity-90">{classItem.time}</div>
                    <div className="text-xs opacity-90">{classItem.location}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Class List */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">All Classes</h2>
        <div className="space-y-4">
          {classes.map((classItem) => (
            <div key={classItem.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-4 h-4 rounded-full ${getColorClass(classItem.color)}`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{classItem.name}</h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <ClockIcon className="w-4 h-4" />
                        <span>{classItem.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MapPinIcon className="w-4 h-4" />
                        <span>{classItem.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <CalendarIcon className="w-4 h-4" />
                        <span>{classItem.days.join(', ')}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <PencilIcon className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDeleteClass(classItem.id)}
                    className="p-2 text-gray-400 hover:text-red-600"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Class Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Class</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Class Name
                </label>
                <input
                  type="text"
                  value={newClass.name}
                  onChange={(e) => setNewClass({...newClass, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Computer Science 101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Time
                </label>
                <input
                  type="text"
                  value={newClass.time}
                  onChange={(e) => setNewClass({...newClass, time: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 10:00 AM - 11:30 AM"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={newClass.location}
                  onChange={(e) => setNewClass({...newClass, location: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., Room 201"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Days
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {days.map((day) => (
                    <label key={day} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newClass.days.includes(day)}
                        onChange={() => toggleDay(day)}
                        className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{day}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Color
                </label>
                <div className="flex space-x-2">
                  {colors.map((color) => (
                    <button
                      key={color.value}
                      onClick={() => setNewClass({...newClass, color: color.value})}
                      className={`w-8 h-8 rounded-full ${color.class} ${
                        newClass.color === color.value ? 'ring-2 ring-gray-400' : ''
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddForm(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleAddClass}
                className="btn-primary"
              >
                Add Class
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Calendar;
