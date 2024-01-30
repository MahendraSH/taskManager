
### Task API

#### 1. Create Task

- **Endpoint:** `POST http://localhost:5000/api/task/create`
- **Request Body:**
  ```json
  {
    "title": "Event Title",
    "date": "31",
    "month": "12",
    "year": "2024",
    "category": "Category Name"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "newTask": { /* Task details */ },
    "lastDateToCompleteTask": "Tue Jan 30 2024",
    "message": "Task created successfully"
  }
  ```

#### 2. Get All Tasks

- **Endpoint:** `GET http://localhost:5000/api/task/all`
- **Response:**
  ```json
  {
    "success": true,
    "tasks": [ /* List of tasks */ ],
    "totalTasks": 15
  }
  ```

#### 3. Get Task by ID

- **Endpoint:** `GET http://localhost:5000/api/task/:id`
- **Response:**
  ```json
  {
    "success": true,
    "task": { /* Task details */ }
  }
  ```

#### 4. Update Task by ID

- **Endpoint:** `PATCH http://localhost:5000/api/task/:id`
- **Request Body:**
  ```json
  {
    "title": "Updated Task Title",
    "status": true,
    "taskCompletionDay": "2024-02-15T18:30:00.000Z",
    "categoryId": "65b8dbc57d4d8d9cd5c3ddd9"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "updatedTask": { /* Updated task details */ }
  }
  ```

#### 5. Get Today's Tasks

- **Endpoint:** `GET http://localhost:5000/api/task/today`
- **Response:**
  ```json
  {
    "success": true,
    "tasks": [ /* List of tasks scheduled for today */ ]
  }
  ```

#### 6. Delete Task by ID

- **Endpoint:** `DELETE http://localhost:5000/api/task/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Task deleted successfully"
  }
  ```

### Category API

#### 1. Create Category

- **Endpoint:** `POST http://localhost:5000/api/category/create`
- **Request Body:**
  ```json
  {
    "name": "New Category"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "newCategory": { /* New category details */ },
    "message": "Category created successfully"
  }
  ```

#### 2. Get All Categories

- **Endpoint:** `GET http://localhost:5000/api/category/all`
- **Response:**
  ```json
  {
    "success": true,
    "categories": [ /* List of categories */ ]
  }
  ```

#### 3. Get Category by ID

- **Endpoint:** `GET http://localhost:5000/api/category/:id`
- **Response:**
  ```json
  {
    "success": true,
    "category": { /* Category details */ }
  }
  ```

#### 4. Update Category by ID

- **Endpoint:** `PATCH http://localhost:5000/api/category/:id`
- **Request Body:**
  ```json
  {
    "name": "Updated Category Name"
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "updatedCategory": { /* Updated category details */ }
  }
  ```

#### 5. Delete Category by ID

- **Endpoint:** `DELETE http://localhost:5000/api/category/:id`
- **Response:**
  ```json
  {
    "success": true,
    "message": "Category deleted successfully"
  }
  ```
