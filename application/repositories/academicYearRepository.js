export default function academicYearRepository(repository) {
  const isAcademicYearValidLimit = (
    academicYear,
  ) => repository.isAcademicYearValidLimit(academicYear);
  const setNewAcademicYear = (academicYear) => repository.setNewAcademicYear(academicYear);
  const getAcademicYear = (schoolID) => repository.getAcademicYear(schoolID);

  return {
    isAcademicYearValidLimit,
    setNewAcademicYear,
    getAcademicYear,
  };
}
