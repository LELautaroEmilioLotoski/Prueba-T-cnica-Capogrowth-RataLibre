import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, OneToOne } from 'typeorm';
import { MlToken } from './MlToken';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => MlToken, (mlToken) => mlToken.user)
  mlToken: MlToken;
  
  @Column({ type: 'bigint', unique: true, nullable: true })
  sellerId: string | null;  

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}

