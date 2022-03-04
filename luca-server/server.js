require("dotenv").config();

const server = require("./socket")
const port = process.env.SERVER_PORT;

server.listen(port, () => {
    console.log(`server listening at http://localhost:${port}`);
});