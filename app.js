const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const connect = require('./database/db');
const BackendRoute = require('./Routes/user');
const FrontEndRoute = require('./Routes/frontend.user');

// Set up view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/user/',BackendRoute);
app.use('/',FrontEndRoute);


// Set up partials (optional)
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home Page' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
