const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var corsOptions = {
    origin:"http://Localhost:3000"
};

app.use(cors(corsOptions));

//parse requests of content-type - application/json
app.use(express.json());

//parse requests of content-type - application/json
app.use(express.urlencoded({extended:true}));

//database
const db = require("./models");
const Role = db.role;

db.sequelize.sync();
//forse:true will drop the table if it already exists
// db.sequelize.sync({forse:true}).then(()=>{
//     console.log('Drop and Resync Database with { force: true}');
//      initial();
// });

//parse requests of content-type - application/json
app.use(bodyParser.json());

//parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended:true}));

//simple route
app.get("/",(req, res)=> {
    res.json({message:"welcome to the CoffeeShop application"})
});

//routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);

//set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT,() => {
    console.log(`server is running on ${PORT}.`);
});

// function initial(){
//     Role.create({
//         id:1,
//         name:"user"
//     });

//     Role.create({
//         id:2,
//         name:"moderator"
//     });

//     Role.create({
//         id:3,
//         name:"admin"
//     });
// }

