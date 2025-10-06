import pg, { Client } from "pg"
const { Pool } = pg
const client = new Pool()

client.use({
    user: "postgres",
    host: "localhost",
    password: "root",
    database: "",
    port: 5432

})

export default client