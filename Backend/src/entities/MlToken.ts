import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    Index,
    OneToOne,
  } from 'typeorm';
  import { User } from './User';


  @Entity('ml_tokens')
  @Index(['user'], { unique: true })
  export class MlToken {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @Column({ type: 'text' })
    accessToken: string;
  
    @Column({ type: 'text' })
    refreshToken: string;
  
    @Column({ type: 'int' })
    expiresIn: number;
  
    @OneToOne(() => User, (user) => user.mlToken, {
      onDelete: 'CASCADE',
      nullable: false,
    })
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }
  