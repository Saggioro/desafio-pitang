import { sign } from 'jsonwebtoken';

import IHashProvider from 'shared/container/providers/hashProvider/models/IHashProvider';
import { inject, injectable } from 'tsyringe';
import INursesRepository from '../repositories/INursesRepository';
import AppError from '../../../shared/errors/AppError';
import auth from '../../../config/auth';

interface IRequest {
  email: string;
  password: string;
}

@injectable()
class AuthenticateNurseService {
  constructor(
    @inject('NursesRepository')
    private nursesRepository: INursesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ email, password }: IRequest): Promise<string> {
    const nurse = await this.nursesRepository.findByEmail(email);

    if (!nurse) {
      throw new AppError('Invalid email/password');
    }
    const matchPassword = await this.hashProvider.compareHash(
      password,
      nurse.password,
    );

    if (!matchPassword) {
      throw new AppError('Invalid email/password');
    }

    const token = sign(
      { id: nurse.id, name: nurse.name },
      auth.jwt.nurseSecret,
      {
        expiresIn: auth.jwt.expiresIn,
      },
    );

    return token;
  }
}

export default AuthenticateNurseService;
