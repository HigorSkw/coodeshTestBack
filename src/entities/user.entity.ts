import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Sales } from "./sales.entity";
import { Exclude } from "class-transformer";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 120 })
  name: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  email: string;

  @Column()
  is_adm: boolean;

  @OneToMany(() => Sales, (sales) => sales.user, {
    cascade: true,
  })
  sales: Sales[];
}
