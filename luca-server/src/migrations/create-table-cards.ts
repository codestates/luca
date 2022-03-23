import { Cards } from "../models/cards";

const create_table_cards = async() => {
    await Cards.sync({force : true})
    .then(() => {
        console.log("Success Create Cards Table");
    })
    .catch((err) => {
        console.log("Error in Create Cards Table : ", err);
    })
}

create_table_cards();