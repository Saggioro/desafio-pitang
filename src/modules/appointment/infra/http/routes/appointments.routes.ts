import { Router } from 'express';
import ensureUserAuthenticated from '../../../../user/infra/http/middlewares/ensureUserAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import UsersAvailabilityController from '../controllers/UsersAvailabilityController';
import AppointmentsAvailabilityController from '../controllers/AppointmentsAvailabilityController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const usersAvailabilityController = new UsersAvailabilityController();
const appointmentsAvailabilityController = new AppointmentsAvailabilityController();

appointmentsRouter.post(
  '/',
  ensureUserAuthenticated,
  appointmentsController.create,
);

appointmentsRouter.get(
  '/availability',
  ensureUserAuthenticated,
  appointmentsAvailabilityController.index,
);

export default appointmentsRouter;
