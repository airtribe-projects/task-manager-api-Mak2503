const { tasks } = require('../task.json');

const getAllTasks = (req, res) => {
    res.send(tasks);
}

const createTask = (req, res) => {
    if (!req.body.title || !req.body.description) {
        return res.status(400).send('Title and description are required');
    }

    if (typeof req.body.completed !== 'boolean') {
        return res.status(400).send('Completed must be a boolean');
    }

    try {
        const newTask = {
            id: tasks.length + 1,
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed
        }
        tasks.push(newTask);
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send('Error creating task');
    }
}

const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (task) {
        res.status(200).send(task);
    } else {
        res.status(404).send('Task not found');
    }
}

const updateTask = (req, res) => {
    if (req.body.title && typeof req.body.title !== 'string') {
        return res.status(400).send('Title must be a string');
    }
    
    if (req.body.description && typeof req.body.description !== 'string') {
        return res.status(400).send('Description must be a string');
    }

    if (req.body.completed !== undefined && typeof req.body.completed !== 'boolean') {
        return res.status(400).send('Completed must be a boolean');
    }
    
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.status(200).send(tasks[taskIndex]);
    } else {
        res.status(404).send('Task not found');
    }
}

const deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(200).send('Task deleted');
    } else {
        res.status(404).send('Task not found');
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}