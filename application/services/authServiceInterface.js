export default function authServiceInterface(service) {
  const encryptPassword = (password) => service.encryptPassword(password);

  const comparePassword = (
    password,
    hashPassword,
  ) => service.comparePassword(password, hashPassword);

  const verifyToken = (token) => service.verifyToken(token);

  const generateToken = (payload) => service.generateToken(payload);

  return {
    encryptPassword,
    comparePassword,
    verifyToken,
    generateToken,
  };
}
