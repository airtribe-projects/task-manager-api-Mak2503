const { v4: uuidv4 } = require('uuid');
const { tasks } = require('../task.json');

const PRIORITY_LEVELS = ['high', 'medium', 'low'];

const getAllTasks = (req, res) => {
    const { completed } = req.query;
    if (completed !== undefined) {
        const filteredTasks = tasks.filter(task => task.completed === Boolean(completed));
        filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return res.send(filteredTasks);
    }
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.send(tasks);
}

const getAllTasksByPriority = (req, res) => {
    const filteredTasks = tasks.filter(task => task.priority === req.params.level);
    filteredTasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    res.send(filteredTasks);
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
            id: uuidv4(),
            title: req.body.title,
            description: req.body.description,
            completed: req.body.completed,
            priority: req.body.priority || 'low',
            createdAt: new Date().toISOString()
        }
        tasks.push(newTask);
        res.status(201).send(newTask);
    } catch (error) {
        res.status(500).send('Error creating task');
    }
}

const getTaskById = (req, res) => {
    const task = tasks.find(task => task.id === req.params.id);
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

    if (req.body.priority && !PRIORITY_LEVELS.includes(req.body.priority)) {
        return res.status(400).send('Invalid priority. Must be high, medium, or low');
    }

    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.status(200).send(tasks[taskIndex]);
    } else {
        res.status(404).send('Task not found');
    }
}

const deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(task => task.id === req.params.id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.status(200).send('Task deleted');
    } else {
        res.status(404).send('Task not found');
    }
}

module.exports = {
    getAllTasks,
    getAllTasksByPriority,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}
