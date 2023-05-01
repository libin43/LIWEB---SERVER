export default function subject(
  subjectClasses,
  subjectName,
  subjectCode,
  academicYearID,
  facultyID,
  schoolID,
) {
  return {
    getSubjectClasses: () => subjectClasses,
    getSubjectName: () => subjectName,
    getSubjectCode: () => subjectCode,
    getAcademicYearID: () => academicYearID,
    getFacultyID: () => facultyID,
    getSchoolID: () => schoolID,
  };
}
