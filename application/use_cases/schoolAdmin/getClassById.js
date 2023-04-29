export default async function getClassById(
  academicYearID,
  schoolID,
  dbRepositoryClass,
) {
  const classRoomData = await dbRepositoryClass.getClassByAcademicYearIdSchoolId(
    academicYearID,
    schoolID,
  );
  if (!classRoomData) {
    throw new Error('Invalid Credentials');
  }
  return classRoomData;
}
