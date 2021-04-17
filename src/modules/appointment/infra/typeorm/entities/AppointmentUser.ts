import {
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import User from '../../../../user/infra/typeorm/entities/User';
import Appointment from './Appointment';

@Entity('appointment_users')
class AppointmentUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  appointment_id: string;

  @Column()
  user_id: string;

  @Column()
  status: 'pending' | 'canceled' | 'done';

  @Column()
  nurse_id: string;

  @Column()
  note: string;

  @ManyToOne(() => User, { eager: true })
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

export default AppointmentUser;
