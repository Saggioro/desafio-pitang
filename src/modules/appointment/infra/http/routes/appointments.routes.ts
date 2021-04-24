import { Router } from 'express';
import ensureNurseAuthenticated from '../../../../nurse/infra/http/middlewares/ensureNurseAuthenticated';
import ensureUserAuthenticated from '../../../../user/infra/http/middlewares/ensureUserAuthenticated';
import AppointmentsController from '../controllers/AppointmentsController';
import FutureAppointmentsController from '../controllers/FutureAppointmentsController';
import AppointmentsAvailabilityController from '../controllers/AppointmentsAvailabilityController';
import AppointmentUserController from '../controllers/AppointmentUserController';
import TodayAppointmentsController from '../controllers/TodayAppointmentsController';

const appointmentsRouter = Router();

const appointmentsController = new AppointmentsController();
const futureAppointmentsController = new FutureAppointmentsController();
const appointmentsAvailabilityController = new AppointmentsAvailabilityController();
const appointmentUserController = new AppointmentUserController();
const todayAppointmentsController = new TodayAppointmentsController();

appointmentsRouter.post(
  '/',
  ensureUserAuthenticated,
  appointmentsController.create,
);

appointmentsRouter.get(
  '/',
  ensureUserAuthenticated,
  appointmentsController.find,
);

appointmentsRouter.get(
  '/availability',
  ensureUserAuthenticated,
  appointmentsAvailabilityController.index,
);

appointmentsRouter.delete(
  '/user/:id',
  ensureUserAuthenticated,
  appointmentUserController.delete,
);

appointmentsRouter.put(
  '/provide',
  ensureNurseAuthenticated,
  appointmentUserController.update,
);

appointmentsRouter.get(
  '/today',
  ensureNurseAuthenticated,
  todayAppointmentsController.index,
);

export default appointmentsRouter;
