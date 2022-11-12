import { Entity, Column, PrimaryColumn, ManyToOne } from "typeorm";
import { v4 as uuid } from "uuid";
import { User } from "./user.entity";

@Entity()
export class Sales {
  @PrimaryColumn("uuid")
  readonly id: string;

  @Column()
  type: number;

  @Column()
  date: Date;

  @Column()
  product: string;

  @Column()
  value: number;

  @Column()
  seller: string;

  @ManyToOne(() => User, (user) => user.sales, {
    onDelete: "CASCADE",
  })
  user: User;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
