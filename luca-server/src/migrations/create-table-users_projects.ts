import { Users_Projects } from "../models/users_projects";

const create_table_users_projects = async() => {
    await Users_Projects.sync({force : true})
    .then(() => {
        console.log("Success Create Users_Projects Table");
    })
    .catch((err) => {
        console.log("Error in Create Users_Projects Table : ", err);
    })
}

create_table_users_projects();