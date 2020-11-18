import { usersRepo } from '../repositories';
import hashPassword from './hashPassword.service';
import { userValidation } from './validation/validation';

export const registrationService = {
  async insertNewUser(username, firstName, lastName, password,  email, profileImg) {
    await this.userValidation(username, firstName, lastName, password,  email);
    await this.checkUniqueValues(username, email);
    const hashedPassword = hashPassword(password, 10);
    await usersRepo.insertNewUser(username, firstName, lastName, hashedPassword, email, profileImg);
    return {
      message: 'Successful registration. User was added to database.',
    };
  },

  async userValidation(username, firstName, lastName, password,  email) {
      let userData = {username, firstName, lastName, password,  email};
      const { error } = userValidation(userData);
      if (error) throw { message: `${error.details[0].message}`, status: 400 };
  },

  async checkUniqueValues (username, email) {
    const selectedUsername = await usersRepo.getUserByUsername(username);
    if (selectedUsername.results.length !== 0) {
      throw {
        message: 'Username is already in use.',
        status: 400,
      };
    }

    const selectedEmail = await usersRepo.getUserByEmail(email);
    if (selectedEmail.results.length !== 0) {
      throw {
        message: 'E-mail is already in use.',
        status: 400,
      };
    }
  },
};
