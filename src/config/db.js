import pkg from "pg";
const { Pool } = pkg;


const client = new Pool({
  user: "postgres",
  host: "localhost",
  password: "root",
  database: "football_clubs",
  port: 5432,
});

export default client;
