export default function schoolAdmin(
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
) {
  return {
    getSchoolAdminName: () => schoolAdminName,
    getSchoolName: () => schoolName,
    getAffiliationNumber: () => afflNumber,
    getEmail: () => email,
    getPhoneNumber: () => phone,
    getAddress: () => address,
    getPincode: () => pincode,
    getSchoolImage: () => schoolImage,
    getPassword: () => password,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,

  };
}
