import { container } from 'tsyringe';
import { Request, Response } from 'express';
import GetFutureAppointmentsService from '../../../services/GetFutureAppointmentsService';

class FutureAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
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
    const getFutureAppointmentsService = container.resolve(
      GetFutureAppointmentsService,
    );

    const appointments = await getFutureAppointmentsService.execute();

    const editedAppointments = appointments.map(appointment => {
      const editedAppoUsers = appointment.users.map(appointmentUser => {
        const { birth } = appointmentUser.user;
        const { appointment_id } = appointmentUser;
        const { status } = appointmentUser;
        return { birth, appointment_id, status };
      });
      const { date } = appointment;
      const { id } = appointment;
      return { id, date, appointmentUsers: editedAppoUsers };
    });

    return response.json({
      appointments: editedAppointments,
      dayQuantityLimit,
      daysRange,
      quantity,
      duration,
    });
  }
}

export default FutureAppointmentsController;
