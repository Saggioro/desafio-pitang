import { inject, injectable } from 'tsyringe';
import IHashProvider from '../../../shared/container/providers/hashProvider/models/IHashProvider';
import ICreateNurseDTO from '../dtos/ICreateNurseDTO';
import INursesRepository from '../repositories/INursesRepository';
import AppError from '../../../shared/errors/AppError';
import Nurse from '../infra/typeorm/entities/Nurse';

@injectable()
class CreateNurseService {
  constructor(
    @inject('NursesRepository')
    private nursesRepository: INursesRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateNurseDTO): Promise<Nurse> {
    const sameEmail = await this.nursesRepository.findByEmail(email);

    if (sameEmail) {
      throw new AppError('This email is already in use');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const nurse = await this.nursesRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return nurse;
  }
}

export default CreateNurseService;
