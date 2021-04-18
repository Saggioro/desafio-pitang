import { Router } from 'express';
import ensureUserAuthenticated from '../../../../user/infra/http/middlewares/ensureUserAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import UsersAvailabilityController from '../controllers/UsersAvailabilityController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const usersAvailabilityController = new UsersAvailabilityController();

appointmentsRouter.post(
  '/',
  ensureUserAuthenticated,
  appointmentsController.create,
);

appointmentsRouter.get(
  '/userAvailability',
  ensureUserAuthenticated,
  usersAvailabilityController.index,
);

export default appointmentsRouter;
