export default async function addSubjectToClasses(
  subjectID,
  classID,
  academicYearID,
  dbRepositoryClass,
) {
  console.log(subjectID, classID, academicYearID, 'got in addsubject to classes');

  const classRoom = await dbRepositoryClass.insertSubjectToMultipleClasses(
    subjectID,
    classID,
    academicYearID,
  );
  console.log(classRoom, 'added to classroom');
  if (classRoom.modifiedCount === 0) {
    throw new Error('No Classroom Found');
  }
  return classRoom;
}
