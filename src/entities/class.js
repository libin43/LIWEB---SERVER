export default function classRoom(
  className,
  academicYearID,
  schoolID,
  facultyID = null,
) {
  return {
    getClassName: () => className,
    getAcademicYearID: () => academicYearID,
    getFacultyID: () => facultyID,
    getSchoolID: () => schoolID,
  };
}
