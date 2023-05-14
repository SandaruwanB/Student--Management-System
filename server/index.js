const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();
dotenv.config({path: '../config.env'});

// uncomment to create sample user (password: admin@123, email : admin@gmail.com)
//require("../server/database/sampleUser");

const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use('/', require('../server/routs/routes'));

app.listen(port, ()=>console.log('server started on http://localhost:' + port));