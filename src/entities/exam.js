export default function exam(
  academicYearID,
  schoolID,
  subjectID,
  examDate = null,
  examName = null,
) {
  return {
    getExamDate: () => examDate,
    getAcademicYearID: () => academicYearID,
    getSubjectID: () => subjectID,
    getExamName: () => examName,
    getSchoolID: () => schoolID,
  };
}
