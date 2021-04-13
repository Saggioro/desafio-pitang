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

@Entity('appointment_users')
class AppointmentUsers {
  @PrimaryColumn('uuid')
  appointment_id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  status: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentUsers;
