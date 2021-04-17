import { Router } from 'express';
import ensureUserAuthenticated from '../../../../user/infra/http/middlewares/ensureUserAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();

appointmentsRouter.post(
  '/',
  ensureUserAuthenticated,
  appointmentsController.create,
);

export default appointmentsRouter;
