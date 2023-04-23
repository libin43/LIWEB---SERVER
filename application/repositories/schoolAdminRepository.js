export default function schoolAdminRepostiory(repository) {
  const signup = (schoolAdmin) => repository.signup(schoolAdmin);

  const getSchoolAdminByEmail = (email) => repository.getSchoolAdminByEmail(email);

  const setSchoolAdminOtp = (
    email,
    otp,
    otpExpirationTime,
  ) => repository.setSchoolAdminOtp(email, otp, otpExpirationTime);

  const getSchoolAdminById = (id) => repository.getSchoolAdminById(id);

  return {
    signup,
    getSchoolAdminByEmail,
    setSchoolAdminOtp,
    getSchoolAdminById,
  };
}
