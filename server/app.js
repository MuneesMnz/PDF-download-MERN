const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

const PDFTemplate = require("./documents");

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//POST - PDF generate and fetching of the data

app.post("/create-pdf", (req, res) => {
  console.log(req.body);

  pdf.create(PDFTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject());
    }

    res.send(Promise.resolve());
  });
});

//GET - send the generated PDF to the client
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);
});

const PORT = 3000;

app.listen(PORT, () => console.log(`Listening on Port ${PORT} `));
