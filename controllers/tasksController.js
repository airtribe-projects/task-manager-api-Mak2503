const { tasks } = require('../task.json');

const getAllTasks = (req, res) => {
    res.send(tasks);
}

const createTask = (req, res) => {
    const newTask = {
		id: tasks.length + 1,
		title: req.body.title,
		description: req.body.description,
		completed: req.body.completed
	}
	tasks.push(newTask);
	res.send(newTask);
}

const getTaskById = (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    res.send(task);
}

const updateTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
        res.send(tasks[taskIndex]);
    }
}

const deleteTask = (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
        res.send('Task deleted');
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTaskById,
    updateTask,
    deleteTask
}