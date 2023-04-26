export default async function getName(
  schoolID,
  dbRepositoryFaculty,
) {
  return dbRepositoryFaculty.getFacultyName(schoolID);
}
