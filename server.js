const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./config/db');

// Middlware
const loadingSimulator = require('./middleware/loadingSimulator');

// Test DB
db.authenticate()
  .then(async () => {
    console.log('Connected');

    require('./dbInit');
  })
  .catch((err) => {
    console.error(err.message);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling cors
app.use(cors());

app.get('/', (req, res) => res.send('Hello from M-Social backend!'));

// Routing
app.use('/rest', loadingSimulator(1000), require('./routes/rest'));

app.get('*', (req, res) => res.send('Endpoint Not Found!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
