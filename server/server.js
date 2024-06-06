require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const bodyParser = require("body-parser");
const routes = require('./routes/routes');

const app = express();
const port = process.env.PORT || 3001;


const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,
  };

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use('/api', routes);


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
