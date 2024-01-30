# Node Single User Task Manager

- [Tech Stack](#tech-stack)
- [Get Started](#get-started)
- [API Documentation](#api-documentation)
- [EndPoints Summery](./endPointsSummery.md)

## Tech Stack

- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose.js](https://mongoosejs.com/)
- [Express.js](https://expressjs.com/)

## Get Started

1. **Clone the Project:**

   Clone the repository to your local machine.

   ```bash
   git clone https://github.com/your-username/node-single-user-task-manager.git
   ```

2. **Navigate to Project Directory:**

   Change your working directory to the project folder.

   ```bash
   cd node-single-user-task-manager
   ```

3. **Install Dependencies:**

   Install the project dependencies using either `yarn` or `npm`.

   ```bash
   yarn
   # or
   npm install
   ```

4. **Create Environment File:**

   Create a `.env` file in the project root based on the provided `.env.example`. Update the `MONGODB_URL` with your MongoDB connection URL.

   ```env
   PORT=5000
   MONGODB_URL=<your-mongodb-connection-url>
   ```

5. **Run the Application:**

   Start the application using the following command:

   ```bash
   yarn dev
   # or
   npm run dev
   ```

   The project will be running at `http://localhost:5000`.

6. **Explore API Documentation:**

   Open your browser and navigate to [http://localhost:5000](http://localhost:5000) to explore the API documentation. You can find details about creating tasks, getting tasks, updating tasks, working with categories, and more.

7. **Test the Endpoints:**

   Use tools like [Postman](https://www.postman.com/) or [curl](https://curl.se/) to test the API endpoints as per the provided documentation.

8. **Start Building:**

   Now that you have the project set up, feel free to explore the code, make modifications, and build upon the existing features.

9. **Happy Coding!**

   You are all set! Start building your Node Single User Task Manager application.

---

# API Documentation

- [Task API Docs](#task-api)
  - [Create Task](#create-task)
  - [Get All Tasks](#get-all-tasks)
  - [Get Task by ID](#get-task-by-id)
  - [Update Task by ID](#update-task-by-id)
  - [Get Today's Tasks](#get-todays-tasks)
  - [Delete Task by ID](#delete-task-by-id)
- [Category API Docs](#category-api)
  - [Create Category](#create-category)
  - [Get All Categories](#get-all-categories)
  - [Get Category by ID](#get-category-by-id)
  - [Update Category by ID](#update-category-by-id)
  - [Delete Category by ID](#delete-category-by-id)

## Task API

- ### Create Task

  - API Method: `POST`

### Endpoint: http://localhost:5000/api/task/create

- Request Body JSON

```json
{
  "title": "Event Title",
  "date": "31",
  "month": "12",
  "year": "2024",
  "category": "Category Name"
}
```

- Parameters

  - `title` (string): Title of the event (minimum 3 letters).
  - `date` (string): Day of the event (1-31).
  - `month` (string): Month of the event (1-12).
  - `year` (string): Year of the event (4 digits).
  - `category` (string): Name of the category (must be created before).

- Response

  - **Success Status Code:** 201 Created
  - **Error Status Code:** 400 Bad Request

- Example

#### Request

```http
POST /api/task/create
Content-Type: application/json

{
    "title": "Event Title",
    "date": "31",
    "month": "12",
    "year": "2024",
    "category": "Category Name"
}
```

#### Response

```json
{
  "success": true,
  "newTask": {
    "title": "Event Title",
    "status": false,
    "taskCompletionDay": "2024-01-30T18:30:00.000Z",
    "categoryId": "65b8dc027d4d8d9cd5c3dde2",
    "category": "node",
    "createAt": "2024-01-30T13:22:03.317Z",
    "updatedAt": "2024-01-30T13:22:03.317Z",
    "_id": "65b8f82064b5cd9b4e7a866d",
    "__v": 0
  },
  "lastDateToCompleteTask": "Tue Jan 30 2024",
  "message": "Task created successfully"
}
```

- Response Body

```json
{
  "success": true,
  "newTask": {
    "title": "Event Title",
    "status": false,
    "taskCompletionDay": "2024-01-30T18:30:00.000Z",
    "categoryId": "65b8dc027d4d8d9cd5c3dde2",
    "category": "node",
    "createAt": "2024-01-30T13:22:03.317Z",
    "updatedAt": "2024-01-30T13:22:03.317Z",
    "_id": "65b8f82064b5cd9b4e7a866d",
    "__v": 0
  },
  "lastDateToCompleteTask": "Tue Jan 30 2024",
  "message": "Task created successfully"
}
```

- Response Components

  - `success` (boolean): Indicates whether the task creation was successful.
  - `newTask` (object): Details of the newly created task.
    - `title` (string): Title of the task.
    - `status` (boolean): Task completion status.
    - `taskCompletionDay` (string): Date and time when the task is expected to be completed.
    - `categoryId` (string): ID of the category to which the task belongs.
    - `category` (string): Name of the category.
    - `createAt` (string): Timestamp of when the task was created.
    - `updatedAt` (string): Timestamp of when the task was last updated.
    - `_id` (string): Unique identifier for the task.
    - `__v` (integer): Version of the task document.
  - `lastDateToCompleteTask` (string): Formatted date indicating the last date to complete the task.
  - `message` (string): A message indicating the success status and additional information.

- Notes

  - The `success` field is `true` if the task creation is successful.
  - The `newTask` object contains detailed information about the newly created task.
  - `lastDateToCompleteTask` provides a human-readable format of the last date to complete the task.
  - The `message` field provides additional information about the result of the task creation.

- Error Responses

  - **400 Bad Request**
    - If the request body is missing any required field.
    - If the event title is less than 3 characters.
    - If the date, month, or year is not in the specified range.
    - If the category does not exist.

- ### Get All Tasks

  Retrieve a list of all tasks with various query options for searching, filtering, and pagination.

  - Endpoint: `GET /api/task/all`

- Query Parameters

  - `keyword` (string, optional): Search for tasks containing the specified keyword.

    - Example: `GET /api/task/all?keyword=search`

  - `category` (string, optional): Filter tasks by category name.

    - Example: `GET /api/task/all?category=categoryName`

  - `status` (integer, optional): Filter tasks by status (1 for true, 0 for false).

    - Example: `GET /api/task/all?status=1`

  - `page` (integer, optional):

Retrieve tasks for a specific page in the paginated result. - Example: `GET /api/task/all?page=2`

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "tasks": [
    {
      "_id": "65b8f0bb2fbf5b64383f99e6",
      "title": "title-1",
      "status": false,
      "taskCompletionDay": "2024-02-01T18:30:00.000Z",
      "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
      "category": "web",
      "createAt": "2024-01-30T12:44:56.235Z",
      "updatedAt": "2024-01-30T12:44:56.235Z",
      "__v": 0
    },
    {
      "_id": "65b8f0cb2fbf5b64383f99e9",
      "title": "title-2",
      "status": false,
      "taskCompletionDay": "2024-02-01T18:30:00.000Z",
      "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
      "category": "web",
      "createAt": "2024-01-30T12:44:56.235Z",
      "updatedAt": "2024-01-30T12:44:56.235Z",
      "__v": 0
    }
    // ... 10 responses in one page
  ],
  "totalTasks": 15
}
```

- Response Components

  - `success` (boolean): Indicates whether the request was successful.
  - `tasks` (array): List of tasks matching the specified query parameters.
    - Each task object includes details such as `_id`, `title`, `status`, `taskCompletionDay`, `categoryId`, `category`, `createAt`, `updatedAt`, and `__v`.
  - `totalTasks` (integer): Total number of tasks that match the query parameters.

- Examples

  - Retrieve all tasks: `GET /api/task/all`
  - Search for tasks containing a keyword: `GET /api/task/all?keyword=search`
  - Filter tasks by category: `GET /api/task/all?category=categoryName`
  - Filter tasks by status: `GET /api/task/all?status=1`
  - Retrieve tasks for a specific page: `GET /api/task/all?page=2`

- ### Get Task by ID

  Retrieve details of a specific task by providing its unique identifier.

  - Endpoint: `GET http://localhost:5000/api/task/:id`

- Path Parameters

  - `id` (string): Unique identifier of the task.

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "task": {
    "_id": "65b8f0bb2fbf5b64383f99e6",
    "title": "title-1",
    "status": false,
    "taskCompletionDay": "2024-02-01T18:30:00.000Z",
    "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
    "category": "web",
    "createAt": "2024-01-30T12:44:56.235Z",
    "updatedAt": "2024-01-30T12:44:56.235Z",
    "__v": 0
  }
}
```

- Response Components

  - `success` (boolean): Indicates whether the request was successful.
  - `task` (object): Details of the requested task.
    - Includes properties such as `_id`, `title`, `status`, `taskCompletionDay`, `categoryId`, `category`, `createAt`, `updatedAt`, and `__v`.

- Example

  - Retrieve task by ID: `GET /api/task/65b8f0bb2fbf5b64383f99e6`

```json
{
  "success": true,
  "task": {
    "_id": "65b8f0bb2fbf5b64383f99e6",
    "title": "title-1",
    "status": false,
    "taskCompletionDay": "2024-02-01T18:30:00.000Z",
    "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
    "category": "web",
    "createAt": "2024-01-30T12:44:56.235Z",
    "updatedAt": "2024-01-30T12:44:56.235Z",
    "__v": 0
  }
}
```

- Error Responses

  - **404 Not Found**
    - If the specified `id` does not exist.

- Example

  - Error response for a non-existing task: `GET /api/task/invalidTaskId`

```json
{
  "success": false,
  "error": "Task not found"
}
```

- ### Update Task by ID

  Update the details of a specific task by providing its unique identifier.

  - Endpoint: `PATCH http://localhost:5000/api/task/:id`

- Path Parameters

  - `id` (string): Unique identifier of the task.

- Request Body

```json
{
  "title": "Updated Task Title",
  "status": true,
  "categoryId": "65b8dbc57d4d8d9cd5c3ddd9"
}
```

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "updatedTask": {
    "_id": "65b8f0bb2fbf5b64383f99e6",
    "title": "Updated Task Title",
    "status": true,
    "taskCompletionDay": "2024-02-15T18:30:00.000Z",
    "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
    "category": "web",
    "createAt": "2024-01-30T12:44:56.235Z",
    "updatedAt": "2024-01-30T14:30:45.421Z",
    "__v": 1
  }
}
```

- Request Components

  - `title` (string, optional): New title for the task.
  - `status` (boolean, optional): New status for the task (true or false).
  - `taskCompletionDay` (string, optional): New date and time when the task is expected to be completed.
  - `categoryId` (string, optional): New ID of the category to which the task belongs.

- Response Components

  - `success` (boolean): Indicates whether the request was successful.
  - `updatedTask` (object): Details of the updated task.
    - Includes properties such as `_id`, `title`, `status`, `

taskCompletionDay`, `categoryId`, `category`, `createAt`, `updatedAt`, and `\_\_v`.

- Example

  - Update task by ID: `PATCH /api/task/65b8f0bb2fbf5b64383f99e6`

    - Request

```http
PATCH /api/task/65b8f0bb2fbf5b64383f99e6
Content-Type: application/json

{
    "title": "Updated Task Title",
    "status": true,
    "taskCompletionDay": "2024-02-15T18:30:00.000Z",
    "categoryId": "65b8dbc57d4d8d9cd5c3ddd9"
}
```

    - Response

```json
{
  "success": true,
  "updatedTask": {
    "_id": "65b8f0bb2fbf5b64383f99e6",
    "title": "Updated Task Title",
    "status": true,
    "taskCompletionDay": "2024-02-15T18:30:00.000Z",
    "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
    "category": "web",
    "createAt": "2024-01-30T12:44:56.235Z",
    "updatedAt": "2024-01-30T14:30:45.421Z",
    "__v": 1
  }
}
```

- Error Responses

  - **404 Not Found**

    - If the specified `id` does not exist.
    - If the status cannot be updated if it is already true.

  - Example

    - Error response for a non-existing task: `PATCH /api/task/invalidTaskId`

```json
{
  "success": false,
  "error": "Task not found"
}
```

- ### Get Today's Tasks

  Retrieve tasks scheduled for the current date.

  - Endpoint: `GET http://localhost:5000/api/task/today`

  - Response

    - **Success Status Code:** 200 OK

    ```json
    {
      "success": true,
      "tasks": [
        {
          "_id": "65b8f0bb2fbf5b64383f99e6",
          "title": "title-1",
          "status": false,
          "taskCompletionDay": "2024-02-01T18:30:00.000Z",
          "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
          "category": "web",
          "createAt": "2024-01-30T12:44:56.235Z",
          "updatedAt": "2024-01-30T12:44:56.235Z",
          "__v": 0
        },
        {
          "_id": "65b8f0cb2fbf5b64383f99e9",
          "title": "title-2",
          "status": false,
          "taskCompletionDay": "2024-02-01T18:30:00.000Z",
          "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
          "category": "web",
          "createAt": "2024-01-30T12:44:56.235Z",
          "updatedAt": "2024-01-30T12:44:56.235Z",
          "__v": 0
        }
        // ... other tasks scheduled for today
      ]
    }
    ```

  - Response Components

    - `success` (boolean): Indicates whether the request was successful.
    - `tasks` (array): List of tasks scheduled for today.
      - Each task object includes details such as `_id`, `title`, `status`, `taskCompletionDay`, `categoryId`, `category`, `createAt`, `updatedAt`, and `__v`.

  - Example

    - Get today's tasks: `GET /api/task/today`

      - Response

    ```json
    {
      "success": true,
      "tasks": [
        {
          "_id": "65b8f0bb2fbf5b64383f99e6",
          "title": "title-1",
          "status": false,
          "taskCompletionDay": "2024-02-01T18:30:00.000Z",
          "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
          "category": "web",
          "createAt": "2024-01-30T12:44:56.235Z",
          "updatedAt": "2024-01-30T12:44:56.235Z",
          "__v": 0
        },
        {
          "_id": "65b8f0cb2fbf5b64383f99e9",
          "title": "title-2",
          "status": false,
          "taskCompletionDay": "2024-02-01T18:30:00.000Z",
          "categoryId": "65b8dbc57d4d8d9cd5c3ddd9",
          "category": "web",
          "createAt": "2024-01-30T12:44:56.235Z",
          "updatedAt": "2024-01-30T12:44:56.235Z",
          "__v": 0
        }
        // ... other tasks scheduled for today
      ]
    }
    ```

  - Error Responses

    - **404 Not Found**

      - If there are no tasks scheduled for today.

    - Example

      - Error response for no tasks today: `GET /api/task/today`

    ```json
    {
      "success": false,
      "error": "No tasks scheduled for today"
    }
    ```

- ### Delete Task by ID

  Delete a specific task by providing its unique identifier.

  - Endpoint: `DELETE http://localhost:5000/api/task/:id`

- Path Parameters

  - `id` (string): Unique identifier of the task.

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

- Example

  - Delete task by ID: `DELETE /api/task/65b8f0bb2fbf5b64383f99e6`

    - Response

```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

- Error Responses

  - **404 Not Found**

    - If the specified `id` does not exist.

  - Example

    - Error response for a non-existing task: `DELETE /api/task/invalidTaskId`

```json
{
  "success": false,
  "error": "Task not found"
}
```

- Note

  - Deletion of a task is irreversible.

- ## Category API

- ### Create Category

  - Endpoint: `POST http://localhost:5000/api/category/create`

- Request Body

```json
{
  "name": "New Category"
}
```

- Response

  - **Success Status Code:** 201 Created

```json
{
  "success": true,
  "newCategory": {
    "_id": "65b8f72c2fbf5b64383f9a18",
    "name": "New Category",
    "createAt": "2024-01-30T13:04:12.671Z",
    "__v": 0
  },
  "message": "Category created successfully"
}
```

- Request Components

  - `name` (string): Name of the new category (minimum 3 characters).

- Response Components

  - `success` (boolean): Indicates whether the request was successful.
  - `newCategory` (object): Details of the newly created category.
    - Includes properties such as `_id`, `name`, `createAt`, and `__v`.
  - `message` (string): A message indicating the success status and additional information.

- Example

  - Create a new category: `POST /api/category/create`

    - Request

```http
POST /api/category/create
Content-Type: application/json

{
    "name": "New Category"
}
```

    - Response

```json
{
  "success": true,
  "newCategory": {
    "_id": "65b8f72c2fbf5b64383f9a18",
    "name": "New Category",
    "createAt": "2024-01-30T13:04:12.671Z",
    "__v": 0
  },
  "message": "Category created successfully"
}
```

- Error Responses

  - **400 Bad Request**

    - If the request body is missing the `name` field.
    - If the name of the category is less than 3 characters.

  - Example

    - Error response for missing `name` field: `POST /api/category/create`

```json
{
  "success": false,
  "error": "Category name is required"
}
```

- ### Get All Categories

  - Endpoint: `GET http://localhost:5000/api/category/all`

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "categories": [
    {
      "_id": "65b8f72c2fbf5b64383f9a18",
      "name": "New Category",
      "createAt": "2024-01-30T13:04:12.671Z",
      "__v": 0
    },
    {
      "_id": "65b8f0cb2fbf5b64383f99e9",
      "name": "web",
      "createAt": "2024-01-30T12:44:56.235Z",
      "__v": 0
    }
    // ... other categories
  ]
}
```

- Response Components

  - `success` (boolean): Indicates whether the request was successful.
  - `categories` (array): List of categories.
    - Each category object includes details such as `_id`, `name`, `createAt`, and `__v`.

- Example

  - Get all categories: `GET /api/category/all`

    - Response

```json
{
  "success": true,
  "categories": [
    {
      "_id": "65b8f72c2fbf5b64383f9a18",
      "name": "New Category",
      "createAt": "2024-01-30T13:04:12.671Z",
      "__v": 0
    },
    {
      "_id": "65b8f0cb2fbf5b64383f99e9",
      "name": "web",
      "createAt": "2024-01-30T12:44:56.235Z",
      "__v": 0
    }
    // ... other categories
  ]
}
```

- ### Get Category by ID

  -

Endpoint: `GET http://localhost:5000/api/category/:id`

- Path Parameters

  - `id` (string): Unique identifier of the category.

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "category": {
    "_id": "65b8f72c2fbf5b64383f9a18",
    "name": "New Category",
    "createAt": "2024-01-30T13:04:12.671Z",
    "__v": 0
  }
}
```

- Response Components

  - `success` (boolean): Indicates whether the request was successful.
  - `category` (object): Details of the requested category.
    - Includes properties such as `_id`, `name`, `createAt`, and `__v`.

- Example

  - Get category by ID: `GET /api/category/65b8f72c2fbf5b64383f9a18`

    - Response

```json
{
  "success": true,
  "category": {
    "_id": "65b8f72c2fbf5b64383f9a18",
    "name": "New Category",
    "createAt": "2024-01-30T13:04:12.671Z",
    "__v": 0
  }
}
```

- Error Responses

  - **404 Not Found**

    - If the specified `id` does not exist.

  - Example

    - Error response for a non-existing category: `GET /api/category/invalidCategoryId`

```json
{
  "success": false,
  "error": "Category not found"
}
```

- ### Update Category by ID

  - Endpoint: `PATCH http://localhost:5000/api/category/:id`

- Path Parameters

  - `id` (string): Unique identifier of the category.

- Request Body

```json
{
  "name": "Updated Category Name"
}
```

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "updatedCategory": {
    "_id": "65b8f72c2fbf5b64383f9a18",
    "name": "Updated Category Name",
    "createAt": "2024-01-30T13:04:12.671Z",
    "__v": 1
  }
}
```

- Request Components

  - `name` (string, optional): New name for the category.

- Response Components

  - `success` (boolean): Indicates whether the request was successful.
  - `updatedCategory` (object): Details of the updated category.
    - Includes properties such as `_id`, `name`, `createAt`, and `__v`.

- Example

  - Update category by ID: `PATCH /api/category/65b8f72c2fbf5b64383f9a18`

    - Request

```http
PATCH /api/category/65b8f72c2fbf5b64383f9a18
Content-Type: application/json

{
    "name": "Updated Category Name"
}
```

    - Response

```json
{
  "success": true,
  "updatedCategory": {
    "_id": "65b8f72c2fbf5b64383f9a18",
    "name": "Updated Category Name",
    "createAt": "2024-01-30T13:04:12.671Z",
    "__v": 1
  }
}
```

- Error Responses

  - **404 Not Found**

    - If the specified `id` does not exist.

  - Example

    - Error response for a non-existing category: `PATCH /api/category/invalidCategoryId`

```json
{
  "success": false,
  "error": "Category not found"
}
```

- ### Delete Category by ID

  - Endpoint: `DELETE http://localhost:5000/api/category/:id`

- Path Parameters

  - `id` (string): Unique identifier of the category.

- Response

  - **Success Status Code:** 200 OK

```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

- Example

  - Delete category by ID: `DELETE /api/category/65b8f72c2fbf5b64383f9a18`

    - Response

```json
{
  "success": true,
  "message": "Category deleted successfully"
}
```

- Error Responses

  - **404 Not Found**

    - If the specified `id` does not exist.

  - Example

    - Error response for a non-existing category: `DELETE /api/category/invalidCategoryId`

```json
{
  "success": false,
  "error": "Category not found"
}
```
