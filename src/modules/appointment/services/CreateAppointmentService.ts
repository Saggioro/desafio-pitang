import { inject, injectable } from 'tsyringe';
import moment from 'moment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IAppointmentUsersRepository from '../repositories/IAppointmentUsersRepository';
import AppError from '../../../shared/errors/AppError';
import AppointmentUser from '../infra/typeorm/entities/AppointmentUser';

interface IRequest {
  user_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('AppointmentUsersRepository')
    private appointmentUsersRepository: IAppointmentUsersRepository,
  ) {}

  public async execute({ date, user_id }: IRequest): Promise<AppointmentUser> {
    const formatDate = moment(date, 'YYYY-MM-DD h:mm', true).format();

    if (formatDate === 'Invalid date') {
      throw new AppError('Invalid date format');
    }
    const daysRange = 15;
    const duration = 30;
    const data = new Date(date);
    const minutes = data.getMinutes();

    // check if the minutes are correct
    if (minutes !== 0 || minutes % duration !== 0) {
      throw new AppError('Invalid date time');
    }

    let quantity = 2;
    if (
      process.env.QUANTITY &&
      !Number.isNaN(process.env.QUANTITY) &&
      Number(process.env.QUANTITY) >= 1
    ) {
      quantity = Number(process.env.QUANTITY);
    }

    const alreadyBooked = await this.appointmentUsersRepository.findByUser(
      user_id,
    );

    alreadyBooked.forEach(appointmentUser => {
      if (appointmentUser.status === 'pending') {
        throw new AppError('You already have an appointment booked');
      }
    });

    const appointment = await this.appointmentsRepository.findByDate(date);

    if (!appointment) {
      const newAppointment = await this.appointmentsRepository.create({
        date,
      });

      const userAppointment = await this.appointmentUsersRepository.create({
        user_id,
        appointment_id: newAppointment.id,
        status: 'pending',
      });

      return userAppointment;
    }

    if (appointment.users.length > quantity) {
      // appointment.users.forEach(appointmentUser => {
      //   const age = appointmentUser.user.birth;
      // });
      throw new AppError('This schedule is already full');
    }

    const userAppointment = await this.appointmentUsersRepository.create({
      appointment_id: appointment.id,
      user_id,
      status: 'pending',
    });

    return userAppointment;
  }
}

export default CreateAppointmentService;
