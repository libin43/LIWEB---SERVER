export default async function getInChargeClasses(
  facultyID,
  academicYearID,
  dbRepositoryClass,
) {
  const classes = await dbRepositoryClass.getInChargeClassesByFacultyId(facultyID, academicYearID);
  console.log(classes, 'incharge classes');
  return classes;
}
