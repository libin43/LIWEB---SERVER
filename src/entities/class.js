export default function classRoom(
  className,
  academicYearID,
  facultyID,
  schoolID,
) {
  return {
    getClassName: () => className,
    getAcademicYearID: () => academicYearID,
    getFacultyID: () => facultyID,
    getSchoolID: () => schoolID,
  };
}
