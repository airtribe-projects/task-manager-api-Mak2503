const express = require('express');
const tasksRoute = require('./routes/tasksRoutes')

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1', tasksRoute);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;