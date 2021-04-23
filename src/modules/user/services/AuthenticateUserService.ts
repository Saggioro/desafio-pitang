import { inject, injectable } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import auth from '../../../config/auth';

import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/container/providers/hashProvider/models/IHashProvider';

interface IRequest {
  cpf: string;
  password: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ cpf, password }: IRequest): Promise<string> {
    const user = await this.usersRepository.findByCpf(cpf);

    if (!user) {
      throw new AppError('Invalid cpf or password');
    }

    const matchPassword = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!matchPassword) {
      throw new AppError('Invalid cpf or password');
    }

    const token = sign(
      { birth: user.birth, id: user.id, name: user.name },
      auth.jwt.userSecret,
      {
        expiresIn: auth.jwt.expiresIn,
      },
    );

    return token;
  }
}

export default AuthenticateUserService;
