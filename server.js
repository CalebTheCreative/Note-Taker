// Dependencies
const express = require("express");
const path = require("path");
const fs = require("fs");

// Starts Express server
const app = express();
const PORT = 3000;

// Lets Express use data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
// =============================================================
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

app.get("/api/notes", function (req, res) {
    return res.sendFile(path.join(__dirname, "./db/db.json"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.post("/api/notes", function (req, res) {
    let notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let addNote = req.body;

    notesList.push(addNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesList));
    res.json(addNote);
});


// Start Server
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});