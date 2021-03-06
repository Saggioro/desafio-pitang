import { container } from 'tsyringe';

import './providers';

import UsersRepository from '../../modules/user/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/user/repositories/IUsersRepository';
import INursesRepository from '../../modules/nurse/repositories/INursesRepository';
import NursesRepository from '../../modules/nurse/infra/typeorm/repositories/NursesRepository';
import IAppointmentsRepository from '../../modules/appointment/repositories/IAppointmentsRepository';
import AppointmentsRepository from '../../modules/appointment/infra/typeorm/repositories/AppointmentsRepository';
import IAppointmentUsersRepository from '../../modules/appointment/repositories/IAppointmentUsersRepository';
import AppointmentUsersRepository from '../../modules/appointment/infra/typeorm/repositories/AppointmentUsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<INursesRepository>(
  'NursesRepository',
  NursesRepository,
);

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);
container.registerSingleton<IAppointmentUsersRepository>(
  'AppointmentUsersRepository',
  AppointmentUsersRepository,
);
