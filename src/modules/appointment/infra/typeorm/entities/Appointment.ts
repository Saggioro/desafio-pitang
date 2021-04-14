import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import AppointmentUsers from './AppointmentUsers';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  note: string;

  @OneToMany(
    () => AppointmentUsers,
    appointmentUsers => appointmentUsers.user_id,
  )
  @JoinTable()
  users: AppointmentUsers[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
