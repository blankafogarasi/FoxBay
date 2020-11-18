import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { usersRepo } from '../repositories';
import { loginValidation } from './validation/validation';
import config from '../config';

export const loginService = {

    generateAccessToken({ id, username, userType }) {
        return jwt.sign({ id, username, userType }, config.secret || 'someOtherSecret', { expiresIn: '1800000s' });
      },
    
    async loginValidation(username, password) {
      let userData = {username, password};
      const { error } = loginValidation(userData);
      if (error) throw { message: `${error.details[0].message}`, status: 400 };
    },
    
    async loginUser(username, password) {
      this.loginValidation(username, password);
    
      const user = await usersRepo.getUserByUsername(username);
    
      if (!user.results[0]) {
        throw { message: 'No such user!', status: 400 };
      }
      const passwordCheck = await usersRepo.getPassword(username);
    
      if (!await bcrypt.compare(password, passwordCheck.results[0].passwordHash)) {
        throw { message: 'Username and password do not match!', status: 400 };
      }
    
      const token = this.generateAccessToken({
        id: user.results[0].id,
        email: user.results[0].email,
        username,
        userType: user.results[0].userType,
      });
    
      const returnData = {
        id: user.results[0].id,
        firstName: user.results[0].firstName,
        lastName: user.results[0].lastName,
        username,
        email: user.results[0].email,
        userType: user.results[0].userType,
        profileImg: user.results[0].profileImg,
        status: user.results[0].status,
        token,
      };
    
      return returnData;
    },
};