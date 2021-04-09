import {
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';

@Entity('appointment_users')
class AppointmentUsers {
  @PrimaryColumn('uuid')
  appointment_id: string;

  @Column('uuid')
  user_id: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentUsers;
