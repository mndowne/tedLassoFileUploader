const express = require('express');
const fileUpload =require('express-fileupload');
const bodyParser = require("body-parser");
const fs = require("fs");

// express app
const app = express();

const PORT = process.env.PORT || 3000


// this is if we wanted to change the default views location. 
//app.set('views','NotDefaultFolder');


console.log("Server is now up on port " + PORT )

//middleware & static files
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use(express.static('chapter_1'));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        debug: true
    })
);



//routes

app.get('/tedLasso', (req, res) => {
    res.sendFile('./chapter_1/tedLasso.html', { root: __dirname }); 
});

app.post('/convert', (req, res) => {
    console.log("started sending file: ");
    let to = req.body.to;
    let file = req.files.file;
    console.log(file);
    //let fileName = `output.${to}`;
    console.log(to);
    console.log(file);

    file.mv("tmp/" + file.name, function (err) {
        if (err) return res.sendStatus(500).send(err);
        console.log("File Uploaded successfully");
    })

    res.redirect('/tedLasso');

});

app.use((req, res) => {
    res.status(404).sendFile('./chapter_1/404.html', { root: __dirname }); 
});


// listen for requests
app.listen(PORT);


