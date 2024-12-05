import express from "express";
import { readFile } from "node:fs/promises";

const app = express();

function ParseJsonfile(userRequest, jsonFile) {
  const { curr } = userRequest;
  let index = 0;

  while (Object.keys(jsonFile)[index]) {
    if (Object.keys(jsonFile)[index] == curr) {
      return Object.values(jsonFile)[index];
    }
    index++;
  }
}

//http://localhost:3000/Currency?curr=

app.get("/Currency", (request, response) => {
  readFile("./Currency.json", "utf-8")
    .then((jsonString) => {
      const jsonFile = JSON.parse(jsonString);
      const userRequest = request.query;
      const jsonToSend = ParseJsonfile(userRequest, jsonFile);

      if (jsonToSend === undefined)
        response.status(400).send("Invalid Paramater");
      else response.status(200).json(jsonToSend);
    })
    .catch((error) => {
      console.error(error);
    });
});

app.listen(3000, console.log("app is listening on port 3000"));
