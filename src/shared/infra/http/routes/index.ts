import { Router } from 'express';

import usersRouter from '../../../../modules/user/infra/http/routes/users.routes';
import sessionsUserRouter from '../../../../modules/user/infra/http/routes/sessionsUser.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessionsUser', sessionsUserRouter);

export default routes;
