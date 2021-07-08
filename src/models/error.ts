import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class DBError {
  @PrimaryColumn()
  errorCode: string;
  @Column()
  businessContext: string;
  @Column()
  errorMessage: string;
  @Column()
  errorReference: string;
  @Column()
  httpStatusCode: number;
  @Column()
  severity: string;
}
