export default function subject(
  academicYearID,
  schoolID,
  subjectCode = null,
  subjectName = null,
  facultyID = null,
) {
  return {
    getSubjectName: () => subjectName,
    getSubjectCode: () => subjectCode,
    getAcademicYearID: () => academicYearID,
    getFacultyID: () => facultyID,
    getSchoolID: () => schoolID,
  };
}
