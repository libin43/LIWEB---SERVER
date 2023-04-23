export default async function findById(
  id,
  dbRepositorySchoolAdmin,
) {
  const schoolAdminData = await dbRepositorySchoolAdmin.getSchoolAdminById(id);
  if (!schoolAdminData) {
    throw new Error('Invalid Credentials');
  }
  return schoolAdminData;
}
