import server from "./socket"
import { sequelize } from "./models";
import * as dotenv from "dotenv";

dotenv.config();
const port: number = parseInt(process.env.SERVER_PORT);

sequelize.authenticate()
    .then(async () => {
        console.log("Connection has been established successfully.");
        server.listen(port, async () => {
            console.log(`server listening at http://localhost:${port}`);
        })
    })
    .catch(error => console.log("📚 DB error!", error));