'use client';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import I18nProvider from '../providers/I18nProvider';

const Layout = ({ 
  children, 
  showSidebar = true,
  subjects = [],
  grades = [],
  selectedSubject = null,
  selectedGrade = null,
  onSubjectSelect = () => {},
  onGradeSelect = () => {}
}) => {
  return (
    <I18nProvider>
      <div className="min-h-screen bg-gray-50 overflow-x-hidden">
        <Navbar />
        <div className="flex">
          {showSidebar && (
            <Sidebar 
              subjects={subjects}
              grades={grades}
              selectedSubject={selectedSubject}
              selectedGrade={selectedGrade}
              onSubjectSelect={onSubjectSelect}
              onGradeSelect={onGradeSelect}
            />
          )}
          <main 
            className="flex-1 overflow-x-hidden"
            style={{ 
              paddingTop: '100px',
              minHeight: '100vh',
              marginLeft: showSidebar ? '250px' : '0'
            }}
          >
            <div className="min-h-full flex flex-col">
              <div className="flex-1">
                {children}
              </div>
            </div>
          </main>
        </div>
      </div>
    </I18nProvider>
  );
};

export default Layout;
