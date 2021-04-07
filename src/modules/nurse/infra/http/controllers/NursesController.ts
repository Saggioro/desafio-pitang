import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateNurseService from 'modules/nurse/services/CreateNurseService';

class NursesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, password, email } = request.body;

    const createNurseService = container.resolve(CreateNurseService);
    const nurse = await createNurseService.execute({ name, password, email });

    return response.status(201).json(nurse);
  }
}

export default NursesController;
