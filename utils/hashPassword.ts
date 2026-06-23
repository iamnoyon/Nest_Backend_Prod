import * as bcrypt from 'bcrypt';

const saltOrRounds = 10;

export const hashPassword = async (password) => {
  return await bcrypt.hash(password, saltOrRounds);
};

export const comparePassword = async (pass, hashPass) => {
  return await bcrypt.compare(pass, hashPass);
};
