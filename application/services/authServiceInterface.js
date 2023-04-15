export default function authServiceInterface(service) {
  const encryptPassword = (password) => service.encryptPassword(password);

  const comparePassword = (
    password,
    hashPassword,
  ) => service.comparePassword(password, hashPassword);

  const generateToken = (payload) => service.generateToken(payload);

  const verifyToken = (token) => service.verifyToken(token);

  return {
    encryptPassword,
    comparePassword,
    generateToken,
    verifyToken,
  };
}
