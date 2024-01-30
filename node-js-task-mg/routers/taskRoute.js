const express = require('express');
const { createTask, getAllTask, updateTaskById, getTaskById, deleteTaskById, getTaskToBeDoneToday } = require("../controllers/taskController");
const router = express.Router();

router.route('/create').post(createTask);
router.route('/all').get(getAllTask);
router.route('/today').get(getTaskToBeDoneToday);
router.route('/:id')
    .patch(updateTaskById)
    .get(getTaskById)
    .delete(deleteTaskById);

module.exports = router;
