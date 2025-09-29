import React, { useState, useEffect } from 'react';
import { 
  PlusIcon, 
  AcademicCapIcon, 
  CalendarIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  TrashIcon,
  PencilIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  description: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

const HomeworkTracker: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'course'>('dueDate');
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    course: '',
    dueDate: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  useEffect(() => {
    // Load sample data
    setAssignments([
      {
        id: '1',
        title: 'React Project',
        course: 'CS 101',
        dueDate: '2024-10-01',
        description: 'Build a todo app with React and TypeScript',
        completed: false,
        priority: 'high',
        createdAt: '2024-09-25'
      },
      {
        id: '2',
        title: 'Calculus Homework',
        course: 'Math 205',
        dueDate: '2024-10-03',
        description: 'Complete exercises 1-20 from chapter 5',
        completed: false,
        priority: 'medium',
        createdAt: '2024-09-26'
      },
      {
        id: '3',
        title: 'Literature Essay',
        course: 'ENG 201',
        dueDate: '2024-09-30',
        description: 'Write a 5-page essay on Shakespeare',
        completed: true,
        priority: 'high',
        createdAt: '2024-09-20'
      }
    ]);
  }, []);

  const handleAddAssignment = () => {
    if (newAssignment.title && newAssignment.course && newAssignment.dueDate) {
      const assignment: Assignment = {
        id: Date.now().toString(),
        ...newAssignment,
        completed: false,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setAssignments([...assignments, assignment]);
      setNewAssignment({
        title: '',
        course: '',
        dueDate: '',
        description: '',
        priority: 'medium'
      });
      setShowAddForm(false);
    }
  };

  const handleToggleComplete = (id: string) => {
    setAssignments(assignments.map(a => 
      a.id === id ? { ...a, completed: !a.completed } : a
    ));
  };

  const handleDeleteAssignment = (id: string) => {
    setAssignments(assignments.filter(a => a.id !== id));
  };

  const getFilteredAssignments = () => {
    let filtered = assignments;
    
    if (filter === 'pending') {
      filtered = filtered.filter(a => !a.completed);
    } else if (filter === 'completed') {
      filtered = filtered.filter(a => a.completed);
    }

    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'dueDate':
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        case 'priority':
          const priorityOrder = { high: 3, medium: 2, low: 1 };
          return priorityOrder[b.priority] - priorityOrder[a.priority];
        case 'course':
          return a.course.localeCompare(b.course);
        default:
          return 0;
      }
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
      case 'medium': return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
      case 'low': return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
      default: return 'text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-900';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const isOverdue = (dueDate: string, completed: boolean) => {
    return !completed && getDaysUntilDue(dueDate) < 0;
  };

  const isDueSoon = (dueDate: string, completed: boolean) => {
    return !completed && getDaysUntilDue(dueDate) <= 2 && getDaysUntilDue(dueDate) >= 0;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Homework Tracker</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Stay on top of your assignments and deadlines
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Add Assignment</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{assignments.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Pending</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {assignments.filter(a => !a.completed).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {assignments.filter(a => a.completed).length}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Overdue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {assignments.filter(a => isOverdue(a.dueDate, a.completed)).length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="card mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="flex space-x-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Filter
              </label>
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Assignments</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="dueDate">Due Date</option>
                <option value="priority">Priority</option>
                <option value="course">Course</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Assignments List */}
      <div className="space-y-4">
        {getFilteredAssignments().map((assignment) => (
          <div
            key={assignment.id}
            className={`card ${
              assignment.completed ? 'opacity-75' : ''
            } ${
              isOverdue(assignment.dueDate, assignment.completed) 
                ? 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20' 
                : isDueSoon(assignment.dueDate, assignment.completed)
                ? 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
                : ''
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <button
                  onClick={() => handleToggleComplete(assignment.id)}
                  className="mt-1"
                >
                  {assignment.completed ? (
                    <CheckCircleIcon className="w-6 h-6 text-green-500" />
                  ) : (
                    <div className="w-6 h-6 border-2 border-gray-300 rounded-full hover:border-primary-500 transition-colors duration-200" />
                  )}
                </button>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className={`text-lg font-medium ${
                      assignment.completed 
                        ? 'line-through text-gray-500 dark:text-gray-400' 
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {assignment.title}
                    </h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(assignment.priority)}`}>
                      {assignment.priority}
                    </span>
                    {isOverdue(assignment.dueDate, assignment.completed) && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                        Overdue
                      </span>
                    )}
                    {isDueSoon(assignment.dueDate, assignment.completed) && (
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Due Soon
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-300 mb-2">
                    <div className="flex items-center space-x-1">
                      <AcademicCapIcon className="w-4 h-4" />
                      <span>{assignment.course}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CalendarIcon className="w-4 h-4" />
                      <span>Due: {assignment.dueDate}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <ClockIcon className="w-4 h-4" />
                      <span>
                        {isOverdue(assignment.dueDate, assignment.completed)
                          ? `${Math.abs(getDaysUntilDue(assignment.dueDate))} days overdue`
                          : getDaysUntilDue(assignment.dueDate) === 0
                          ? 'Due today'
                          : `${getDaysUntilDue(assignment.dueDate)} days left`
                        }
                      </span>
                    </div>
                  </div>
                  
                  {assignment.description && (
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {assignment.description}
                    </p>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                  <PencilIcon className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => handleDeleteAssignment(assignment.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Assignment Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add New Assignment</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Assignment Title
                </label>
                <input
                  type="text"
                  value={newAssignment.title}
                  onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., React Project"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Course
                </label>
                <input
                  type="text"
                  value={newAssignment.course}
                  onChange={(e) => setNewAssignment({...newAssignment, course: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., CS 101"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Due Date
                </label>
                <input
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Priority
                </label>
                <select
                  value={newAssignment.priority}
                  onChange={(e) => setNewAssignment({...newAssignment, priority: e.target.value as any})}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description (Optional)
                </label>
                <textarea
                  value={newAssignment.description}
                  onChange={(e) => setNewAssignment({...newAssignment, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Additional details about the assignment..."
                />
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
                onClick={handleAddAssignment}
                className="btn-primary"
              >
                Add Assignment
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeworkTracker;

