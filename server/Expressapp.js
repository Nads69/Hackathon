import express from "express";
import { readFile } from "node:fs/promises";
import cors from "cors";

const app = express();

app.use(cors({ 
    origin: 'http://localhost:5173',
}));

function ParseJsonfile(userRequest, jsonFile) {
  const { curr } = userRequest;
  console.log(curr);
  console.log(jsonFile);
  let index = 0;

  while (Object.keys(jsonFile)[index]) {
    if (Object.values(jsonFile)[index] == curr) {
      return Object.values(jsonFile)[index];
    }
    index++;
  }
}

//http://localhost:3000/Currency?curr=USD
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

const port = 3000
app.listen(port, () => {
console.info("app is listening on port 3000")
})
