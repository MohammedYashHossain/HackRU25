import React, { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  FaceSmileIcon,
  FaceFrownIcon,
  PlusIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface MoodEntry {
  id: string;
  mood: string;
  date: string;
  note: string;
  energy: number;
  stress: number;
}

const MoodTracker: React.FC = () => {
  const [moodEntries, setMoodEntries] = useState<MoodEntry[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newMood, setNewMood] = useState({
    mood: '',
    note: '',
    energy: 5,
    stress: 5
  });

  const moods = [
    { value: 'excited', label: 'Excited', emoji: '🤩', color: 'bg-yellow-500' },
    { value: 'happy', label: 'Happy', emoji: '😊', color: 'bg-green-500' },
    { value: 'content', label: 'Content', emoji: '😌', color: 'bg-blue-500' },
    { value: 'neutral', label: 'Neutral', emoji: '😐', color: 'bg-gray-500' },
    { value: 'tired', label: 'Tired', emoji: '😴', color: 'bg-purple-500' },
    { value: 'stressed', label: 'Stressed', emoji: '😰', color: 'bg-orange-500' },
    { value: 'anxious', label: 'Anxious', emoji: '😟', color: 'bg-red-500' },
    { value: 'sad', label: 'Sad', emoji: '😢', color: 'bg-indigo-500' }
  ];

  useEffect(() => {
    // Load sample data
    setMoodEntries([
      {
        id: '1',
        mood: 'happy',
        date: '2024-09-29',
        note: 'Great day, finished my project!',
        energy: 8,
        stress: 2
      },
      {
        id: '2',
        mood: 'stressed',
        date: '2024-09-28',
        note: 'Too many assignments due',
        energy: 4,
        stress: 8
      },
      {
        id: '3',
        mood: 'content',
        date: '2024-09-27',
        note: 'Peaceful day, good study session',
        energy: 6,
        stress: 3
      },
      {
        id: '4',
        mood: 'excited',
        date: '2024-09-26',
        note: 'Got accepted to internship!',
        energy: 9,
        stress: 1
      },
      {
        id: '5',
        mood: 'tired',
        date: '2024-09-25',
        note: 'Long day of classes',
        energy: 3,
        stress: 5
      }
    ]);
  }, []);

  const handleAddMood = () => {
    if (newMood.mood) {
      const moodEntry: MoodEntry = {
        id: Date.now().toString(),
        ...newMood,
        date: new Date().toISOString().split('T')[0]
      };
      setMoodEntries([moodEntry, ...moodEntries]);
      setNewMood({
        mood: '',
        note: '',
        energy: 5,
        stress: 5
      });
      setShowAddForm(false);
    }
  };

  const getMoodData = (moodValue: string) => {
    return moods.find(m => m.value === moodValue);
  };

  const getMoodChartData = () => {
    const last7Days = moodEntries.slice(0, 7).reverse();
    const moodValues = last7Days.map(entry => {
      const moodData = getMoodData(entry.mood);
      return moodData ? moods.indexOf(moodData) : 0;
    });
    const dates = last7Days.map(entry => 
      new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    );

    return {
      labels: dates,
      datasets: [
        {
          label: 'Mood',
          data: moodValues,
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
        },
      ],
    };
  };

  const getMoodChartOptions = () => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Mood Trend (Last 7 Days)',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: moods.length - 1,
          ticks: {
            callback: function(value: any) {
              return moods[value]?.label || '';
            }
          }
        },
      },
    };
  };

  const getAverageMood = () => {
    if (moodEntries.length === 0) return null;
    const total = moodEntries.reduce((sum, entry) => {
      const moodData = getMoodData(entry.mood);
      return sum + (moodData ? moods.indexOf(moodData) : 0);
    }, 0);
    return moods[Math.round(total / moodEntries.length)];
  };

  const getMoodInsights = () => {
    const insights = [];
    const avgMood = getAverageMood();
    
    if (avgMood) {
      insights.push(`Your average mood is ${avgMood.label.toLowerCase()}`);
    }
    
    const highStressDays = moodEntries.filter(entry => entry.stress >= 7).length;
    if (highStressDays > 0) {
      insights.push(`You've had ${highStressDays} high-stress day${highStressDays > 1 ? 's' : ''} recently`);
    }
    
    const highEnergyDays = moodEntries.filter(entry => entry.energy >= 7).length;
    if (highEnergyDays > 0) {
      insights.push(`You've had ${highEnergyDays} high-energy day${highEnergyDays > 1 ? 's' : ''} recently`);
    }
    
    return insights;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mood Tracker</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track your daily mood and emotional well-being
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <PlusIcon className="w-5 h-5" />
          <span>Log Mood</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <HeartIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Total Entries</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{moodEntries.length}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <FaceSmileIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {getAverageMood()?.emoji || '😐'} {getAverageMood()?.label || 'No data'}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Streak</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {moodEntries.length} days
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mood Chart */}
      {moodEntries.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Mood Trend</h2>
          <div className="h-64">
            <Line data={getMoodChartData()} options={getMoodChartOptions()} />
          </div>
        </div>
      )}

      {/* Insights */}
      {moodEntries.length > 0 && (
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Insights</h2>
          <div className="space-y-2">
            {getMoodInsights().map((insight, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-primary-500 rounded-full"></div>
                <p className="text-gray-600 dark:text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Entries */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Recent Entries</h2>
        {moodEntries.length > 0 ? (
          <div className="space-y-4">
            {moodEntries.slice(0, 5).map((entry) => {
              const moodData = getMoodData(entry.mood);
              return (
                <div key={entry.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${moodData?.color || 'bg-gray-500'}`}>
                        <span className="text-2xl">{moodData?.emoji || '😐'}</span>
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {moodData?.label || entry.mood}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {new Date(entry.date).toLocaleDateString('en-US', { 
                            weekday: 'long', 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}
                        </p>
                        {entry.note && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{entry.note}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Energy: {entry.energy}/10
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        Stress: {entry.stress}/10
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-8">
            <HeartIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-300">No mood entries yet</p>
            <button
              onClick={() => setShowAddForm(true)}
              className="btn-primary mt-4"
            >
              Log Your First Mood
            </button>
          </div>
        )}
      </div>

      {/* Add Mood Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">How are you feeling?</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Select your mood
                </label>
                <div className="grid grid-cols-4 gap-3">
                  {moods.map((mood) => (
                    <button
                      key={mood.value}
                      onClick={() => setNewMood({...newMood, mood: mood.value})}
                      className={`p-3 rounded-lg border-2 transition-colors duration-200 ${
                        newMood.mood === mood.value
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                      }`}
                    >
                      <div className="text-2xl mb-1">{mood.emoji}</div>
                      <div className="text-xs text-gray-600 dark:text-gray-300">{mood.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Energy Level (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newMood.energy}
                  onChange={(e) => setNewMood({...newMood, energy: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Low</span>
                  <span>{newMood.energy}</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stress Level (1-10)
                </label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={newMood.stress}
                  onChange={(e) => setNewMood({...newMood, stress: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                  <span>Low</span>
                  <span>{newMood.stress}</span>
                  <span>High</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Note (Optional)
                </label>
                <textarea
                  value={newMood.note}
                  onChange={(e) => setNewMood({...newMood, note: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="How was your day? What's on your mind?"
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
                onClick={handleAddMood}
                disabled={!newMood.mood}
                className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Mood
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MoodTracker;

