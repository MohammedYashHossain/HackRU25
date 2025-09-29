import React, { useState, useEffect } from 'react';
import { 
  ChartBarIcon, 
  AcademicCapIcon, 
  HeartIcon, 
  ClockIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface AnalyticsData {
  moodTrend: {
    labels: string[];
    data: number[];
  };
  assignmentCompletion: {
    completed: number;
    pending: number;
    overdue: number;
  };
  studyTime: {
    labels: string[];
    data: number[];
  };
  productivityScore: number;
  weeklyGoals: {
    assignments: number;
    studyHours: number;
    moodEntries: number;
  };
  insights: string[];
}

const Analytics: React.FC = () => {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'semester'>('week');

  useEffect(() => {
    // Load sample analytics data
    setAnalyticsData({
      moodTrend: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        data: [7, 5, 6, 8, 4, 7, 6]
      },
      assignmentCompletion: {
        completed: 12,
        pending: 5,
        overdue: 2
      },
      studyTime: {
        labels: ['CS 101', 'Math 205', 'ENG 201', 'Physics', 'History'],
        data: [15, 12, 8, 10, 6]
      },
      productivityScore: 78,
      weeklyGoals: {
        assignments: 3,
        studyHours: 20,
        moodEntries: 7
      },
      insights: [
        "Your mood tends to be higher on Mondays and Fridays",
        "You're most productive in the morning (9-11 AM)",
        "CS 101 takes up most of your study time",
        "You've completed 63% of your assignments this semester",
        "Your stress levels are highest on Wednesdays"
      ]
    });
  }, []);

  const getMoodChartData = () => {
    if (!analyticsData) return null;
    
    return {
      labels: analyticsData.moodTrend.labels,
      datasets: [
        {
          label: 'Mood Score',
          data: analyticsData.moodTrend.data,
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
          text: 'Weekly Mood Trend',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: 10,
        },
      },
    };
  };

  const getAssignmentChartData = () => {
    if (!analyticsData) return null;
    
    return {
      labels: ['Completed', 'Pending', 'Overdue'],
      datasets: [
        {
          data: [
            analyticsData.assignmentCompletion.completed,
            analyticsData.assignmentCompletion.pending,
            analyticsData.assignmentCompletion.overdue
          ],
          backgroundColor: [
            'rgb(34, 197, 94)',
            'rgb(251, 191, 36)',
            'rgb(239, 68, 68)'
          ],
          borderWidth: 0,
        },
      ],
    };
  };

  const getStudyTimeChartData = () => {
    if (!analyticsData) return null;
    
    return {
      labels: analyticsData.studyTime.labels,
      datasets: [
        {
          label: 'Study Hours',
          data: analyticsData.studyTime.data,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
  };

  const getStudyTimeChartOptions = () => {
    return {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'Study Time by Subject',
        },
      },
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    };
  };

  const getProductivityColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900';
    return 'text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900';
  };

  const getProductivityIcon = (score: number) => {
    if (score >= 80) return <TrendingUpIcon className="w-5 h-5" />;
    if (score >= 60) return <ChartBarIcon className="w-5 h-5" />;
    return <TrendingDownIcon className="w-5 h-5" />;
  };

  if (!analyticsData) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center py-12">
          <ChartBarIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Loading analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Analytics Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Insights into your academic performance and well-being
          </p>
        </div>
        <div className="flex space-x-2">
          {(['week', 'month', 'semester'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                timeRange === range
                  ? 'bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <ChartBarIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Productivity Score</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{analyticsData.productivityScore}%</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <AcademicCapIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Assignments Completed</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.assignmentCompletion.completed}
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <HeartIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Average Mood</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {(analyticsData.moodTrend.data.reduce((a, b) => a + b, 0) / analyticsData.moodTrend.data.length).toFixed(1)}/10
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
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">Study Hours This Week</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {analyticsData.studyTime.data.reduce((a, b) => a + b, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Mood Trend Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Mood Trend</h3>
          <div className="h-64">
            {getMoodChartData() && (
              <Line data={getMoodChartData()!} options={getMoodChartOptions()} />
            )}
          </div>
        </div>

        {/* Assignment Status */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Assignment Status</h3>
          <div className="h-64 flex items-center justify-center">
            {getAssignmentChartData() && (
              <Doughnut data={getAssignmentChartData()!} />
            )}
          </div>
        </div>
      </div>

      {/* Study Time Chart */}
      <div className="card mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Study Time by Subject</h3>
        <div className="h-64">
          {getStudyTimeChartData() && (
            <Bar data={getStudyTimeChartData()!} options={getStudyTimeChartOptions()} />
          )}
        </div>
      </div>

      {/* Goals and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Goals */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Weekly Goals Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Assignments</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {analyticsData.weeklyGoals.assignments}/5
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(analyticsData.weeklyGoals.assignments / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Study Hours</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {analyticsData.weeklyGoals.studyHours}/25
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-600 h-2 rounded-full" 
                  style={{ width: `${(analyticsData.weeklyGoals.studyHours / 25) * 100}%` }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Mood Entries</span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {analyticsData.weeklyGoals.moodEntries}/7
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full" 
                  style={{ width: `${(analyticsData.weeklyGoals.moodEntries / 7) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Personal Insights</h3>
          <div className="space-y-3">
            {analyticsData.insights.map((insight, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2"></div>
                <p className="text-sm text-gray-600 dark:text-gray-300">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Productivity Score Detail */}
      <div className="card mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Productivity Analysis</h3>
          <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium ${getProductivityColor(analyticsData.productivityScore)}`}>
            {getProductivityIcon(analyticsData.productivityScore)}
            <span>{analyticsData.productivityScore}% Productive</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">85%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Assignment Completion Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">6.2/10</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Average Mood Score</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">51h</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Total Study Time</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
