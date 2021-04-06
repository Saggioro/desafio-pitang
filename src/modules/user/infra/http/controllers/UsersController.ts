import { Response, Request } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '../../../services/CreateUserService';

class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { birth, name, password, cpf } = request.body;
    const createUserService = container.resolve(CreateUserService);
    const user = await createUserService.execute({
      birth,
      name,
      password,
      cpf,
    });

    const returnUser = { ...user, password: null };

    return response.status(201).json(returnUser);
  }
}

export default UsersController;
