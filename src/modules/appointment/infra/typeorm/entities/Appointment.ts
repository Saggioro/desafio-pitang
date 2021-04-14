import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  OneToMany,
  JoinTable,
} from 'typeorm';
import AppointmentUser from './AppointmentUser';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  note: string;

  @OneToMany(() => AppointmentUser, appointmentUser => appointmentUser.user_id)
  @JoinTable()
  users: AppointmentUser[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
