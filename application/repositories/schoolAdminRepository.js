export default function schoolAdminRepostiory(repository) {
  const signup = (schoolAdmin) => repository.signup(schoolAdmin);

  const getSchoolAdminByEmail = (email) => repository.getSchoolAdminByEmail(email);

  const setSchoolAdminOtp = (
    email,
    otp,
    otpExpirationTime,
  ) => repository.setSchoolAdminOtp(email, otp, otpExpirationTime);

  return {
    signup,
    getSchoolAdminByEmail,
    setSchoolAdminOtp,
  };
}
