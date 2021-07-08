import { Entity } from "typeorm";

@Entity()
export class DBError {
  errorCode: string;
  businessContext: string;
  errorMessage: string;
  errorReference: string;
  httpStatusCode: number;
  severity: string;
}
