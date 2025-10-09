// Centralized enums and mappings for Grades, Subjects, and Date Ranges
// These align with existing filter labels and API parameter expectations

// --- Grade ---
// UI labels used across filters (keep order consistent with UI)
export const GRADE_LABELS = [
  'All grades',
  'Grade 1',
  'Grade 2',
  'Grade 3',
  'Grade 4',
  'Grade 5',
  'Grade 6',
  'Grade 7',
  'Grade 8',
  'Grade 9',
  'Grade 10',
  'Grade 11',
  'Grade 12',
];

// Helper: derive numeric id from a label like "Grade 6"
export const gradeIdFromLabel = (label) => {
  if (!label || label === 'All grades') return null;
  const match = String(label).match(/Grade (\d+)/);
  return match ? match[1] : null;
};

// --- Subject ---
// UI labels used across filters (keep order consistent with UI)
export const SUBJECT_LABELS = [
  'All subjects',
  'Math',
  'Science',
  'English',
  'Geography',
  'History',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'Literature',
  'Civics',
  'Economics',
  'Algebra',
  'Geometry',
];

// Map UI subject label -> API subject id (must match backend ids)
export const SUBJECT_ID_FROM_LABEL = Object.freeze({
  'Math': '1',
  'Science': '2',
  'English': '3',
  'Geography': '4',
  // Additional subjects: keep placeholders until backend ids are known
  'History': '5',
  'Physics': '6',
  'Chemistry': '7',
  'Biology': '8',
  'Computer Science': '9',
  'Literature': '10',
  'Civics': '11',
  'Economics': '12',
  'Algebra': '13',
  'Geometry': '14',
});

export const subjectIdFromLabel = (label) => SUBJECT_ID_FROM_LABEL[label] || null;

// Optional reverse mapping if needed elsewhere
export const SUBJECT_LABEL_FROM_ID = Object.freeze(
  Object.fromEntries(Object.entries(SUBJECT_ID_FROM_LABEL).map(([k, v]) => [v, k]))
);

// --- Date Range ---
// UI labels used across filters (keep order consistent with UI)
export const DATE_RANGE_LABELS = [
  'Last 30 days',
  'Last 7 days',
  'Last 90 days',
  'All time',
  'Last year',
  'Today',
  'Yesterday',
];

// Map UI label -> API query value (used by teacher analytics)
export const DATE_RANGE_API_VALUE_FROM_LABEL = Object.freeze({
  'Last 30 days': '30d',
  'Last 90 days': '90d',
  'Last 7 days': '7d',
  'All time': 'all_time',
  'Last year': 'last_year',
  'Today': 'today',
  'Yesterday': 'yesterday',
});

export const dateRangeApiValueFromLabel = (label, fallback = '30d') =>
  DATE_RANGE_API_VALUE_FROM_LABEL[label] || fallback;

// Some student endpoints may expect long-form values like 'last_30_days'
export const DATE_RANGE_STUDENT_API_VALUE_FROM_LABEL = Object.freeze({
  'Last 30 days': 'last_30_days',
  'Last 7 days': 'last_7_days',
  'Last 90 days': 'last_90_days',
  'All time': 'all_time',
  'Last year': 'last_year',
  'Today': 'today',
  'Yesterday': 'yesterday',
});

export const dateRangeStudentApiValueFromLabel = (label, fallback = 'last_30_days') =>
  DATE_RANGE_STUDENT_API_VALUE_FROM_LABEL[label] || fallback;

// Combined export for convenience
const Enums = {
  GRADE_LABELS,
  SUBJECT_LABELS,
  DATE_RANGE_LABELS,
  SUBJECT_ID_FROM_LABEL,
  SUBJECT_LABEL_FROM_ID,
  DATE_RANGE_API_VALUE_FROM_LABEL,
  DATE_RANGE_STUDENT_API_VALUE_FROM_LABEL,
  gradeIdFromLabel,
  subjectIdFromLabel,
  dateRangeApiValueFromLabel,
  dateRangeStudentApiValueFromLabel,
};

export default Enums;


