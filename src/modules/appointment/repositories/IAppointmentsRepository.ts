import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  save(appointment: Appointment): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByDay(startOfDay: Date, endOfDay: Date): Promise<Appointment[]>;
  findAllMoreThan(date: Date): Promise<Appointment[]>;
}

export default IAppointmentsRepository;
