import { PrismaClient, UserRole } from '@prisma/client';
import { encryptPassword, username_regex } from 'src/utils/misc';

const prisma = new PrismaClient();

async function main() {
  const args = process.argv.slice(2);

  if (args.length !== 2) {
    console.error(
      'Invalid arguments. Should be provided only name and username in this order',
    );
    return;
  }

  const [name, username] = args;

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

  await prisma.user.create({
    data: {
      name,
      username,
      password: hashedPassword,
      role: UserRole.ADMIN,
    },
  });

  console.info('User created with success');
  console.info('The password is the username provided. Please change it later');
}

main();
