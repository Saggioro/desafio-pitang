import ICreateAppointmentUserDTO from '../dtos/ICreateAppointmentUserDTO';
import AppointmentUser from '../infra/typeorm/entities/AppointmentUser';

interface IAppointmentUsersRepository {
  findByUser(user_id: string): Promise<AppointmentUser[]>;
  create(data: ICreateAppointmentUserDTO): Promise<AppointmentUser>;
  save(appointmentUser: AppointmentUser): Promise<AppointmentUser>;
}

export default IAppointmentUsersRepository;
