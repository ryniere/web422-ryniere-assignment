/*********************************************************************************
* WEB422 – Assignment 1
* I declare that this assignment is my own work in accordance with Seneca Academic Policy.
* No part of this assignment has been copied manually or electronically from any other source
* (including web sites) or distributed to other students.
*
* Name: Ryniere dos Santos Silva Student ID: 138888185 Date: 05/21/2020
* Heroku Link: https://floating-peak-55109.herokuapp.com/
*
********************************************************************************/ 

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dataService = require("./modules/data-service.js");

const myData = dataService("mongodb+srv://test:test@cluster0-3byiu.mongodb.net/sample_supplies?retryWrites=true&w=majority");

const app = express();

app.use(cors());

app.use(bodyParser.json());

const HTTP_PORT = process.env.PORT || 8080;

// ************* API Routes

// POST /api/sales (NOTE: This route must read the contents of the request body)

app.post("/api/sales", (req, res) => {
    // Call the theater method
    // MUST return HTTP 201

    myData.addNewSale(req.body).then(result =>  res.status(201).json(result));
   
  });

// GET /api/sales (NOTE: This route must accept the numeric query parameters "page" and "perPage", ie: /api/sales?page=1&perPage=5 )

app.get("/api/sales", (req, res) => {

    myData.getAllSales(req.query.page, req.query.perPage).then( sales =>  res.json(sales));
});


// GET /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)

app.get("/api/sales/:id", (req, res) => {
   
    myData.getSaleById(req.params.id).then( sale =>  res.json(sale));
});


// PUT /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8 as well as read the contents of the request body)

app.put("/api/sales/:id", (req, res) => {
  // Make sure that the URL parameter matches the body value
  // This code is customized for the expected shape of the body object
  
  if (req.params.id != req.body._id) {
    res.status(404).json({ "message": "Resource not found" });
  }
  else {
    // Call the theater method
    myData.updateSaleById(req.body, req.params.id).then( result =>  res.json(result));
  }
});

// DELETE /api/sales (NOTE: This route must accept a numeric route parameter, ie: /api/sales/5bd761dcae323e45a93ccfe8)

app.delete("/api/sales/:id", (req, res) => {
    // Call the theater method
    myData.deleteSaleById(req.params.id).then( result => res.status(204).json(result));
  });

// ************* Initialize the Service & Start the Server

myData.initialize().then(()=>{
    app.listen(HTTP_PORT,()=>{
        console.log(`server listening on: ${HTTP_PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

