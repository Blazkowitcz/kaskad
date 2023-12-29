require('dotenv').config();
const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const config = require('./config.json');
const fs = require('fs');
const path = require('path');
const InitiateDatabase = require('./src/core/modules/database.module');

InitiateDatabase()

app.use(fileUpload());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));
app.use(bodyParser.json());
app.use(cors());
const routes = fs.readdirSync(config.routes_path);
routes.forEach(route => {
    require(`./${config.routes_path}/${route}`)(app);
});

app.listen(process.env.PORT || 3001, function() {});
