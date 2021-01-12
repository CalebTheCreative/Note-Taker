// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Starts Express server
const app = express();
const PORT = 3001;

// Lets Express use data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());