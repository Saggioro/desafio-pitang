import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IAppointmentUsersRepository from '../repositories/IAppointmentUsersRepository';
import AppError from '../../../shared/errors/AppError';
import AppointmentUser from '../infra/typeorm/entities/AppointmentUser';

interface IResponse {
  appointment: Appointment;
  userAppointments: AppointmentUser[];
}

@injectable()
class GetUserBookedAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('AppointmentUsersRepository')
    private appointmentUsersRepository: IAppointmentUsersRepository,
  ) {}

  public async execute(user_id: string): Promise<IResponse> {
    const userAppointments = await this.appointmentUsersRepository.findByUser(
      user_id,
    );

    const peding = userAppointments.filter(
      userAppointment => userAppointment.status === 'pending',
    );

    if (peding.length === 0) {
      throw new AppError('No booked appointments');
    }
    const appointment = await this.appointmentsRepository.findById(
      peding[0].appointment_id,
    );

    if (!appointment) {
      throw new AppError('No booked appointments');
    }

    return { appointment, userAppointments: peding };
  }
}

export default GetUserBookedAppointmentService;
