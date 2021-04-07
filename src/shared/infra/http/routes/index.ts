import { Router } from 'express';

import usersRouter from '../../../../modules/user/infra/http/routes/users.routes';
import sessionsUserRouter from '../../../../modules/user/infra/http/routes/sessionsUser.routes';
import nursesRouter from '../../../../modules/nurse/infra/http/routes/nurses.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessionsUser', sessionsUserRouter);

routes.use('/nurses', nursesRouter);

export default routes;
