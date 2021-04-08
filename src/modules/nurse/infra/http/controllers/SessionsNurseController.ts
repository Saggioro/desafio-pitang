import { container } from 'tsyringe';
import { Request, Response } from 'express';
import AuthenticateNurseService from '../../../services/AuthenticateNurseService';

class SessionsNurseController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;
    const authenticateNurseService = container.resolve(
      AuthenticateNurseService,
    );

    const token = await authenticateNurseService.execute({ email, password });

    return response.json({ token });
  }
}
export default SessionsNurseController;
