const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const cors= require("cors");
const fs= require("fs"); // solution 1: file system to save data to data folder into separate files
const low = require('lowdb') // solution 2: save data to dataWithLowDb with lowdb into a single file (don't run with nodemon or comment out the defaults lines after it creates the file at first post)
const FileSync = require('lowdb/adapters/FileSync')

//userData middleware: incoming string to .json
//app.use(express.json());

// default options
// middleware
app.use(fileUpload());
app.use(cors({origin: 'http://localhost:3000'}));



// form
app.use("/form", express.static(__dirname + "/../frontend/index.html"));

app.post("/upload", function (req, res) {
  let sampleFile;
  let uploadPath;

  let userData;
  let dataUploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.userfile;
  uploadPath = __dirname + "/upload/" + sampleFile.name;

  userData = JSON.parse(req.body.userData);
  console.log(userData);
  dataUploadPath = __dirname + "/data/" + userData.email.toString().replace("@", "_").replace(".", "_");
  fs.writeFile(dataUploadPath, req.body.userData, function (err) {
    if (err) throw err;
    console.log('Replaced!');
  });
  
  // use FileSync to store data in a single file
  const adapter = new FileSync(__dirname + "/dataWithLowdb/userData.json")
  const db = low(adapter)

  // Set some defaults, it creates the file at first post, then you can comment it out
  // db.defaults({users: []})
  // .write()

  // Add data to userData.json
  db.get('users') // select users in userData file
  .push(userData) // push to array
  .write()

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    res.json("File uploaded!");
  });
});

// serve static
app.use(express.static('../frontend'));

// localhost = "127.0.0.1"
app.listen(8000, "127.0.0.1", () => {
  console.log("Express server listening");
});

//app.listen(8000); // más is tudja használni, ha tudja az ip-met, csatlakozni tudna a 8000-es portomhoz


// email (@, stb kiszedni, .jsonban elmenteni őket)
// lowdb
