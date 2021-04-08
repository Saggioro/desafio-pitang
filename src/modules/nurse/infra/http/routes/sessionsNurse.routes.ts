import { Router } from 'express';
import SessionsNurseController from '../controllers/SessionsNurseController';

const sessionsNurseRouter = Router();

const sessionsNurseController = new SessionsNurseController();

sessionsNurseRouter.post('/', sessionsNurseController.create);

export default sessionsNurseRouter;
