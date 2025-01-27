import bcrypt from "bcryptjs";

export const hashPassword = async (password) => {
  const saltRounds = 10; // Adjust salt rounds for stronger hashing
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

export const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};