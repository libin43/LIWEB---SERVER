export default async function updateFacultyProfile(
  facultyID,
  facultyData,
  dbRepositoryFaculty,
) {
  const { name, email, phone } = facultyData;
  if (!name || !email || !phone) {
    throw new Error('Invalid Credentials');
  }
  const updateStatus = await dbRepositoryFaculty.updateProfile(
    facultyID,
    name,
    email,
    phone,
  );
  console.log(updateStatus, '........');
  return updateStatus;
}
