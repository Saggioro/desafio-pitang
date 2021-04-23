import { inject, injectable } from 'tsyringe';

import {
  isBefore,
  startOfDay,
  addMinutes,
  addDays,
  addHours,
  getDate,
  getYear,
  getMonth,
  getHours,
  isEqual,
  differenceInYears,
} from 'date-fns';

import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IResponse {
  day: Date;
  hours: Date[];
  total: number;
}

interface IRequest {
  birth: Date;
  duration: number;
  daysRange: number;
  quantity: number;
  dayQuantityLimit: number;
}

@injectable()
class GetAppointmentAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    birth,
    dayQuantityLimit,
    daysRange,
    quantity,
    duration,
  }: IRequest): Promise<IResponse[]> {
    let start = addHours(startOfDay(new Date()), 8);

    // while (isBefore(start, new Date())) {
    //   start = addMinutes(start, duration);
    // }

    const days: IResponse[] = [];

    while (isBefore(start, addDays(new Date(), daysRange))) {
      const date = getDate(start);
      const month = getMonth(start);
      const year = getYear(start);
      let hourStart = start;
      const znDate = new Date(year, month, date);

      const total = days.push({
        day: znDate,
        hours: [],
        total: dayQuantityLimit,
      });

      while (getHours(hourStart) < 18) {
        days[total - 1].hours.push(hourStart);
        hourStart = addMinutes(hourStart, duration);
      }
      start = addDays(start, 1);
      start = addHours(startOfDay(start), 8);
    }

    const appointments = await this.appointmentsRepository.findAllMoreThan(
      startOfDay(new Date()),
    );

    const userAge = differenceInYears(new Date(), new Date(birth));

    appointments.forEach(appointment => {
      // checks if the user is eldearly to return appointments times that he can steal
      let peding;
      if (userAge >= 60) {
        peding = appointment.users.filter(
          user =>
            user.status === 'pending' &&
            differenceInYears(new Date(), new Date(user.user.birth)) < 60,
        );
      } else {
        peding = appointment.users.filter(user => user.status === 'pending');
      }

      if (peding.length > 0) {
        const date = getDate(appointment.date);
        const month = getMonth(appointment.date);
        const year = getYear(appointment.date);
        const startHourDate = new Date(year, month, date);

        const dayIndex = days.findIndex(day => isEqual(startHourDate, day.day));

        if (dayIndex !== -1) {
          const tzDate = appointment.date;

          const hourIndex = days[dayIndex].hours.findIndex(hour =>
            isEqual(tzDate, hour),
          );
          if (hourIndex !== -1) {
            days[dayIndex].total -= peding.length;

            if (peding.length >= quantity) {
              days[dayIndex].hours.splice(hourIndex, 1);
            }
          }
        }
      }
    });

    const filterTodayHours = days[0].hours.filter(
      hour => !isBefore(hour, new Date()),
    );
    days[0].hours = filterTodayHours;

    return days;
  }
}

export default GetAppointmentAvailabilityService;
