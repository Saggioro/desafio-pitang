import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  save(appointment: Appointment): Promise<Appointment>;
  findByUser(user_id: string): Promise<Appointment | undefined>;
  findByNurse(nurse_id: string): Promise<Appointment[]>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByDay(date: Date): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
