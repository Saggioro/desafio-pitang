import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../../services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id, birth } = request.user;
    const { date } = request.body;

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

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );
    const appointmentUser = await createAppointmentService.execute({
      user_id: id,
      birth,
      date,
      quantity,
      duration,
      daysRange,
      dayQuantityLimit,
    });

    return response.status(201).json({ appointmentUser });
  }
}

export default AppointmentsController;
