export default async function getClassesByAcademicYearId(
  academicYearID,
  facultyID,
  dbRepositoryClass,
  dbRepositoryFaculty,
) {
  const data = await dbRepositoryFaculty.getFacultyByID(facultyID);
  const { schoolID } = data;
  if (!schoolID) {
    throw new Error('Invalid Credentials');
  }
  const classes = await dbRepositoryClass.getClassByAcademicYearIdSchoolId(
    academicYearID,
    schoolID,
  );
  console.log(classes);
  return classes;
}
