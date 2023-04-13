import SchoolAdminModel from '../models/schoolAdmin.js';

export default function schoolAdminRepositoryMongoDB() {
  const signup = (schoolAdminEntity) => {
    const newSchoolAdmin = new SchoolAdminModel({
      schoolAdminName: schoolAdminEntity.getSchoolAdminName(),
      schoolName: schoolAdminEntity.getSchoolName(),
      afflNumber: schoolAdminEntity.getAffiliationNumber(),
      email: schoolAdminEntity.getEmail(),
      phoneNumber: schoolAdminEntity.getPhoneNumber(),
      address: schoolAdminEntity.getAddress(),
      pincode: schoolAdminEntity.getPincode(),
      schoolImage: schoolAdminEntity.getSchoolImage(),
      password: schoolAdminEntity.getPassword(),
      createdAt: schoolAdminEntity.getCreatedAt(),
      updatedAt: schoolAdminEntity.getUpdatedAt(),
    });
    return newSchoolAdmin.save();
  };

  const getSchoolAdminByEmail = async (email) => {
    const schoolAdmin = await SchoolAdminModel.findOne({ email });
    return schoolAdmin;
  };

  const setSchoolAdminOtp = async (email, otp, otpExpirationTime) => {
    const schoolAdmin = await SchoolAdminModel.findOneAndUpdate(
      { email },
      { otp, otpExpirationTime },
      { upsert: true, new: true },
    )
      .select('email');
    return schoolAdmin;
  };

  return {
    signup,
    getSchoolAdminByEmail,
    setSchoolAdminOtp,
  };
}
