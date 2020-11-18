import { registrationService } from '../services';

export const registrationController = {
  async post(req, res, next) {
    try {
      const {
        username, firstName, lastName, password,  email, profileImg
      } = req.body;
      const registration = await registrationService.insertNewUser(
        username, firstName, lastName, password,  email, profileImg
      );
      res.status(201).json({ message: registration.message });
    } catch (error) {
      next(error);
    }
  },
};