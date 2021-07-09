import { ConnectionOptions, createConnection } from "typeorm";
import "reflect-metadata";

const db = async () => {
  // Initialize a connection pool against the database.
  const options: ConnectionOptions = {
    type: "postgres",
    host: process.env.POSTGRES_HOST || "localhost",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env.POSTGRES_USER || "user",
    password: process.env.POSTGRES_PASSWORD || "pass",
    database: process.env.POSTGRES_DATABASE || "apidb",
    entities: ["src/models/*.ts", "./build/src/models/*.js"],
    synchronize: true,
    logging: true
  };
  createConnection(options).then(
    async connection => {
      await connection.close();
    },
    error => console.log("Cannot connect: ", error)
  );
};

export default db;
