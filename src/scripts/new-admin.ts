import { PrismaClient } from '@prisma/client';
import { UserRoleEnum } from 'src/types';
import { encryptPassword, username_regex } from 'src/utils/misc';

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);

  console.log('args', args);

  if (args.length !== 3) {
    console.error(
      'Invalid arguments. Arguments should be [name, username, is_seller]',
    );
    return;
  }

  const [name, username, is_seller] = args;

  if (!username_regex.test(username)) {
    console.error(
      'Invalid username. Should have between 3 and 30 characters, have only numbers and letters and start with a letter',
    );
    return;
  }

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user) {
    console.error('Username already exists. Please choose a different one');
    return;
  }

  const hashedPassword = await encryptPassword(username);

  const roles = [UserRoleEnum.Admin];
  if (is_seller === 'true') roles.push(UserRoleEnum.Seller);

  await prisma.user.create({
    data: {
      name,
      roles,
      username,
      password: hashedPassword,
    },
  });

  console.info('User created with success');
  console.info('The password is the provided username. Please change it later');
}

main();
