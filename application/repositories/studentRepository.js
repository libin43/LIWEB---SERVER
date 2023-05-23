export default function studentRepository(repository) {
  const signup = (student) => repository.signup(student);
  const studentExist = (student) => repository.studentExist(student);
  const getStudentsById = (
    studentID,
    skip,
    limit,
  ) => repository.getStudentsById(studentID, skip, limit);
  const getStudentsByName = (
    studentID,
    skip,
    limit,
    key,
  ) => repository.getStudentsByName(studentID, skip, limit, key);
  const updateAccess = (bool, studentID) => repository.updateAccess(bool, studentID);
  const getStudentStats = (schoolID) => repository.getStudentStats(schoolID);

  return {
    signup,
    studentExist,
    getStudentsById,
    updateAccess,
    getStudentsByName,
    getStudentStats,
  };
}
