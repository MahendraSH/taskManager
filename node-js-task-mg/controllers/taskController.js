
const CatchAsycErrors = require('../middlewares/asyc-error.js');
const Task = require('../models/taskModel.js');
const ErrorHandler = require('../utils/ErroHandler.js');

//  create Task 
const createTask = CatchAsycErrors(async (req, res, next) => {
    const { title, discription, date, month, year } = req.body;
    if (!date || Number(date) > 31 || Number(date) < 1) {
        return next(new ErrorHandler("date is required , or date is invalid ", 400))
    }
    if (!month || Number(month) > 12 || Number(month) < 1) {
        return next(new ErrorHandler("month is required , or  month is invalid  ", 400))
    }
    if (!year || Number(year) < 2000) {
        return next(new ErrorHandler("year is required ,or  year is invalid ", 400))
    }
    const todoDate = new Date(year, Number(month) - 1, Number(date) - 1)
    if (todoDate.getTime() < Date.now()) {
        return next(new ErrorHandler(" Complete  date is  invalid ", 400))

    }
    const newTask = await Task.create(
        {
            title: title,
            discription: discription,
            status: false,
            taskCompletionDay: todoDate,
            createdAt: Date.now(),
            updateAt: Date.now()
        }
    )
    res.status(201).json({
        success: true,
        newTask,
        message: "task created successfully",
    });
});
const getAllTask = CatchAsycErrors(async (req, res, next) => {
    const tasks = await Task.find();

    res.status(200).json({
        success: true,
        tasks,
    });
});
const getTaskById = CatchAsycErrors(async (req, res, next) => {


    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new ErrorHandler("task not found , please check the id ", 404));
    }
    res.status(200).json({
        success: true,
        task,
    });
});

const updateTaskById = CatchAsycErrors(async (req, res, next) => {


    const taskis = await Task.findById(req.params.id);
    if (!taskis) {
        return next(new ErrorHandler("task not found , please check the id ", 404));
    }
    const { title, status, discription, date, month, year } = req.body;

    if (taskis.status === true && status === true) {

        return next(new ErrorHandler("task is Completed , it Can not be changed  ", 400));
    }
    if (date && (Number(date) > 31 || Number(date) < 1)) {
        return next(new ErrorHandler(" date is invalid ", 400))

    }
    if (month && (Number(month) > 12 || Number(month) < 1)) {
        return next(new ErrorHandler("  month is invalid  ", 400))
    }
    if (year && (Number(year) < 2000)) {
        return next(new ErrorHandler("  year is invalid ", 400))
    }

    const todoDate = new Date(year, Number(month) - 1, Number(date) - 1)

    console.log(todoDate)
    if (todoDate.getTime() < Date.now() || isNaN(todoDate)) {

        return next(new ErrorHandler(" Complete  date is  invalid, or date , month or year is missing   ", 400))
    }
    const task = await Task.findByIdAndUpdate(req.params.id, {
        title, status, discription, status, taskCompletionDay: todoDate

    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    res.status(200).json({
        success: true,
        task,
        message: "task updated successfully",
    });
})
const deleteTaskById = CatchAsycErrors(async (req, res, next) => {

    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new ErrorHandler("task not found , please check the id ", 404));
    }
    await Task.deleteOne(task);
    res.status(200).json({
        success: true,
        message: "task deleted successfully",
    });

})

module.exports = { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById };