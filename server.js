// Dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");

// Express
// =============================================================
// Starts Express server
const app = express();
const PORT = process.env.PORT || 3001;

// Lets Express use data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// Routes
// =============================================================
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Site returned when start button is clicked
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// Returns the JSON array
app.get("/api/notes", function (req, res) {
    return res.sendFile(path.join(__dirname, "./db/db.json"));
});

// Default route if no route if no route matches server
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

// Allows the ability to post to db.json
app.post("/api/notes", function (req, res) {
    let notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let addNote = req.body;
    addNote.id = notesList.length;

    notesList.push(addNote);

    fs.writeFileSync("./db/db.json", JSON.stringify(notesList));
    res.json(addNote);
});

// Allows the ability to delete notes from db.json
app.delete("/api/notes/:id", function(req, res) {
    let notesList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteID = 0;
    notesList = notesList.filter(filterNote => {
        return filterNote.id != req.params.id;
    });

    for (filterNote of notesList) {
        filterNote.id = noteID.toString();
        noteID++;
    }

    fs.writeFileSync("./db/db.json", JSON.stringify(notesList));
    res.json(notesList);
});

// Start Server
// =============================================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
});