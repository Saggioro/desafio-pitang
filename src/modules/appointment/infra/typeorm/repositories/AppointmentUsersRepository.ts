import ICreateAppointmentUserDTO from 'modules/appointment/dtos/ICreateAppointmentUserDTO';
import IAppointmentUsersRepository from 'modules/appointment/repositories/IAppointmentUsersRepository';
import { getRepository, Repository } from 'typeorm';
import AppointmentUser from '../entities/AppointmentUser';

class AppointmentUsersRepository implements IAppointmentUsersRepository {
  private ormRepository: Repository<AppointmentUser>;

  constructor() {
    this.ormRepository = getRepository(AppointmentUser);
  }

  public async create(
    data: ICreateAppointmentUserDTO,
  ): Promise<AppointmentUser> {
    const appointmentUser = this.ormRepository.create(data);

    return this.ormRepository.save(appointmentUser);
  }

  public async save(
    appointmentUser: AppointmentUser,
  ): Promise<AppointmentUser> {
    return this.ormRepository.save(appointmentUser);
  }

  public async findByUser(user_id: string): Promise<AppointmentUser[]> {
    return this.ormRepository.find({ where: { user_id } });
  }

  public async findById(id: string): Promise<AppointmentUser | undefined> {
    const appointmentUser = await this.ormRepository.findOne({
      where: { id },
    });

    return appointmentUser || undefined;
  }
}
export default AppointmentUsersRepository;
