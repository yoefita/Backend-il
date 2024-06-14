require('dotenv').config()

//import library CORS
const cors = require('cors')

//use cors
const express = require('express');
const app = express();
const port = process.env.APP_PORT;
app.use(cors())


//import body parser
const bodyParser = require('body-parser')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// Middleware to parse JSON bodies
app.use(express.json());

const notesRoutes = require('./routes/notes');
app.use('/api/notes', notesRoutes);

app.listen(port, () => {
    console.log(`app running at http://localhost:${port}`);
});
