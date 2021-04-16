import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateAppointmentService from '../../../services/CreateAppointmentService';

class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { date } = request.body;

    const createAppointmentService = container.resolve(
      CreateAppointmentService,
    );
    const appointmentUser = await createAppointmentService.execute({
      user_id: id,
      date,
    });

    return response.status(201).json({ appointmentUser });
  }
}

export default AppointmentsController;
