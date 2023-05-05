export default function academicYearRepository(repository) {
  const isAcademicYearValidLimit = (
    academicYear,
  ) => repository.isAcademicYearValidLimit(academicYear);
  const setNewAcademicYear = (academicYear) => repository.setNewAcademicYear(academicYear);
  const getAllAcademicYear = (schoolID) => repository.getAllAcademicYear(schoolID);
  const getAcademicYearByID = (academicYearID) => repository.getAcademicYearByID(academicYearID);
  return {
    isAcademicYearValidLimit,
    setNewAcademicYear,
    getAllAcademicYear,
    getAcademicYearByID,
  };
}
