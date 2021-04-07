import { inject, injectable } from 'tsyringe';
import { isValid } from 'date-fns';

import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
import AppError from '../../../shared/errors/AppError';
import IHashProvider from '../../../shared/container/providers/hashProvider/models/IHashProvider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    birth,
    cpf,
    name,
    password,
  }: ICreateUserDTO): Promise<User> {
    const sameCpf = await this.usersRepository.findByCpf(cpf);
    const valid = isValid(new Date(birth));

    if (!valid) {
      throw new AppError("Date birth isn't in valid format");
    }

    if (sameCpf) {
      throw new AppError('This cpf is already in use');
    }
    const hashed = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      cpf,
      birth,
      password: hashed,
    });

    return user;
  }
}

export default CreateUserService;
