"use client"

import { useState, useEffect } from "react"
import ProtectedRoute from "../components/ProtectedRoute"
import { DashboardSidebar } from "../components/Sidebar.jsx"
import { MainContent } from "../components/MainContent.jsx"
import { api } from "../lib/api"

export default function TeacherDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedGrade, setSelectedGrade] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [grades, setGrades] = useState([])
  const [students, setStudents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  // Fetch students when subject or grade changes
  useEffect(() => {
    const fetchStudents = async () => {
      if (!selectedSubject || !selectedGrade) {
        console.log('Missing subject or grade:', { selectedSubject, selectedGrade });
        return;
      }

      console.log('Fetching students for:', selectedSubject.name, selectedGrade.name);
      try {
        setLoading(true);
        setError(null);
        const response = await api.getStudentsBySubjectAndGrade(selectedSubject.id, selectedGrade.id);
        console.log('Students response:', response);
        if (response && response.results) {
          setStudents(response.results);
          console.log('Students set:', response.results.length);
        } else {
          setStudents([]);
        }
      } catch (error) {
        console.error('Error fetching students:', error);
        setError('Failed to load students. Please try again.');
        // No fallback data - show empty state
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
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
  };

  // Handle grade selection
  const handleGradeSelect = (grade) => {
    setSelectedGrade(grade);
  };


  if (error) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="text-red-500 text-lg mb-2">Error Loading Data</div>
            <div className="text-gray-500 text-sm text-center max-w-md">{error}</div>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 px-4 py-2 bg-[#103358] text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Main Layout */}
        <div className="flex">
          {/* Sidebar */}
          <DashboardSidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)} 
            selectedSubject={selectedSubject}
            selectedGrade={selectedGrade}
            onSubjectChange={handleSubjectSelect}
            onGradeChange={handleGradeSelect}
            subjects={subjects}
            grades={grades}
            loading={loading}
          />
          
          {/* Main Content */}
          <div className="flex-1 md:ml-64">
            <MainContent 
            selectedSubject={selectedSubject}
            selectedGrade={selectedGrade}
            students={students}
            loading={loading}
            />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
