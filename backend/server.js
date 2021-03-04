const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const cors= require("cors");

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
  //console.log(userData);
  dataUploadPath = __dirname + "/data/" + userData.email.toString().replace("@", "_").replace(".", "_");
  

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
