// Setup empty JS object to act as endpoint for all routes
projectData = {};
const port = 3000;
// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
// Cors for cross origin allowance
const cors = require("cors");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Enable cors Requests
app.use(cors()); //for browsers

// Initialize the main project folder
app.use(express.static("website"));

// APP API Endpoint
// Send data to the projectData Unsing GET
app.get("/all", (req, res) => {
  res.send(projectData);
});

// POST Route
app.post("/add", (req, res) => {
  // access the data from req.body
  //   The POST route receiving three pieces of data from the request body
  projectData = req.body;
  // res.end() will end the response process
  res.send(projectData);
});

// Setup Server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}/`);
});
