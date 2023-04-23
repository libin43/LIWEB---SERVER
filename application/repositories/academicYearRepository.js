export default function academicYearRepository(repository) {
  const isAcademicYearValidLimit = (
    academicYear,
  ) => repository.isAcademicYearValidLimit(academicYear);
  const setNewAcademicYear = (academicYear) => repository.setNewAcademicYear(academicYear);

  return {
    isAcademicYearValidLimit,
    setNewAcademicYear,
  };
}
