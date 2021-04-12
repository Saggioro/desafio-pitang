import AppointmentUsers from '../infra/typeorm/entities/AppointmentUsers';
import IAppointmentsRepository from './IAppointmentsRepository';

interface IAppointmentsUserRepository {
  findByUser(user_id: string): Promise<AppointmentUsers[]>;
}

export default IAppointmentsUserRepository;
