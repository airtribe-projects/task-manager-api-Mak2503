const express = require('express');
const tasksRouter = require('./routes/tasksRoutes')
const { tasksNotFoundHandler, errorHandler } = require('./middlewares');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/tasks', tasksRouter);
app.use('/api/v1/tasks', tasksNotFoundHandler);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});

app.use(errorHandler);

module.exports = app;
