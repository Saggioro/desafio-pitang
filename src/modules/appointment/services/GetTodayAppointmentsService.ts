import { inject, injectable } from 'tsyringe';
import { startOfDay, endOfDay } from 'date-fns';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

@injectable()
class GetTodayAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findByDay(
      startOfDay(new Date()),
      endOfDay(new Date()),
    );

    const appointmentsFilled = appointments.filter(appointment => {
      const peding = appointment.users.filter(
        appointmentUser => appointmentUser.status === 'pending',
      );

      return peding.length > 0;
    });

    const appointmentsPeding = appointmentsFilled.map(appointment => {
      const pedingAppointments = appointment.users.filter(
        appointmentUser => appointmentUser.status === 'pending',
      );

      return { ...appointment, users: pedingAppointments };
    });

    return appointmentsPeding;
  }
}

export default GetTodayAppointmentsService;
