const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enabling cors
app.use(cors());

app.get('/', (req, res) => res.send('Hello from M-Social backend!'));

app.listen(port, () => console.log(`App listening on port ${port}!`));
