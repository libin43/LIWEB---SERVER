export default function schoolAdmin(
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
) {
  return {
    getSchoolAdminName: () => schoolAdminName,
    getSchoolName: () => schoolName,
    getAffiliationNumber: () => afflNumber,
    getEmail: () => email,
    getPhoneNumber: () => phoneNumber,
    getAddress: () => address,
    getPincode: () => pincode,
    getSchoolImage: () => schoolImage,
    getPassword: () => password,
    getCreatedAt: () => createdAt,
    getUpdatedAt: () => updatedAt,

  };
}
