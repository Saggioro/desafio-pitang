import { inject, injectable } from 'tsyringe';

import IAppointmentUsersRepository from '../repositories/IAppointmentUsersRepository';
import AppError from '../../../shared/errors/AppError';
import AppointmentUser from '../infra/typeorm/entities/AppointmentUser';

interface IRequest {
  id: string;
  status: 'done' | 'canceled';
  note?: string;
  user_id?: string;
  nurse_id?: string;
}

@injectable()
class UpdateUserAppointmentService {
  constructor(
    @inject('AppointmentUsersRepository')
    private appointmentUsersRepository: IAppointmentUsersRepository,
  ) {}

  public async execute({
    id,
    status,
    note,
    nurse_id,
    user_id,
  }: IRequest): Promise<AppointmentUser> {
    if (!nurse_id && !user_id) {
      throw new AppError(
        'You must be an nurse or the owner of this appointment to change it',
      );
    }

    const appointmentUser = await this.appointmentUsersRepository.findById(id);

    if (!appointmentUser) {
      throw new AppError('No appointment found');
    }

    if (user_id) {
      if (appointmentUser.user_id !== user_id) {
        throw new AppError(
          'You cant update an appointment that belong to another user',
        );
      }
    }

    if (appointmentUser.status === status) {
      throw new AppError(`This appointment is already ${status}`);
    }

    appointmentUser.status = status;
    if (note) {
      appointmentUser.note = note;
    }
    if (nurse_id) {
      appointmentUser.nurse_id = nurse_id;
    }

    const updated = await this.appointmentUsersRepository.save(appointmentUser);

    return updated;
  }
}

export default UpdateUserAppointmentService;
