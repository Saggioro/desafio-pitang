import ICreateAppointmentUsersDTO from '../dtos/ICreateAppointmentUsersDTO';
import AppointmentUsers from '../infra/typeorm/entities/AppointmentUsers';

interface IAppointmentsUserRepository {
  findByUser(user_id: string): Promise<AppointmentUsers[]>;
  create(data: ICreateAppointmentUsersDTO): Promise<AppointmentUsers>;
}

export default IAppointmentsUserRepository;
