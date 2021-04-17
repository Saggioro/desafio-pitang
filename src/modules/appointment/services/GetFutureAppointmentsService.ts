import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IResponse {
  appointments: Appointment[];
  daysRange: number;
  quantity: number;
  duration: number;
  dayQuantityLimit: number;
}

@injectable()
class GetFutureAppointmentsAndConfigsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute(): Promise<IResponse> {
    let daysRange = 15;
    let quantity = 2;
    let duration = 30;
    let dayQuantityLimit = 20;

    if (
      process.env.DAY_QUANTITY_LIMIT &&
      !Number.isNaN(process.env.DAY_QUANTITY_LIMIT) &&
      Number(process.env.DAY_QUANTITY_LIMIT) >= 1
    ) {
      dayQuantityLimit = Number(process.env.DAY_QUANTITY_LIMIT);
    }
    if (
      (process.env.RANGE &&
        !Number.isNaN(process.env.RANGE) &&
        Number(process.env.RANGE) === 10) ||
      Number(process.env.RANGE) === 15 ||
      Number(process.env.RANGE) === 20
    ) {
      daysRange = Number(process.env.RANGE);
    }

    if (
      (process.env.DURATION &&
        !Number.isNaN(process.env.DURATION) &&
        Number(process.env.DURATION) === 10) ||
      Number(process.env.DURATION) === 15 ||
      Number(process.env.DURATION) === 20 ||
      Number(process.env.DURATION) === 30
    ) {
      duration = Number(process.env.DURATION);
    }

    if (
      process.env.QUANTITY &&
      !Number.isNaN(process.env.QUANTITY) &&
      Number(process.env.QUANTITY) >= 1
    ) {
      quantity = Number(process.env.QUANTITY);
    }
    const appointments = await this.appointmentsRepository.findAllMoreThan(
      new Date(),
    );

    return { appointments, daysRange, duration, dayQuantityLimit, quantity };
  }
}

export default GetFutureAppointmentsAndConfigsService;
