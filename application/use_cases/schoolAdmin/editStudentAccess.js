export default async function editStudentAccess(
  status,
  studentID,
  dbRepositoryStudent,
) {
  return dbRepositoryStudent.updateAccess(status, studentID);
}
