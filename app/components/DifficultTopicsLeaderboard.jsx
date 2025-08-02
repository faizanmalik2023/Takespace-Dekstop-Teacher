"use client"

import React from 'react';

const DifficultTopicsLeaderboard = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mt-8">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-[#398AC8]">Difficult Topic Leaderboard</h2>
      </div>

      {/* Horizontally Scrollable Container */}
      <div className="overflow-x-auto always-visible-scrollbar">
        <div className="flex gap-6 min-w-max">
          {data.map((subject, subjectIndex) => (
            <div key={subjectIndex} className="min-w-[280px]">
              {/* Subject Title */}
              <div className="mb-4">
                <h3 className="text-[18px] font-semibold text-[#103358]">{subject.name}</h3>
              </div>

              {/* Topics List */}
              <div className="space-y-3">
                {subject.topics.map((topic, topicIndex) => (
                  <div 
                    key={topicIndex}
                    className="bg-[#398AC8]/10 rounded-lg p-3 flex items-center justify-between"
                  >
                    {/* Topic Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-2">
                        {/* Topic ID */}
                        <span className="text-sm text-[#6B7280] font-medium flex-shrink-0">
                          {topic.id}
                        </span>
                        {/* Topic Name */}
                        <span className="text-sm text-[#103358] font-medium leading-tight">
                          {topic.name}
                        </span>
                      </div>
                    </div>

                    {/* Count with Person Icon */}
                    <div className="flex items-center gap-1 ml-3 flex-shrink-0">
                      <img src="/icons/person.svg" alt="Person" className="w-[16px] h-[16px] text-[#398AC8] mb-[1px] mr-1" />     
                      <span className="text-sm font-bold text-[#103358]">
                        {topic.count}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .always-visible-scrollbar {
          scrollbar-width: auto;
          -ms-overflow-style: auto;
        }
        .always-visible-scrollbar::-webkit-scrollbar {
          height: 8px;
        }
        .always-visible-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .always-visible-scrollbar::-webkit-scrollbar-thumb {
          background: #c1c1c1;
          border-radius: 4px;
        }
        .always-visible-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a8a8a8;
        }
      `}</style>
    </div>
  );
};

export default DifficultTopicsLeaderboard; 