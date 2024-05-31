require('dotenv').config({ path: './.env' });
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//const interviewRoutes = require('./routes/interviewRoutes');

const app = express();
const port = process.env.PORT || 3001;

//commented out for now as not yet deployed
/**const corsOptions = {
    origin: 'front-end URL when deployed', 
    optionsSuccessStatus: 200,
  };***/


//app.use(cors(corsOptions));
app.use(bodyParser.json());
//app.use('set up routes for interview');

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
