const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const port = 3004;
const app = express();
const router = require('./router')

app.use(morgan('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use('/product', router);


app.listen(port, () => console.log(`Now listening on port ${port}.`))
