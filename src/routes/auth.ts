import express, { NextFunction, Request, Response } from 'express';
import { userAccountRegistration } from '../services/userService';

const router = express.Router();

router.post('/signup', function (req: Request, res: Response, next: NextFunction) {
  userAccountRegistration(req.body)
    .then(() => res.sendStatus(201))
    .catch((error) => {
      next(error);
    });
});

export default router;
