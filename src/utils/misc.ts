import * as bcrypt from 'bcrypt';

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function comparePasswords(
  password: string,
  encryptedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}
