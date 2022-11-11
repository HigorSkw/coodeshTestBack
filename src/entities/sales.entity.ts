import { Entity, Column, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

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

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}
