const tasksNotFoundHandler = (req, res, next) => {
	if (req.baseUrl === "/api/v1/tasks") {
		return res.status(404).json({
			error: "Not Found",
			message: `No route found for ${req.method} ${req.originalUrl}`,
		});
	}

	next();
};

const errorHandler = (err, req, res, next) => {
	if (res.headersSent) {
		return next(err);
	}

	console.error(err);

	const statusCode = err.statusCode || 500;
	const message = err.message || "Internal Server Error";

	return res.status(statusCode).json({
		error: statusCode === 500 ? "Internal Server Error" : "Request Error",
		message,
	});
};

module.exports = {
	tasksNotFoundHandler,
	errorHandler,
};
