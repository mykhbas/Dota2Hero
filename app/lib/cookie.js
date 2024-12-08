import crypto from 'crypto';

const algorithm = 'aes-256-cbc';
const secretKey = Buffer.from('e9b1e9d4aeb5e9c7f3ab45bce8d1f4e3c9b1a2d3f6e4d7e3f2a1b9c2d3f4e8f7', 'hex');
const ivLength = 16; 

export const encryptCookie = (value) => {
  const iv = crypto.randomBytes(ivLength);
  const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
  let encrypted = cipher.update(value, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return iv.toString('hex') + ':' + encrypted;
};

export const decryptCookie = (encryptedValue) => {
  const textParts = encryptedValue.split(':');
  const iv = Buffer.from(textParts.shift(), 'hex');
  const encryptedText = textParts.join(':');
  const decipher = crypto.createDecipheriv(algorithm, secretKey, iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

export const comparePassword = (inputPassword, encryptedPassword) => {
  const decryptedPassword = decryptCookie(encryptedPassword);
  return decryptedPassword === inputPassword;
};