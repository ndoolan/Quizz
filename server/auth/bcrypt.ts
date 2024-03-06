import bcrypt from 'bcrypt';
const SALT_WORK_FACTOR = 12;

// Bcrypt Encryption
async function encryptPass(password: string) {
  try {
    const encrypt = await bcrypt.hash(password, SALT_WORK_FACTOR);
    return encrypt;
  } catch (error) {
    throw new Error(`Failed to encrypt password: ${error}`);
  }
}

// Bcrypt Password Valdiation
async function validatePass(password: string, userPassword: string) {
  try {
    console.log('preCRYPT', password, userPassword);
    const validPass = await bcrypt.compare(password, userPassword);
    console.log('postCRYPT', validPass);
    if (!validPass) return 'Invalid Credentials';
    return validPass;
  } catch (error) {
    throw new Error(`Password comparison failed: ${error}`);
  }
}

export { encryptPass, validatePass };
