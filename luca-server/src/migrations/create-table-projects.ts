import { Projects } from "../models/projects";

const create_table_projects = async() => {
    await Projects.sync({force : true})
    .then(() => {
        console.log("Success Create Projects Table");
    })
    .catch((err) => {
        console.log("Error in Create Projects Table : ", err);
    })
}

create_table_projects();