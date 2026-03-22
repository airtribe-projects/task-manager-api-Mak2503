# Task Manager API

## Overview
A RESTful API for managing tasks using Node.js, Express.js, and in-memory data storage

## Installation & Setup

Clone the repository and install the packages

```bash
git clone git@github.com:airtribe-projects/task-manager-api-Mak2503.git
cd task-manager-api-Mak2503
npm install
```

Run the project in development server
```bash
node app.js
```

## Documentation

### Base URL

`http://localhost:3000`

### Health Check

#### GET /

Simple route to verify the server is running.

Example response:

```text
Hello World!
```

### 1. Get All Tasks

#### GET /api/v1/tasks

Returns all tasks sorted by `createdAt` in descending order.

Query params:

- `completed` (optional): `true` or `false` to filter by completion status.

Example request:

```bash
curl "http://localhost:3000/api/v1/tasks?completed=false"
```

Example response:

```json
[
	{
		"id": 15,
		"title": "Install jsonwebtoken",
		"description": "Install jsonwebtoken",
		"completed": false,
		"priority": "high",
		"createdAt": "2024-06-08"
	}
]
```

### 2. Get Tasks by Priority

#### GET /api/v1/tasks/priority/:level

Returns tasks for a given priority level, sorted by `createdAt` in descending order.

Path params:

- `level`: Task priority (`high`, `medium`, or `low`).

Example request:

```bash
curl "http://localhost:3000/api/v1/tasks/priority/high"
```

Example response:

```json
[
	{
		"id": 1,
		"title": "Set up environment",
		"description": "Install Node.js, npm, and git",
		"completed": true,
		"priority": "high",
		"createdAt": "2024-06-05"
	}
]
```

### 3. Create Task

#### POST /api/v1/tasks

Creates a new task.

Request body:

- `title` (required, string)
- `description` (required, string)
- `completed` (required, boolean)
- `priority` (optional, string, default: `low`)

Example request:

```bash
curl -X POST "http://localhost:3000/api/v1/tasks" \
	-H "Content-Type: application/json" \
	-d '{
		"title": "Write README",
		"description": "Add API documentation for all routes",
		"completed": false,
		"priority": "medium"
	}'
```

Success response (`201`):

```json
{
	"id": 16,
	"title": "Write README",
	"description": "Add API documentation for all routes",
	"completed": false,
	"priority": "medium",
	"createdAt": "2026-03-22T12:00:00.000Z"
}
```

Validation errors (`400`):

- `Title and description are required`
- `Completed must be a boolean`

### 4. Get Task by ID

#### GET /api/v1/tasks/:id

Returns a single task by ID.

Path params:

- `id`: numeric task ID.

Example request:

```bash
curl "http://localhost:3000/api/v1/tasks/1"
```

Success response (`200`):

```json
{
	"id": 1,
	"title": "Set up environment",
	"description": "Install Node.js, npm, and git",
	"completed": true,
	"priority": "high",
	"createdAt": "2024-06-05"
}
```

Error response (`404`):

```text
Task not found
```

### 5. Update Task

#### PUT /api/v1/tasks/:id

Updates one or more fields of an existing task.

Path params:

- `id`: numeric task ID.

Request body (all fields optional):

- `title` (string)
- `description` (string)
- `completed` (boolean)
- `priority` (`high`, `medium`, `low`)

Example request:

```bash
curl -X PUT "http://localhost:3000/api/v1/tasks/1" \
	-H "Content-Type: application/json" \
	-d '{
		"title": "Set up local environment",
		"completed": true,
		"priority": "high"
	}'
```

Success response (`200`):

```json
{
	"id": 1,
	"title": "Set up local environment",
	"description": "Install Node.js, npm, and git",
	"completed": true,
	"priority": "high",
	"createdAt": "2024-06-05"
}
```

Validation errors (`400`):

- `Title must be a string`
- `Description must be a string`
- `Completed must be a boolean`
- `Invalid priority. Must be high, medium, or low`

Error response (`404`):

```text
Task not found
```

### 6. Delete Task

#### DELETE /api/v1/tasks/:id

Deletes a task by ID.

Path params:

- `id`: numeric task ID.

Example request:

```bash
curl -X DELETE "http://localhost:3000/api/v1/tasks/1"
```

Success response (`200`):

```text
Task deleted
```

Error response (`404`):

```text
Task not found
```

