import ICreateAppointmentDTO from 'modules/appointment/dtos/ICreateAppointmentDTO';
import IAppointmentsRepository from 'modules/appointment/repositories/IAppointmentsRepository';

import { Repository, getRepository, MoreThan, Between } from 'typeorm';
import Appointment from '../entities/Appointment';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create(data: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create(data);

    return this.ormRepository.save(appointment);
  }

  public async save(appointment: Appointment): Promise<Appointment> {
    return this.ormRepository.save(appointment);
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const appointment = await this.ormRepository.findOne({ where: { date } });

    return appointment || undefined;
  }

  public async findByDay(
    startOfDay: Date,
    endOfDay: Date,
  ): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: { date: Between(startOfDay, endOfDay) },
    });

    return appointments;
  }

  public async findAllMoreThan(date: Date): Promise<Appointment[]> {
    const appointments = await this.ormRepository.find({
      where: { date: MoreThan(date) },
    });

    return appointments;
  }
}
export default AppointmentsRepository;
