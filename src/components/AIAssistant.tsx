import React, { useState, useRef, useEffect } from 'react';
import { 
  ChatBubbleLeftRightIcon, 
  PaperAirplaneIcon,
  SparklesIcon,
  UserIcon,
  CpuChipIcon
} from '@heroicons/react/24/outline';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  type?: 'text' | 'suggestion' | 'action';
}

interface Suggestion {
  id: string;
  text: string;
  action?: string;
}

const AIAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm your AI study assistant. I can help you with your schedule, assignments, mood tracking, and more. What can I help you with today?",
      sender: 'assistant',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions: Suggestion[] = [
    { id: '1', text: "What assignments are due this week?", action: 'check_assignments' },
    { id: '2', text: "Show me my schedule for today", action: 'check_schedule' },
    { id: '3', text: "How can I improve my study habits?", action: 'study_tips' },
    { id: '4', text: "I'm feeling stressed, what should I do?", action: 'stress_help' },
    { id: '5', text: "What mental health resources are available?", action: 'mental_health' },
    { id: '6', text: "Help me plan my study schedule", action: 'study_planning' }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(text.trim());
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble connecting right now. Please try again later.",
        sender: 'assistant',
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAIResponse = async (userInput: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const input = userInput.toLowerCase();

    // Check for specific patterns and provide contextual responses
    if (input.includes('assignment') || input.includes('homework') || input.includes('due')) {
      return "I can help you with your assignments! Based on your homework tracker, you have a React Project due on October 1st and Calculus Homework due on October 3rd. The React Project is marked as high priority. Would you like me to help you break down these assignments into smaller tasks or create a study schedule?";
    }

    if (input.includes('schedule') || input.includes('class') || input.includes('today')) {
      return "Looking at your schedule, you have Computer Science 101 at 10:00 AM in Room 201 and Mathematics 205 at 2:00 PM in Room 105 today. Don't forget to set a reminder 30 minutes before each class! Would you like me to help you plan your day around these classes?";
    }

    if (input.includes('mood') || input.includes('feeling') || input.includes('stressed') || input.includes('anxious')) {
      return "I notice you've been tracking your mood. Based on your recent entries, you've had some ups and downs. For stress management, I recommend trying the 4-7-8 breathing technique, taking short breaks between study sessions, and using the mental health resources available. Would you like me to show you some specific stress-relief techniques or connect you with resources?";
    }

    if (input.includes('study') || input.includes('learn') || input.includes('productivity')) {
      return "Great question! Here are some effective study strategies: 1) Use the Pomodoro Technique (25 min focus, 5 min break), 2) Create a dedicated study space, 3) Use active recall and spaced repetition, 4) Take regular breaks to maintain focus. I can also help you create a personalized study schedule based on your classes and assignments. What subject would you like to focus on?";
    }

    if (input.includes('resource') || input.includes('help') || input.includes('support')) {
      return "I'm here to help! You have access to several resources: mental health support (Crisis Text Line, National Suicide Prevention Lifeline), academic tools (GitHub Student Pack, Office 365), and financial benefits (Spotify Premium Student, Amazon Prime Student). For immediate crisis support, text HOME to 741741 or call 988. What specific type of support are you looking for?";
    }

    if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
      return "Hello! I'm your AI study assistant, here to help you succeed academically and maintain your well-being. I can assist with scheduling, assignments, mood tracking, study tips, and connecting you with resources. What would you like to work on today?";
    }

    if (input.includes('thank') || input.includes('thanks')) {
      return "You're very welcome! I'm here whenever you need help with your studies, schedule, or just want to chat. Don't hesitate to reach out if you have any questions or need support. Good luck with your studies!";
    }

    // Default response for unrecognized input
    return "I understand you're asking about that. I can help you with your academic schedule, homework tracking, mood monitoring, study strategies, and connecting you with student resources. Could you be more specific about what you'd like assistance with? For example, you could ask about your assignments, schedule, study tips, or available resources.";
  };

  const handleSuggestionClick = (suggestion: Suggestion) => {
    handleSendMessage(suggestion.text);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Study Assistant</h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Your intelligent companion for academic success and well-being
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Chat Interface */}
        <div className="lg:col-span-3">
          <div className="card h-[600px] flex flex-col">
            {/* Chat Header */}
            <div className="flex items-center space-x-3 p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg">
                <CpuChipIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Always here to help</p>
              </div>
              <div className="ml-auto">
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">Online</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start space-x-3 max-w-[80%] ${
                    message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}>
                    <div className={`p-2 rounded-full ${
                      message.sender === 'user' 
                        ? 'bg-primary-600' 
                        : 'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {message.sender === 'user' ? (
                        <UserIcon className="w-5 h-5 text-white" />
                      ) : (
                        <SparklesIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                      )}
                    </div>
                    <div className={`rounded-lg p-3 ${
                      message.sender === 'user'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                      <p className={`text-xs mt-1 ${
                        message.sender === 'user' 
                          ? 'text-primary-100' 
                          : 'text-gray-500 dark:text-gray-400'
                      }`}>
                        {formatTime(message.timestamp)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-3">
                    <div className="p-2 rounded-full bg-gray-200 dark:bg-gray-700">
                      <SparklesIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                    </div>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-3">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex space-x-3">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputText)}
                  placeholder="Ask me anything about your studies, schedule, or well-being..."
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  disabled={isLoading}
                />
                <button
                  onClick={() => handleSendMessage(inputText)}
                  disabled={!inputText.trim() || isLoading}
                  className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Suggestions Sidebar */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {suggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors duration-200"
                  disabled={isLoading}
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300">{suggestion.text}</p>
                </button>
              ))}
            </div>
          </div>

          {/* AI Capabilities */}
          <div className="card mt-6">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">What I Can Help With</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Schedule Management</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Assignment Tracking</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Mood & Wellness</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Study Strategies</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-300">Resource Access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
