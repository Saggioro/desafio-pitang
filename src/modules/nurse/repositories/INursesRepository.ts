import Nurse from '../infra/typeorm/entities/Nurse';
import ICreateNurseDTO from '../dtos/ICreateNurseDTO';

interface INursesRepository {
  all(): Promise<Nurse[]>;
  findByEmail(email: string): Promise<Nurse | undefined>;
  findById(id: string): Promise<Nurse | undefined>;
  create(data: ICreateNurseDTO): Promise<Nurse>;
  save(nurse: Nurse): Promise<Nurse>;
}

export default INursesRepository;
