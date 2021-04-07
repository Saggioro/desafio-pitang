import { Request, Response } from 'express';
import { container } from 'tsyringe';
import AuthenticateUserService from '../../../services/AuthenticateUserService';

class SessionsUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { cpf, password } = request.body;

    const authenticateUserService = container.resolve(AuthenticateUserService);
    const token = await authenticateUserService.execute({ cpf, password });

    return response.json({ token });
  }
}

export default SessionsUserController;
