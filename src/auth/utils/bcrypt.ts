import * as bcrypt from 'bcrypt';

export async function encodePassword(rawPassword: string) {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(rawPassword, salt);
}

export async function comparePasswords(rawPassword: string, hash: string) {
  return bcrypt.compareSync(rawPassword, hash);
}
