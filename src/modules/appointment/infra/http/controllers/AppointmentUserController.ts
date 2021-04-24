import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAppointmentService from '../../../services/UpdateUserAppointmentService';

class AppointmentUserController {
  public async delete(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;
    const { id } = request.params;

    const updateUserAppointmentService = container.resolve(
      UpdateUserAppointmentService,
    );
    const appointmentUser = await updateUserAppointmentService.execute({
      id,
      status: 'canceled',
      user_id,
    });

    return response.status(204).json(appointmentUser.status);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id: nurse_id } = request.nurse;
    const { id, note, status } = request.body;

    const updateUserAppointmentService = container.resolve(
      UpdateUserAppointmentService,
    );
    const appointmentUser = await updateUserAppointmentService.execute({
      id,
      status,
      nurse_id,
      note,
    });

    const appointmentUserReturn = { ...appointmentUser, user: undefined };

    return response.status(200).json(appointmentUserReturn);
  }
}

export default AppointmentUserController;
