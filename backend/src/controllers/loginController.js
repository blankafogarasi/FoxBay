import { loginService } from '../services';

export const loginController = {
    async post(req, res, next) {
      try {
        const {
          username, password
        } = req.body;
        const login = await loginService.loginUser(
          username, password
        );
        res.status(200).json(login);
      } catch (error) {
        next(error);
      }
    },
  };