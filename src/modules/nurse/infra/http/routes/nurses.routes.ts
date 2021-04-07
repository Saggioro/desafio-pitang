import { Router } from 'express';
import NursesController from '../controllers/NursesController';

const nursesRouter = Router();

const nursesController = new NursesController();

nursesRouter.post('/', nursesController.create);

export default nursesRouter;
