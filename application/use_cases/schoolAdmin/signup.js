import schoolAdmin from '../../../src/entities/schooladmin.js';

export default async function addSchoolAdmin(
  schoolAdminName,
  schoolName,
  afflNumber,
  email,
  phoneNumber,
  address,
  pincode,
  schoolImage,
  password,
  createdAt,
  updatedAt,
  dbRepositorySchoolAdmin,
  authService,
) {
  const hashPassword = await authService.encryptPassword(password);
  console.log(hashPassword, 'hey');
  const newSchoolAdmin = schoolAdmin(
    schoolAdminName,
    schoolName,
    afflNumber,
    email,
    phoneNumber,
    address,
    pincode,
    schoolImage,
    hashPassword,
    createdAt,
    updatedAt,
  );
  console.log(newSchoolAdmin, 'Libin hey');
  return dbRepositorySchoolAdmin.signup(newSchoolAdmin);
}
