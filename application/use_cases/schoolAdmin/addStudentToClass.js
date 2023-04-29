export default async function addStudentToClass(
  studentID,
  classID,
  academicYearID,
  dbRepositoryClass,
) {
  console.log(studentID, classID, academicYearID, 'approve');
  const classRoom = await dbRepositoryClass.insertStudentToClass(
    studentID,
    classID,
    academicYearID,
  );
  if (!classRoom) {
    throw new Error('No Classroom Found');
  }
  return classRoom;
}
