export default function facultyRepository(repository) {
  const signup = (faculty) => repository.signup(faculty);
  const getFacultyName = (schoolID) => repository.getFacultyName(schoolID);
  const getFacultyByEmail = (email) => repository.getFacultyByEmail(email);
  const getFacultyByID = (facultyID) => repository.getFacultyByID(facultyID);
  const getFacultyStats = (schoolID) => repository.getFacultyStats(schoolID);
  const getAllSubjectsByAcademicYearID = (
    facultyID,
    academicYearID,
  ) => repository.getAllSubjectsByAcademicYearID(facultyID, academicYearID);
  const getAllClassesToTeachByAcademicYearID = (
    facultyID,
    academicYearID,
  ) => repository.getAllClassesToTeachByAcademicYearID(facultyID, academicYearID);
  const getAllClassInchargesByAcademicYearID = (
    facultyID,
    academicYearID,
  ) => repository.getAllClassInchargesByAcademicYearID(facultyID, academicYearID);

  return {
    signup,
    getFacultyName,
    getFacultyByEmail,
    getFacultyByID,
    getFacultyStats,
    getAllSubjectsByAcademicYearID,
    getAllClassesToTeachByAcademicYearID,
    getAllClassInchargesByAcademicYearID,
  };
}
