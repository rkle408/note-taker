const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

const htmlRoute = require('./routes/htmlRoute');
const apiRoute = require('./routes/apiRoute');

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Need to create API routes to get and post notes
app.use('/api', apiRoute);

// Need to create HTML routes for the index and notes
app.use('/', htmlRoute);

app.listen(PORT, () => {
     console.log(`Express server listening on http://localhost:${PORT}`)
})