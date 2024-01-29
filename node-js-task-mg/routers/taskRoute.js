const express = require('express');
const { createTask, getAllTask, updateTaskById, getTaskById, deleteTaskById } = require("../controllers/taskController");
const router = express.Router();

router.route('/create').post(createTask);
router.route('/all').get(getAllTask);
router.route('/:id')
    .patch(updateTaskById)
    .get(getAllTask)
    .delete(deleteTaskById);

module.exports = router;
