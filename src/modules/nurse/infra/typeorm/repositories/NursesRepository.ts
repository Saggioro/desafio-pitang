import ICreateNurseDTO from 'modules/nurse/dtos/ICreateNurseDTO';
import INursesRepository from 'modules/nurse/repositories/INursesRepository';
import { getRepository, Repository } from 'typeorm';
import Nurse from '../entities/Nurse';

class NursesRepository implements INursesRepository {
  private ormRepository: Repository<Nurse>;

  constructor() {
    this.ormRepository = getRepository(Nurse);
  }

  public async all(): Promise<Nurse[]> {
    return this.ormRepository.find();
  }

  public async create(data: ICreateNurseDTO): Promise<Nurse> {
    const nurse = this.ormRepository.create(data);
    return this.ormRepository.save(nurse);
  }

  public async save(nurse: Nurse): Promise<Nurse> {
    return this.ormRepository.save(nurse);
  }

  public async findByEmail(email: string): Promise<Nurse | undefined> {
    const nurse = await this.ormRepository.findOne({ where: { email } });

    return nurse || undefined;
  }

  public async findById(id: string): Promise<Nurse | undefined> {
    const nurse = await this.ormRepository.findOne({ where: { id } });

    return nurse || undefined;
  }
}

export default NursesRepository;
