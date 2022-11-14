import { Entity, Column, OneToMany, PrimaryColumn } from "typeorm";
import { Sales } from "./sales.entity";
import { Exclude } from "class-transformer";
import { v4 as uuid } from "uuid";

@Entity("users")
export class User {
  @PrimaryColumn("uuid")
  readonly id: string;

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
