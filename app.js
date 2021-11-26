const express = require ('express');

const {engine} = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mysql = require('mysql');

const app = express();
const port = process.env.PORT || 10000;

//default option
app.use(fileUpload());

//Static files
app.use(express.static('public'));
app.use(express.static('upload'));

//Templating engine
app.engine('hbs', engine({extname: '.hbs', }));
app.set('view engine', 'hbs');
app.set("views", "./view")




app.get('', (req, res) => {
    res.render('index');
});

app.post('', (req, res) => {
   let sampleFile;
   let uploadPath;
   
   if(!req.files || Object.keys(req.files).length === 0){
       return res.status(400).send('No files were uploaded.');
   }
   
   // name of the input is sampleFile
   sampleFile = req.files.sampleFile;
   uploadPath = __dirname + '/upload/' + sampleFile.name;
   console.log(sampleFile);

   // Use mv() to place file on the server
   sampleFile.mv(uploadPath, function(err) {
       if(err) return res.status(500).send(err);

       res.send('File uploaded!');
   });


});

app.listen(port, ()=> console.log('Listening on port ${port}'));

