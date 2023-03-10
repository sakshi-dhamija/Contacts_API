require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
require("./config/database").connect();

const express = require("express");
const app = express();

var bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer');
var csv = require('csvtojson');
app.use(express.json());

const User = require("./model/user");

// Register
app.post("/register", async (req, res) => {
    try{
        const {name, phone, email, linkedin_url, password} = req.body;
        if (!(name && phone && email && linkedin_url && password)) {
            res.status(400).send("All input is required");
        }
        const oldUser = await User.findOne({ email });
        if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
        }
        encryptedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            phone,
            email: email.toLowerCase(),
            linkedin_url,
            password: encryptedPassword,
        });
        const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
            expiresIn: "2h",
        }
        );
        user.token = token;
        res.status(201).json(user);
    } catch(err){
        console.log(err);
    }
});

// Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("All input is required");
        }
        const user = await User.findOne({ email });
        if(!user){
            return res.status(409).send("User does not Exist. Please Register");
        }

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          res.status(200).json(user);
        }
        res.status(400).send("Invalid Credentials");
      } catch (err) {
        console.log(err);
      }
});

//Show the list of registered users
app.get('/display-users', (req, res) => {
    User.find({}, (err, items) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json({ items: items });
        }
    });
});

const auth = require("./middleware/auth");

//Authorization using user token
app.post("/home", auth, (req, res) => {
  res.status(200).send("Welcome ???? ");
});

var upload = multer({ dest: 'uploads/' });
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//CSV file upload
app.post('/upload-csv', upload.single('file'), (req, res, next) => {
    csv()
    .fromFile(req.file.path)
    .then((jsonObj)=>{
        var input = [];
        for(var i = 0;i<jsonObj.length;i++){
            var obj={};
            obj.name=jsonObj[i]['Name'];
            obj.phone=jsonObj[i]['Phone'];
            obj.email=jsonObj[i]['Email'];
            obj.linkedin_url = jsonObj[i]['LinkedIn Url'];
            input.push(obj);
        }
        User.insertMany(input).then(function(){
            res.status(200).send({
                message: "Successfully Uploaded!"
            });
        }).catch(function(error){
            res.status(500).send({
                message: "failure",
                error
            });
        });
    }).catch((error) => {
        res.status(500).send({
            message: "failure2",
            error
        });
    })
});
module.exports = app;