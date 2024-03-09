import { PrismaClient } from "@prisma/client";
import { encryptPass, validatePass } from "./bcrypt";
const prisma = new PrismaClient({
  log: ["query", "info", "warn", "error"],
});

// Create User
async function createUser(username: string, password: string, email: string) {
  try {
    // Create a new user with the provided information (HARDCODED OTHERS)
    // Currently testing for bcrypt
    const newUser = await prisma.user.create({
      data: {
        username: username,
        email: email,
        password: await encryptPass(password), // Replace with hashed password
        // Add any other desired values for optional fields, e.g.,
        firstName: "FurtherTests",
        lastName: "One",
        lastAnswered: new Date(),
      },
    });
    console.log(newUser);
  } catch (error) {
    throw new Error(`Failed to create new user: ${error}`);
  }
}

// Validate User Creds
async function validateUser(username: string, password: string) {
  try {
    console.log("validateUser");
    const user = await prisma.user.findUnique({
      where: {
        username: username, // bccrypt password to compare
      },
    });

    if (!user) {
      return false;
    } else {
      const validPassword = await validatePass(password, user.password);
      if (validPassword) {

        const { username, firstName, lastName, lastAnswered, email } = user;
        const userInformation = {
          username,
          firstName,
          lastName,
          lastAnswered,
          email,
        };
        return userInformation;
      }
    }
    // TODO assign cookies to user browser
  } catch (error) {
    throw new Error(`Failed to valid credentials: ${error}`);
  }
}

export { createUser, validateUser };
