export default async function getStudents(
  classID,
  dbRepositoryClass,
) {
  const students = await dbRepositoryClass.getStudentsByClassId(classID);
  console.log(students, 'students in use case');
  return students;
}
