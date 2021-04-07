import { inject, injectable } from 'tsyringe';
import {} from 'jsonwebtoken';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/container/providers/hashProvider/models/IHashProvider';

interface IRequest {
  cpf: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ cpf, password }: IRequest): Promise<IResponse> {
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
  }
}

export default AuthenticateUserService;
