import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  CalendarIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

interface Class {
  id: string;
  name: string;
  time: string;
  location: string;
  nextClass: boolean;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  completed: boolean;
  urgent: boolean;
}

interface MoodEntry {
  id: string;
  mood: string;
  date: string;
  note?: string;
}

const Dashboard: React.FC = () => {
  const [upcomingClasses, setUpcomingClasses] = useState<Class[]>([]);
  const [upcomingAssignments, setUpcomingAssignments] = useState<Assignment[]>([]);
  const [recentMoods, setRecentMoods] = useState<MoodEntry[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Load sample data
    setUpcomingClasses([
      {
        id: '1',
        name: 'Computer Science 101',
        time: '10:00 AM',
        location: 'Room 201',
        nextClass: true
      },
      {
        id: '2',
        name: 'Mathematics 205',
        time: '2:00 PM',
        location: 'Room 105',
        nextClass: false
      }
    ]);

    setUpcomingAssignments([
      {
        id: '1',
        title: 'React Project',
        course: 'CS 101',
        dueDate: '2024-10-01',
        completed: false,
        urgent: true
      },
      {
        id: '2',
        title: 'Calculus Homework',
        course: 'Math 205',
        dueDate: '2024-10-03',
        completed: false,
        urgent: false
      }
    ]);

    setRecentMoods([
      {
        id: '1',
        mood: 'Happy',
        date: '2024-09-29',
        note: 'Great day, finished my project!'
      },
      {
        id: '2',
        mood: 'Stressed',
        date: '2024-09-28',
        note: 'Too many assignments due'
      }
    ]);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          {getGreeting()}, Student! 👋
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here's your academic overview for today
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {currentTime.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })} • {formatTime(currentTime)}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <CalendarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Classes Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingClasses.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Assignments</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{upcomingAssignments.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <HeartIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Mood Today</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {recentMoods[0]?.mood || 'Not logged'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
              <ClockIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Next Class</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {upcomingClasses.find(c => c.nextClass)?.time || 'None'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upcoming Classes */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Today's Classes</h2>
            <Link to="/calendar" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingClasses.map((classItem) => (
              <div key={classItem.id} className={`p-4 rounded-lg border ${
                classItem.nextClass 
                  ? 'border-primary-200 bg-primary-50 dark:border-primary-700 dark:bg-primary-900/20' 
                  : 'border-gray-200 dark:border-gray-700'
              }`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{classItem.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{classItem.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white">{classItem.time}</p>
                    {classItem.nextClass && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-200">
                        Next
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Assignments */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Upcoming Assignments</h2>
            <Link to="/homework" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingAssignments.map((assignment) => (
              <div key={assignment.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {assignment.completed ? (
                      <CheckCircleIcon className="w-5 h-5 text-green-500 mr-3" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full mr-3" />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{assignment.title}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.course}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600 dark:text-gray-300">{assignment.dueDate}</p>
                    {assignment.urgent && (
                      <ExclamationTriangleIcon className="w-4 h-4 text-red-500 mt-1" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Mood */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Mood</h2>
            <Link to="/mood" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
              Log Mood
            </Link>
          </div>
          {recentMoods.length > 0 ? (
            <div className="space-y-3">
              {recentMoods.slice(0, 2).map((mood) => (
                <div key={mood.id} className="p-4 rounded-lg border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900 dark:text-white">{mood.mood}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{mood.date}</p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                        {mood.mood}
                      </span>
                    </div>
                  </div>
                  {mood.note && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{mood.note}</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-300">No mood entries yet</p>
              <Link to="/mood" className="btn-primary mt-4 inline-block">
                Log Your First Mood
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/assistant" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white text-center">AI Assistant</p>
            </Link>
            <Link to="/analytics" className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 transition-colors duration-200">
              <ChartBarIcon className="w-8 h-8 text-primary-600 dark:text-primary-400 mx-auto mb-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white text-center">Analytics</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
