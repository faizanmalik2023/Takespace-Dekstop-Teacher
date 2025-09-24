'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import Layout from '../components/layout/Layout';
import TopicsDisplay from '../components/learning/TopicsDisplay';
import { api } from '../lib/api';

const LearningPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [grades, setGrades] = useState([]);
  const [units, setUnits] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  // Fetch subjects and grades on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch both subjects and grades in parallel
        const [subjectsResponse, gradesResponse] = await Promise.all([
          api.getSubjects(),
          api.getGrades()
        ]);
        
        // Process subjects data
        let subjectsWithIcons = [];
        if (subjectsResponse.statusCode === 200 && subjectsResponse.data?.results) {
          subjectsWithIcons = subjectsResponse.data.results.map(subject => ({
            id: subject.id.toString(),
            name: subject.name,
            icon: getSubjectIcon(subject.name)
          }));
          setSubjects(subjectsWithIcons);
          console.log('API subjects loaded:', subjectsWithIcons);
        }
        
        // Process grades data
        let gradesData = [];
        if (gradesResponse.statusCode === 200 && gradesResponse.data?.results) {
          gradesData = gradesResponse.data.results.map(grade => ({
            id: grade.level,
            name: grade.name,
            selected: false
          }));
          setGrades(gradesData);
          console.log('API grades loaded:', gradesData);
        }
        
        // Auto-select first subject and first grade
        if (subjectsWithIcons.length > 0 && gradesData.length > 0) {
          setSelectedSubject(subjectsWithIcons[0]);
          setSelectedGrade(gradesData[0]);
          console.log('Auto-selected:', subjectsWithIcons[0].name, gradesData[0].name);
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load subjects and grades. Please try again.');
        // No fallback data - show empty state
        setSubjects([]);
        setGrades([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Fetch units when subject or grade changes
  useEffect(() => {
    const fetchUnits = async () => {
      if (!selectedSubject || !selectedGrade) {
        console.log('Missing subject or grade:', { selectedSubject, selectedGrade });
        return;
      }

      console.log('Fetching units for:', selectedSubject.name, selectedGrade.name);
      try {
        setLoading(true);
        setError(null);
        const response = await api.getUnits(selectedSubject.id, selectedGrade.id);
        console.log('Units response:', response);
        
        if (response.statusCode === 200 && response.data && response.data.results) {
          setUnits(response.data.results);
          setSelectedUnit(null); // Reset selected unit
          console.log('Units set:', response.data.results.length);
        }
      } catch (error) {
        console.error('Error fetching units:', error);
        setError('Failed to load units. Please try again.');
        // No fallback data - show empty state
        setUnits([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUnits();
  }, [selectedSubject, selectedGrade]);

  // Helper function to get subject icon
  const getSubjectIcon = (subjectName) => {
    const iconMap = {
      'Math': '/sidebar/Math.svg',
      'Mathematics': '/sidebar/Math.svg',
      'Science': '/sidebar/Science.svg',
      'English': '/sidebar/English.svg',
      'Geography': '/sidebar/Geography.svg',
      'History': '/sidebar/Geography.svg' // Using geography icon as fallback
    };
    return iconMap[subjectName] || '/sidebar/Math.svg';
  };

  // Handle subject selection
  const handleSubjectSelect = (subject) => {
    setSelectedSubject(subject);
    setSelectedUnit(null); // Reset selected unit
  };

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
    setSelectedUnit(null); // Reset selected unit
  };

  // Handle unit selection
  const handleUnitSelect = (unit) => {
    setSelectedUnit(unit);
  };

  // Prepare units data for left column
  const unitsData = units.map(unit => {
    const mappedTopics = (unit.topics || []).map(t => ({
      id: t.id,
      name: t.name,
      status: t.mastery_level || null,
      mastery_color: t.mastery_color || null
    }));
    const unitColor = mappedTopics.length > 0 ? (mappedTopics[0].mastery_color || null) : null;
    return {
      id: unit.id,
      name: unit.name,
      grade: unit.grade,
      mastery_color: unitColor,
      statusColor: unitColor,
      topics: mappedTopics
    };
  });

  // Prepare topics data for right column
  const topicsData = selectedUnit ? selectedUnit.topics || [] : [];

  // Debug logging (only when state actually changes)
  useEffect(() => {
    console.log('LearningPage state updated:', {
      selectedSubject: selectedSubject?.name,
      selectedGrade: selectedGrade?.name,
      unitsCount: units.length,
      selectedUnit: selectedUnit?.name,
      topicsCount: topicsData.length
    });
  }, [selectedSubject, selectedGrade, units.length, selectedUnit, topicsData.length]);

  if (loading && subjects.length === 0) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-[#103358] text-lg mb-2">Loading subjects and grades...</div>
            <div className="text-gray-500 text-sm">Please wait while we fetch the data</div>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  if (error) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-red-500 text-lg mb-2">Error Loading Data</div>
            <div className="text-gray-500 text-sm text-center max-w-md">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-[#103358] text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  // Show placeholder if no subjects or grades available
  if (subjects.length === 0 || grades.length === 0) {
    return (
      <ProtectedRoute>
        <Layout>
          <div className="flex flex-col items-center justify-center h-64">
            <div className="text-gray-400 text-6xl mb-4">📚</div>
            <div className="text-gray-500 text-lg mb-2">No Data Available</div>
            <div className="text-gray-400 text-sm text-center max-w-md">
              {subjects.length === 0 && grades.length === 0 
                ? "No subjects and grades found. Please try again later."
                : subjects.length === 0 
                ? "No subjects found. Please try again later."
                : "No grades found. Please try again later."
              }
            </div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-[#103358] text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Refresh
            </button>
          </div>
        </Layout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <Layout
        showSidebar={true}
        subjects={subjects}
        grades={grades}
        selectedSubject={selectedSubject}
        selectedGrade={selectedGrade}
        onSubjectSelect={handleSubjectSelect}
        onGradeSelect={handleGradeSelect}
      >
        {/* Main Content */}
        <div className="p-4 sm:p-6 lg:p-8" style={{ paddingBottom: 'calc(var(--footer-height) + 24px)' }}>
          {/* Page Title */}
          <h1 
            className="mb-6 sm:mb-8 xs:pl-[20px]"
            style={{
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 700,
              fontSize: 'clamp(18px, 4vw, 22px)',
              lineHeight: '28px',
              color: '#1E1B39'
            }}
          >
            Units and Topics
          </h1>

          {/* Loading state for units */}
          {loading && units.length === 0 && (
            <div className="flex items-center justify-center h-32">
              <div className="text-[#103358]">Loading units...</div>
            </div>
          )}

          {/* Topics Display Component */}
          {!loading && (
          <TopicsDisplay
            leftColumn={{
                title: 'Units',
                topics: unitsData,
                showStatus: true,
                onItemClick: handleUnitSelect,
                selectedItem: selectedUnit
            }}
            rightColumn={{
                title: selectedUnit ? `${selectedUnit.name} - Topics` : 'Select a unit to view topics',
                topics: topicsData,
              showStatus: true
            }}
            maxHeight="520px"
            scrollable={true}
            showSeparator={true}
          />
          )}

          {/* No data state */}
          {!loading && units.length === 0 && selectedSubject && selectedGrade && (
            <div className="flex flex-col items-center justify-center h-32">
              <div className="text-gray-400 text-4xl mb-2">📖</div>
              <div className="text-gray-500 text-lg mb-1">No Units Available</div>
              <div className="text-gray-400 text-sm text-center">
                No units found for {selectedSubject.name} - {selectedGrade.name}
              </div>
            </div>
          )}
        </div>
      </Layout>
    </ProtectedRoute>
  );
};

export default LearningPage;