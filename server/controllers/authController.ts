import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// interface;

const authController = {};

// authController.createUser = async (req, res, next) => {
//   try {
//     // Create a new user with the provided information
//     const newUser = await prisma.user.create({
//       data: {
//         username: 'new_user',
//         email: 'new_user@example.com',
//         password: 'hashed_password', // Replace with hashed password
//         // Add any other desired values for optional fields, e.g.,
//         firstName: 'John',
//         lastName: 'Doe',
//         lastAnswered: new Date(),
//       },
//     });

//     console.log(`User created successfully with ID: ${newUser.id}`);
//   } catch (error) {
//     console.error('Error creating user:', error);
//   } finally {
//     // Close the Prisma Client connection (optional)
//     await prisma.$disconnect();
//   }
// };

// async function createUser(username, email, password) {
//   try {
//     // Create a new user with the provided information
//     const newUser = await prisma.user.create({
//       data: {
//         username: 'new_user',
//         email: 'new_user@example.com',
//         password: 'hashed_password', // Replace with hashed password
//         // Add any other desired values for optional fields, e.g.,
//         firstName: 'John',
//         lastName: 'Doe',
//         lastAnswered: new Date(),
//       },
//     });

//     console.log(`User created successfully with ID: ${newUser.id}`);
//   } catch (error) {
//     console.error('Error creating user:', error);
//   } finally {
//     // Close the Prisma Client connection (optional)
//     await prisma.$disconnect();
//   }
// }

// Example usage:
// createUser('Nick', 'new_user@example.com', 'password123') // Replace with your desired values
//   .then(() => console.log('User creation completed'))
//   .catch((error) => console.error('Error:', error));
