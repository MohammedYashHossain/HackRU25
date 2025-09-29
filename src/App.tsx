import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import Calendar from './components/Calendar';
import HomeworkTracker from './components/HomeworkTracker';
import MoodTracker from './components/MoodTracker';
import Resources from './components/Resources';
import AIAssistant from './components/AIAssistant';
import Analytics from './components/Analytics';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''}`}>
      <div className="bg-gray-50 dark:bg-gray-900 min-h-screen">
        <Router>
          <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="pt-16">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/homework" element={<HomeworkTracker />} />
              <Route path="/mood" element={<MoodTracker />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/assistant" element={<AIAssistant />} />
              <Route path="/analytics" element={<Analytics />} />
            </Routes>
          </main>
        </Router>
      </div>
    </div>
  );
}

export default App;
