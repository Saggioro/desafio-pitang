import { container } from 'tsyringe';

import './providers';

import UsersRepository from '../../modules/user/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '../../modules/user/repositories/IUsersRepository';
import INursesRepository from '../../modules/nurse/repositories/INursesRepository';
import NursesRepository from '../../modules/nurse/infra/typeorm/repositories/NursesRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<INursesRepository>(
  'NursesRepository',
  NursesRepository,
);
