export default async function schoolAdminAuth(
  email,
  password,
  dbRepositorySchoolAdmin,
  authService,
) {
  const schoolAdmin = await dbRepositorySchoolAdmin.getSchoolAdminByEmail(email);
  if (!schoolAdmin) {
    throw new Error('Invalid Credentials');
  }
  const hashSuccess = await authService.comparePassword(password, schoolAdmin.password);
  if (!hashSuccess) {
    throw new Error('Incorrect Password');
  }
  const { role } = schoolAdmin;
  const token = await authService.generateToken(
    { id: schoolAdmin._id, schoolAdminName: schoolAdmin.schoolAdminName, role },
  );
  console.log(token, 'its token');
  return {
    token,
    role,
  };
}
