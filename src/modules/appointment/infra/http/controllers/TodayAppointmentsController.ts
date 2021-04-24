import { container } from 'tsyringe';
import { Request, Response } from 'express';
import GetTodayAppointmentsService from '../../../services/GetTodayAppointmentsService';

class TodayAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const getTodayAppointmentsService = container.resolve(
      GetTodayAppointmentsService,
    );

    const appointments = await getTodayAppointmentsService.execute();

    const appointmentsWithoutUserPassword = appointments.map(appointment => {
      const appointmentUsers = appointment.users.map(appointmentUser => {
        const { user } = appointmentUser;
        const userWithoutPassword = { ...user, password: undefined };
        return { ...appointmentUser, user: userWithoutPassword };
      });

      return { ...appointment, users: appointmentUsers };
    });

    return response.json(appointmentsWithoutUserPassword);
  }
}

export default TodayAppointmentsController;
