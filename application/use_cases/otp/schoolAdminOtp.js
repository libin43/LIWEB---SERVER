export async function schoolAdminGenerateOtp(
  emailID,
  dbRepositorySchoolAdmin,
  otpService,
  authService,
) {
  const schoolAdmin = await dbRepositorySchoolAdmin.getSchoolAdminByEmail(emailID);
  if (!schoolAdmin) {
    throw new Error('Invalid Credentials');
  }
  const { email } = schoolAdmin;
  const otp = await otpService.generateOtp();
  const otpExpirationTime = await otpService.expireOtp();
  const isOtpSend = await otpService.sentMail(email, otp);
  const hashOtp = await authService.encryptPassword(otp.toString());
  const otpRecievedEmail = await dbRepositorySchoolAdmin.setSchoolAdminOtp(
    email,
    hashOtp,
    otpExpirationTime,
  );
  console.log(otpRecievedEmail, 'updatedSA');
  return {
    isOtpSend,
    otpRecievedEmail,
  };
}

export async function schoolAdminVerifyOtp(
  inputOtp,
  emailID,
  dbRepositorySchoolAdmin,
  authService,
) {
  const schoolAdmin = await dbRepositorySchoolAdmin.getSchoolAdminByEmail(emailID);
  if (!schoolAdmin) {
    throw new Error('Invalid Credentials');
  }
  const {
    _id, schoolAdminName, otp, role, otpExpirationTime,
  } = schoolAdmin;

  const otpVerified = await authService.comparePassword(inputOtp, otp);
  if (!otpVerified) {
    throw new Error('Incorrect Otp');
  }
  console.log(otpVerified, 'otp verified');
  if (Date.now() > otpExpirationTime) {
    throw new Error('Otp Expired');
  }
  const token = await authService.generateToken(
    { id: _id, schoolAdminName, role },
  );
  return {
    token,
    role,
  };
}
