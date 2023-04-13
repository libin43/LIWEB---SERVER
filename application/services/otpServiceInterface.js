export default function otpServiceInterface(service) {
  const generateOtp = () => service.generateOtp();
  const expireOtp = () => service.expireOtp();
  const sentMail = (email, otp) => service.sentMail(email, otp);

  return {
    generateOtp,
    expireOtp,
    sentMail,
  };
}
