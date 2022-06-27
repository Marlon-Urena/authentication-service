import express, { NextFunction, Request, Response } from 'express';
import { userAccountRegistration, User } from '../services/userService';

const router = express.Router();

router.post('/signup', function register(req: Request, res: Response, next: NextFunction) {
  const newUser = req.body as User;
  userAccountRegistration(newUser)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      next(error);
    });
});

export default router;
