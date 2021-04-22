import { inject, injectable } from 'tsyringe';
import moment from 'moment';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';
import IAppointmentUsersRepository from '../repositories/IAppointmentUsersRepository';
import AppError from '../../../shared/errors/AppError';
import AppointmentUser from '../infra/typeorm/entities/AppointmentUser';

interface IRequest {
  user_id: string;
  birth: Date;
  date: Date;
  duration: number;
  quantity: number;
  daysRange: number;
  dayQuantityLimit: number;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('AppointmentUsersRepository')
    private appointmentUsersRepository: IAppointmentUsersRepository,
  ) {}

  public async execute({
    date,
    user_id,
    birth,
    daysRange,
    duration,
    quantity,
    dayQuantityLimit,
  }: IRequest): Promise<AppointmentUser> {
    const data = new Date(date);
    const formatDate = moment(data, 'YYYY-MM-DD hh:mm', true).format();

    // CHECKS IF THE APPOINTMENT DATE IS A VALID DATE
    if (formatDate === 'Invalid date') {
      throw new AppError('Invalid date format');
    }
    // CHECKS IF THE APPOINTMENT DATE IS ON PAST
    if (moment(formatDate).isBefore(new Date())) {
      throw new AppError("You can't create an appointment on a past date");
    }
    // CHECKS IF THE APPOINTMENT HOUR IS BETWEEN 8am AND 6pm
    if (moment(formatDate).hour() < 8 || moment(formatDate).hour() > 18) {
      throw new AppError(
        'You can only create appointments between 8:00 and 18:00',
      );
    }

    // CHECKS DURATION
    const minutes = data.getMinutes();

    if (minutes !== 0 && minutes % duration !== 0) {
      throw new AppError('Invalid date hour/minute');
    }

    // CHECKS IF APPOINTMENT IS ON PREDETERMINED RANGE DAYS
    if (!moment(data).isBefore(moment(new Date()).add(daysRange, 'days'))) {
      throw new AppError("You can't create an appointment too far on future");
    }

    const alreadyBooked = await this.appointmentUsersRepository.findByUser(
      user_id,
    );

    // CHECKS IF USER ALREADY HAVE AN PEDING APPOINTMENT
    alreadyBooked.forEach(appointmentUser => {
      if (appointmentUser.status === 'pending') {
        throw new AppError('You already have an appointment booked');
      }
    });

    const appointment = await this.appointmentsRepository.findByDate(date);

    // CHECKS IF THERE IS ONE APPOINTMENT IN THIS DATE
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

    // FILTER ALL THE PENDING APPOINTMENTS
    const pendingAppointments = appointment.users.filter(
      appointmentUser => appointmentUser.status === 'pending',
    );

    // CHECKS IF THE DAY SCHEDULE IS ON MAX LIMIT
    if (pendingAppointments.length >= dayQuantityLimit) {
      throw new AppError('The day schedule is on max limit');
    }

    // CHECKS IF THE APPOINTMENT IS FULL
    if (pendingAppointments.length >= quantity) {
      let stole = false;
      // CHECKS IF THE USER IS ELDERLY
      if (moment().diff(birth, 'years') >= 60) {
        // CHECKS IF THERE IS SOMEONE YOUNG TO STEAL HIS APPOINTMENT
        const findYoung = appointment.users.find(
          appointmentUser =>
            moment().diff(appointmentUser.user.birth, 'years') < 60,
        );

        if (findYoung) {
          await this.appointmentUsersRepository.save({
            ...findYoung,
            status: 'canceled',
          });

          stole = true;
        }
      }
      // CHECKS IF SOME APPOINTMENT WAS STOLEN
      if (!stole) {
        throw new AppError('This schedule is already full');
      }
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
