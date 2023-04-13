export default function schoolAdminRepostiory(repository) {
  const signup = (schoolAdmin) => {
    console.log(schoolAdmin, 'come from db.singup');
    return repository.signup(schoolAdmin);
  };

  const getSchoolAdminByEmail = (email) => {
    console.log(email, 'email');
    return repository.getSchoolAdminByEmail(email);
  };

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
