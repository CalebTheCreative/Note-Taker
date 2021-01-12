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

// HTML Routes
// =============================================================

// Starter route
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Start Server
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});