export default async function moveStudents(
  students,
  currentClassID,
  selectedClass,
  dbRepositoryClass,
) {
  const updateIsMoved = await dbRepositoryClass.updateClassStudentStatus(students, currentClassID);
  console.log(updateIsMoved, 'isMoved Status');
  const updateExistingClass = await dbRepositoryClass.updateCurrentClassStatus(currentClassID);
  if (!updateExistingClass) {
    throw new Error('Invalid Credentials');
  }
  return dbRepositoryClass.insertMultipleStudentsToClass(students, selectedClass);
}
