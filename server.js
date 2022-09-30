const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(PORT, () => {
     console.log(`Express server listening on http://localhost:${PORT}`)
})