import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 80
  })
  first_name: string;

  @Column({
    length: 80
  })
  last_name: string;

  @Column({
    length: 100
  })
  email: string;
}

export const userSchema = {
  id: { type: "number", required: true, example: 1 },
  first_name: { type: "string", required: true, example: "Amit" },
  last_name: { type: "string", required: true, example: "Sinha" },
  email: { type: "string", required: true, example: "aamitkumarsinha@gmail.com" }
};
