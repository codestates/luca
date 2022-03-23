import { Users } from "../models/users";

const create_table_users = async() => {
    await Users.sync({force : true})
    .then(() => {
        console.log("Success Create Users Table");
    })
    .catch((err) => {
        console.log("Error in Create Users Table : ", err);
    })
}

create_table_users();