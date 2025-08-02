"use client"

import React, { useState } from 'react';

// iPhone-style Toggle Switch Component
const IPhoneToggle = ({ isCompleted, onToggle, id }) => {
  return (
    <button
      onClick={() => onToggle(id)}
      className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
        isCompleted ? 'bg-[#103358]' : 'bg-gray-300'
      }`}
    >
      <span
        className={`inline-flex h-5 w-5 transform rounded-full bg-white transition-transform items-center justify-center ${
          isCompleted ? 'translate-x-6' : 'translate-x-1'
        }`}
      >
        {isCompleted ? (
          <img src='/icons/Group.svg' className="w-3 h-3 ">
          </img>
        ) : (
            <img src='/icons/Icon.svg' className="w-3 h-3 ">
          </img>
        )}
      </span>
    </button>
  );
};

// Progress Indicator Dot Component
const ProgressDot = ({ status }) => {
  const getColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-yellow-500';
      case 'needs-work':
        return 'bg-orange-500';
      case 'not-started':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className={`w-2 h-2 rounded-full ${getColor()}`}></div>
  );
};

// SubTopic Item Component for Left Half
const SubTopicItem = ({ subtopic, onToggle }) => {
  return (
    <div className="flex items-center justify-between py-2 px-1">
      <div className="flex items-center space-x-3 flex-1">
        <span className="text-sm text-gray-700 min-w-[20px]">
          {subtopic.number}.
        </span>
        <span className="text-sm text-gray-700 flex-1">
          {subtopic.title}
        </span>
      </div>
      <div className="flex items-center space-x-3">
        <ProgressDot status={subtopic.status} />
        <IPhoneToggle 
          isCompleted={subtopic.isCompleted} 
          onToggle={onToggle} 
          id={subtopic.id}
        />
      </div>
    </div>
  );
};

// Topic Item Component for Right Half
const TopicItem = ({ topic, onToggle }) => {
  return (
    <div className="flex items-center space-x-3 py-1.5">
      <IPhoneToggle 
        isCompleted={topic.isCompleted} 
        onToggle={onToggle} 
        id={topic.id}
      />
      <span className="text-sm text-gray-700 leading-relaxed">
        {topic.number}. {topic.title}
      </span>
    </div>
  );
};

// Main Units and Topics Component
const UnitsAndTopicsComponent = ({ dateRange, grade, subject, fullScreen = false }) => {
  const [subtopics, setSubtopics] = useState(() => {
    return getMockSubtopics(grade, subject);
  });

  const [topics, setTopics] = useState(() => {
    return getMockTopics(grade, subject);
  });

  const handleSubTopicToggle = (subtopicId) => {
    setSubtopics(prevSubtopics => 
      prevSubtopics.map(subtopic => 
        subtopic.id === subtopicId 
          ? { ...subtopic, isCompleted: !subtopic.isCompleted }
          : subtopic
      )
    );
  };

  const handleTopicToggle = (topicId) => {
    setTopics(prevTopics => 
      prevTopics.map(topic => 
        topic.id === topicId 
          ? { ...topic, isCompleted: !topic.isCompleted }
          : topic
      )
    );
  };

  return (
    <div className={`${fullScreen ? 'h-screen w-full bg-white' : 'space-y-6 rounded-lg border bg-white p-6'}`}>
      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .blue-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .blue-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        
        .blue-scrollbar::-webkit-scrollbar-thumb {
          background: #103358;
          border-radius: 3px;
        }
        
        .blue-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0a1f2e;
        }
        
        .blue-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #103358 #f1f1f1;
        }
      `}</style>

      {/* Section Title - Only show if not fullScreen */}
      {!fullScreen && (
        <div>
          <h2 className="text-lg font-medium text-gray-500 mb-2">Statistics</h2>
          <h1 className="text-2xl font-bold text-gray-900">Units and Topics</h1>
        </div>
      )}

      {/* Two Column Layout */}
      <div className={`flex gap-6 ${fullScreen ? 'h-full p-6' : ''}`}>
        {/* Left Half - Main Topic with Subtopics */}
        <div className="w-1/2">
          <div className={`${fullScreen ? 'h-full' : ''} rounded-lg p-4`}>
            {/* Main Topic Title */}
            <h3 className="text-lg font-bold text-gray-900 mb-4">5.1 Fractions</h3>
            
            {/* Scrollable Subtopics List */}
            <div className={`${fullScreen ? 'h-[calc(100%-4rem)]' : 'max-h-96'} overflow-y-auto pr-2 blue-scrollbar`}>
              <div className="space-y-0">
                {subtopics.map((subtopic) => (
                  <SubTopicItem 
                    key={subtopic.id} 
                    subtopic={subtopic} 
                    onToggle={handleSubTopicToggle}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Half - Units and Topics List */}
        <div className="w-1/2">
          <div className={`${fullScreen ? 'h-full' : ''} p-4`}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Units and Topics</h3>
            
            {/* Topics List */}
            <div className={`space-y-0.5 ${fullScreen ? 'h-[calc(100%-4rem)]' : 'max-h-96'} overflow-y-auto pr-2 blue-scrollbar`}>
              {topics.map((topic) => (
                <TopicItem 
                  key={topic.id} 
                  topic={topic} 
                  onToggle={handleTopicToggle}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data function for subtopics - this would be replaced with API call
const getMockSubtopics = (grade, subject) => {
  const subtopicsBySubject = {
    math: [
      { id: 1, number: 1, title: "Fractions of a number", status: 'completed', isCompleted: true },
      { id: 2, number: 2, title: "Convert decimals to fractions", status: 'completed', isCompleted: true },
      { id: 3, number: 3, title: "Add three or more fractions with unlike denominators", status: 'completed', isCompleted: true },
      { id: 4, number: 4, title: "Subtract fractions with unlike denominators", status: 'in-progress', isCompleted: false },
      { id: 5, number: 5, title: "Multiply fractions by whole numbers", status: 'not-started', isCompleted: false },
      { id: 6, number: 6, title: "Divide fractions by whole numbers", status: 'needs-work', isCompleted: false },
      { id: 7, number: 7, title: "Solve word problems involving fractions", status: 'needs-work', isCompleted: false },
      { id: 8, number: 8, title: "Compare fractions using benchmarks", status: 'not-started', isCompleted: false },
      { id: 9, number: 9, title: "Order fractions from least to greatest", status: 'not-started', isCompleted: false },
      { id: 10, number: 10, title: "Convert mixed numbers to improper fractions", status: 'not-started', isCompleted: false },
      { id: 11, number: 11, title: "Convert improper fractions to mixed numbers", status: 'not-started', isCompleted: false },
      { id: 12, number: 12, title: "Add mixed numbers", status: 'not-started', isCompleted: false },
      { id: 13, number: 13, title: "Subtract mixed numbers", status: 'not-started', isCompleted: false },
      { id: 14, number: 14, title: "Multiply mixed numbers", status: 'not-started', isCompleted: false },
      { id: 15, number: 15, title: "Divide mixed numbers", status: 'not-started', isCompleted: false }
    ],
    science: [
      { id: 1, number: 1, title: "Scientific method steps", status: 'completed', isCompleted: true },
      { id: 2, number: 2, title: "Formulating hypotheses", status: 'completed', isCompleted: true },
      { id: 3, number: 3, title: "Designing experiments", status: 'completed', isCompleted: true },
      { id: 4, number: 4, title: "Collecting data", status: 'in-progress', isCompleted: false },
      { id: 5, number: 5, title: "Analyzing results", status: 'not-started', isCompleted: false },
      { id: 6, number: 6, title: "Drawing conclusions", status: 'needs-work', isCompleted: false },
      { id: 7, number: 7, title: "Understanding variables", status: 'needs-work', isCompleted: false },
      { id: 8, number: 8, title: "Control groups vs experimental groups", status: 'not-started', isCompleted: false },
      { id: 9, number: 9, title: "Types of scientific evidence", status: 'not-started', isCompleted: false },
      { id: 10, number: 10, title: "Peer review process", status: 'not-started', isCompleted: false },
      { id: 11, number: 11, title: "Scientific communication", status: 'not-started', isCompleted: false },
      { id: 12, number: 12, title: "Ethics in scientific research", status: 'not-started', isCompleted: false }
    ],
    english: [
      { id: 1, number: 1, title: "Reading comprehension strategies", status: 'completed', isCompleted: true },
      { id: 2, number: 2, title: "Identifying main ideas", status: 'completed', isCompleted: true },
      { id: 3, number: 3, title: "Finding supporting details", status: 'completed', isCompleted: true },
      { id: 4, number: 4, title: "Making inferences", status: 'in-progress', isCompleted: false },
      { id: 5, number: 5, title: "Understanding context clues", status: 'not-started', isCompleted: false },
      { id: 6, number: 6, title: "Analyzing text structure", status: 'needs-work', isCompleted: false },
      { id: 7, number: 7, title: "Identifying author's purpose", status: 'needs-work', isCompleted: false },
      { id: 8, number: 8, title: "Understanding point of view", status: 'not-started', isCompleted: false },
      { id: 9, number: 9, title: "Analyzing character development", status: 'not-started', isCompleted: false },
      { id: 10, number: 10, title: "Understanding theme", status: 'not-started', isCompleted: false },
      { id: 11, number: 11, title: "Identifying literary devices", status: 'not-started', isCompleted: false },
      { id: 12, number: 12, title: "Writing clear sentences", status: 'not-started', isCompleted: false }
    ],
    geography: [
      { id: 1, number: 1, title: "Reading different map types", status: 'completed', isCompleted: true },
      { id: 2, number: 2, title: "Understanding map symbols", status: 'completed', isCompleted: true },
      { id: 3, number: 3, title: "Using map scales", status: 'completed', isCompleted: true },
      { id: 4, number: 4, title: "Reading coordinates", status: 'in-progress', isCompleted: false },
      { id: 5, number: 5, title: "Understanding latitude and longitude", status: 'not-started', isCompleted: false },
      { id: 6, number: 6, title: "Identifying continents and oceans", status: 'needs-work', isCompleted: false },
      { id: 7, number: 7, title: "Understanding climate zones", status: 'needs-work', isCompleted: false },
      { id: 8, number: 8, title: "Learning about landforms", status: 'not-started', isCompleted: false },
      { id: 9, number: 9, title: "Understanding natural resources", status: 'not-started', isCompleted: false },
      { id: 10, number: 10, title: "Learning about cultures", status: 'not-started', isCompleted: false },
      { id: 11, number: 11, title: "Understanding population distribution", status: 'not-started', isCompleted: false },
      { id: 12, number: 12, title: "Learning about economic activities", status: 'not-started', isCompleted: false }
    ],
    history: [
      { id: 1, number: 1, title: "Understanding historical timelines", status: 'completed', isCompleted: true },
      { id: 2, number: 2, title: "Reading primary sources", status: 'completed', isCompleted: true },
      { id: 3, number: 3, title: "Analyzing secondary sources", status: 'completed', isCompleted: true },
      { id: 4, number: 4, title: "Identifying cause and effect", status: 'in-progress', isCompleted: false },
      { id: 5, number: 5, title: "Understanding historical context", status: 'not-started', isCompleted: false },
      { id: 6, number: 6, title: "Learning about ancient civilizations", status: 'needs-work', isCompleted: false },
      { id: 7, number: 7, title: "Understanding cultural achievements", status: 'needs-work', isCompleted: false },
      { id: 8, number: 8, title: "Learning about trade routes", status: 'not-started', isCompleted: false },
      { id: 9, number: 9, title: "Understanding political systems", status: 'not-started', isCompleted: false },
      { id: 10, number: 10, title: "Learning about social structures", status: 'not-started', isCompleted: false },
      { id: 11, number: 11, title: "Understanding technological advances", status: 'not-started', isCompleted: false },
      { id: 12, number: 12, title: "Learning about historical figures", status: 'not-started', isCompleted: false }
    ]
  };

  return subtopicsBySubject[subject] || subtopicsBySubject.math;
};

// Mock data function for topics - this would be replaced with API call
const getMockTopics = (grade, subject) => {
  // Different topics based on grade and subject
  const topicsBySubject = {
    math: [
      { id: 1, number: 1, title: "Multiply a decimal by a power of ten", isCompleted: false },
      { id: 2, number: 2, title: "Decimal division patterns over increasing place values", isCompleted: false },
      { id: 3, number: 3, title: "Add and subtract decimals: word problems", isCompleted: false },
      { id: 4, number: 4, title: "Multiply decimals and whole numbers: word problems", isCompleted: false },
      { id: 5, number: 5, title: "Divide decimals by whole numbers", isCompleted: false },
      { id: 6, number: 6, title: "Divide decimals by decimals", isCompleted: false },
      { id: 7, number: 7, title: "Convert between fractions and decimals", isCompleted: false },
      { id: 8, number: 8, title: "Compare decimals and fractions", isCompleted: false },
      { id: 9, number: 9, title: "Order decimals and fractions", isCompleted: false },
      { id: 10, number: 10, title: "Add and subtract fractions with unlike denominators", isCompleted: false },
      { id: 11, number: 11, title: "Multiply fractions by whole numbers", isCompleted: false },
      { id: 12, number: 12, title: "Divide fractions by whole numbers", isCompleted: false },
      { id: 13, number: 13, title: "Solve problems involving mixed numbers", isCompleted: false },
      { id: 14, number: 14, title: "Convert between mixed numbers and improper fractions", isCompleted: false },
      { id: 15, number: 15, title: "Add and subtract mixed numbers", isCompleted: false }
    ],
    science: [
      { id: 1, number: 1, title: "Introduction to scientific method", isCompleted: false },
      { id: 2, number: 2, title: "Understanding variables and controls", isCompleted: false },
      { id: 3, number: 3, title: "Data collection and analysis", isCompleted: false },
      { id: 4, number: 4, title: "Drawing conclusions from experiments", isCompleted: false },
      { id: 5, number: 5, title: "Understanding ecosystems", isCompleted: false },
      { id: 6, number: 6, title: "Food chains and food webs", isCompleted: false },
      { id: 7, number: 7, title: "Adaptations and survival", isCompleted: false },
      { id: 8, number: 8, title: "Life cycles of plants and animals", isCompleted: false },
      { id: 9, number: 9, title: "Properties of matter", isCompleted: false },
      { id: 10, number: 10, title: "States of matter and changes", isCompleted: false },
      { id: 11, number: 11, title: "Energy and its forms", isCompleted: false },
      { id: 12, number: 12, title: "Simple machines and their uses", isCompleted: false }
    ],
    english: [
      { id: 1, number: 1, title: "Reading comprehension strategies", isCompleted: false },
      { id: 2, number: 2, title: "Identifying main idea and supporting details", isCompleted: false },
      { id: 3, number: 3, title: "Understanding context clues", isCompleted: false },
      { id: 4, number: 4, title: "Making inferences and predictions", isCompleted: false },
      { id: 5, number: 5, title: "Understanding figurative language", isCompleted: false },
      { id: 6, number: 6, title: "Identifying story elements", isCompleted: false },
      { id: 7, number: 7, title: "Understanding point of view", isCompleted: false },
      { id: 8, number: 8, title: "Analyzing character development", isCompleted: false },
      { id: 9, number: 9, title: "Understanding theme and message", isCompleted: false },
      { id: 10, number: 10, title: "Writing clear and coherent sentences", isCompleted: false },
      { id: 11, number: 11, title: "Using proper grammar and punctuation", isCompleted: false },
      { id: 12, number: 12, title: "Organizing ideas in paragraphs", isCompleted: false }
    ],
    geography: [
      { id: 1, number: 1, title: "Understanding maps and globes", isCompleted: false },
      { id: 2, number: 2, title: "Reading different types of maps", isCompleted: false },
      { id: 3, number: 3, title: "Understanding latitude and longitude", isCompleted: false },
      { id: 4, number: 4, title: "Identifying continents and oceans", isCompleted: false },
      { id: 5, number: 5, title: "Understanding climate zones", isCompleted: false },
      { id: 6, number: 6, title: "Learning about different landforms", isCompleted: false },
      { id: 7, number: 7, title: "Understanding natural resources", isCompleted: false },
      { id: 8, number: 8, title: "Learning about different cultures", isCompleted: false },
      { id: 9, number: 9, title: "Understanding population distribution", isCompleted: false },
      { id: 10, number: 10, title: "Learning about economic activities", isCompleted: false },
      { id: 11, number: 11, title: "Understanding environmental issues", isCompleted: false },
      { id: 12, number: 12, title: "Learning about global connections", isCompleted: false }
    ],
    history: [
      { id: 1, number: 1, title: "Understanding historical timelines", isCompleted: false },
      { id: 2, number: 2, title: "Learning about primary and secondary sources", isCompleted: false },
      { id: 3, number: 3, title: "Understanding cause and effect in history", isCompleted: false },
      { id: 4, number: 4, title: "Learning about ancient civilizations", isCompleted: false },
      { id: 5, number: 5, title: "Understanding cultural achievements", isCompleted: false },
      { id: 6, number: 6, title: "Learning about trade and exploration", isCompleted: false },
      { id: 7, number: 7, title: "Understanding political systems", isCompleted: false },
      { id: 8, number: 8, title: "Learning about social structures", isCompleted: false },
      { id: 9, number: 9, title: "Understanding technological advances", isCompleted: false },
      { id: 10, number: 10, title: "Learning about historical figures", isCompleted: false },
      { id: 11, number: 11, title: "Understanding historical events", isCompleted: false },
      { id: 12, number: 12, title: "Learning about historical impact", isCompleted: false }
    ]
  };

  // Return topics based on selected subject, default to math if subject not found
  return topicsBySubject[subject] || topicsBySubject.math;
};

export default UnitsAndTopicsComponent; 