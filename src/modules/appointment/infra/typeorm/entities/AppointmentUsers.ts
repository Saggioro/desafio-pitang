import User from 'modules/user/infra/typeorm/entities/User';
import {
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import Appointment from './Appointment';

@Entity('appointment_users')
class AppointmentUsers {
  @PrimaryColumn('uuid')
  appointment_id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  status: string;

  @Column()
  nurse_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Appointment)
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentUsers;
