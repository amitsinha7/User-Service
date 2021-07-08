import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";
import { Length, IsEmail } from "class-validator";
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: Number;
  @Column({
    length: 100
  })
  firstName: String;
  @Column({
    length: 100
  })
  lastName: String;
  @Column({
    length: 100
  })
  @Length(10, 100)
  @IsEmail()
  email: String;
}
