const express = require("express");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");
const cors = require("cors");

//Import the PDF template function
const PDFTemplate = require("./documents");

const app = express();

// Enable CORS to allow requests from different origins (Frontend can communicate with Backend)
app.use(cors());

// Middleware to parse incoming request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/**
 * POST - Generate PDF from incoming user data
 * This route receives user data from the frontend, generates a PDF, and saves it on the server.
 */
app.post("/create-pdf", (req, res) => {
  console.log(req.body);

  // Generate a PDF using the provided data and the template
  pdf.create(PDFTemplate(req.body), {}).toFile("result.pdf", (err) => {
    if (err) {
      res.send(Promise.reject()); // If an error occurs, reject the request
    }

    res.send(Promise.resolve()); // If successful, send a resolved promise
  });
});

/**
 * GET - Fetch the generated PDF
 * This route sends the generated PDF file to the client for download.
 */
app.get("/fetch-pdf", (req, res) => {
  res.sendFile(`${__dirname}/result.pdf`);  // Sends the generated PDF file
});

// Define the port number for the server
const PORT = 3000;

// Start the Express server and listen on the defined port
app.listen(PORT, () => console.log(`Listening on Port ${PORT} `));
