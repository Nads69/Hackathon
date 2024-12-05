import express from "express";
import {readFile} from "node:fs/promises";

const app = express();

app.get("/Currency", (request, response) => {

    readFile("./Currency.json", "utf-8")
    .then((jsonString)=> {
        
        const   jsonFile = JSON.parse(jsonString);
        response.status(200).json(jsonFile);
    })
    .catch((error) => {console.error(error)});

});

app.listen(3000, console.log("app is listening on port 3000"));