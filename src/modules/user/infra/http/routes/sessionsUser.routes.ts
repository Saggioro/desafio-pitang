import { Router } from 'express';
import SessionsUserController from '../controllers/SessionsUserController';

const sessionsUserRouter = Router();

const sessionsUserController = new SessionsUserController();

sessionsUserRouter.post('/', sessionsUserController.create);

export default sessionsUserRouter;
