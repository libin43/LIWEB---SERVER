import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../../config/config.js';

export default function authServiceImpl() {
  const encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    console.log(hashPassword, 'hashpasss');
    return hashPassword;
  };

  const comparePassword = (password, hashPassword) => bcrypt.compare(password, hashPassword);

  const verifyToken = (token) => jwt.verify(token, config.jwtSecret);

  const generateToken = (payload) => jwt.sign(payload, config.jwtSecret, { expiresIn: 360000 });

  return {
    encryptPassword,
    comparePassword,
    verifyToken,
    generateToken,
  };
}
