import schoolAdmin from '../../../src/entities/schooladmin.js';

export default async function addSchoolAdmin(
  schoolAdminName,
  schoolName,
  afflNumber,
  email,
  phone,
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
  const newSchoolAdmin = schoolAdmin(
    schoolAdminName,
    schoolName,
    afflNumber,
    email,
    phone,
    address,
    pincode,
    schoolImage,
    hashPassword,
    createdAt,
    updatedAt,
  );
  return dbRepositorySchoolAdmin.signup(newSchoolAdmin);
}
