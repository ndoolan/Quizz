import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function createUser(username, email, password) {
  try {
    // Create a new user with the provided information
    const newUser = await prisma.user.create({
      data: {
        username: 'new_user',
        email: 'new_user@example.com',
        password: 'hashed_password', // Replace with hashed password
        // Add any other desired values for optional fields, e.g.,
        firstName: 'John',
        lastName: 'Doe',
        lastAnswered: new Date(),
      },
    });
  } catch (error) {
    next({error});
  }
}
