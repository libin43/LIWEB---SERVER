export default async function getFacultyInfo(
  facultyID,
  dbRepositoryFaculty,
) {
  const faculty = await dbRepositoryFaculty.getFacultyByID(facultyID);
  console.log(faculty);
  if (!faculty) {
    throw new Error('Invalid Credentials');
  }
  return faculty;
}
