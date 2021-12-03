import * as bcrypt from 'bcrypt';

export const username_regex = /[a-z][a-z0-9]{2,29}/;

export async function encryptPassword(password: string): Promise<string> {
  return await bcrypt.hash(password, 12);
}

export async function comparePasswords(
  password: string,
  encryptedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(password, encryptedPassword);
}
