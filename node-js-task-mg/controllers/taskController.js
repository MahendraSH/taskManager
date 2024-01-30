
const CatchAsycErrors = require('../middlewares/asyc-error.js');
const categoriesModel = require('../models/categoriesModel.js');
const Task = require('../models/taskModel.js');
const ErrorHandler = require('../utils/ErroHandler.js');
const ApiFeatures = require("../utils/apiFeatures.js")

//  create Task 
const createTask = CatchAsycErrors(async (req, res, next) => {
    const { title, discription, date, month, year, category } = req.body;
    if (!date || Number(date) > 31 || Number(date) < 1) {
        return next(new ErrorHandler("date is required , or date is invalid ", 400))
    }
    if (!month || Number(month) > 12 || Number(month) < 1) {
        return next(new ErrorHandler("month is required , or  month is invalid  ", 400))
    }
    if (!year || Number(year) < 2000) {
        return next(new ErrorHandler("year is required ,or  year is invalid ", 400))
    }
    const todoDate = new Date(year, Number(month) - 1, Number(date))
    if (todoDate.getTime() < new Date(new Date().toDateString()).getTime()) {
        return next(new ErrorHandler(" Complete  date is  invalid ", 400))

    }
    const categoryTobeAdded = await categoriesModel.findOne({
        name: category
    })
    if (!categoryTobeAdded) {

        return next(new ErrorHandler(" Category is not present   , please firt create this category and try again", 400))
    }
    const newTask = await Task.create(
        {
            title: title,
            discription: discription,
            status: false,
            taskCompletionDay: todoDate,
            categoryId: categoryTobeAdded._id,
            category: categoryTobeAdded.name,
            createdAt: Date.now(),
            updateAt: Date.now()
        }
    )
    const lastDateToCompleteTask = newTask.taskCompletionDay.toDateString();

    res.status(201).json({
        success: true,
        newTask,
        lastDateToCompleteTask,
        message: "task created successfully",
    });
});
const getAllTask = CatchAsycErrors(async (req, res, next) => {
    const resultPerPage = 10;

    const tototalTasks = await Task.countDocuments();
    const apiFeature = new ApiFeatures(Task.find(), req.query)
        .search()
        .filter()
        .pagination(resultPerPage);
    const tasks = await apiFeature.query

    res.status(200).json({
        success: true,
        tasks,
        tototalTasks
    });
});
const getTaskById = CatchAsycErrors(async (req, res, next) => {


    const task = await Task.findById(req.params.id);
    if (!task) {
        return next(new ErrorHandler("task not found , please check the id ", 404));
    }

    const lastDateToCompleteTask = task.taskCompletionDay.toDateString();
    res.status(200).json({
        success: true,
        task,
        lastDateToCompleteTask
    });
});

const updateTaskById = CatchAsycErrors(async (req, res, next) => {


    const taskis = await Task.findById(req.params.id);
    if (!taskis) {
        return next(new ErrorHandler("task not found , please check the id ", 404));
    }
    const { title, status, discription, date, month, year, category } = req.body;

    if (taskis.status && Boolean(status)) {

        return next(new ErrorHandler("task is Completed , it Can not be changed  ", 400));
    }
    let taskCompletionDay;
    if (date && month && year) {

        if (date && (Number(date) > 31 || Number(date) < 1)) {
            return next(new ErrorHandler(" date is invalid ", 400))

        }
        if (month && (Number(month) > 12 || Number(month) < 1)) {
            return next(new ErrorHandler("  month is invalid  ", 400))
        }
        if (year && (Number(year) < 2000)) {
            return next(new ErrorHandler("  year is invalid ", 400))
        }

        taskCompletionDay = new Date(year, Number(month) - 1, Number(date) - 1)

        if (taskCompletionDay.getTime() >= new Date(new Date().toDateString()).getTime() || isNaN(taskCompletionDay)) {

            return next(new ErrorHandler(" Complete  date is  invalid, or date , month or year is missing   ", 400))
        }
    }

    let categoryTobeAdded;

    if (category) {

        categoryTobeAdded = await categoriesModel.findOne({
            name: category
        })
        if (!categoryTobeAdded) {

            return next(new ErrorHandler(" Category is not present   , please firt create this category and try again", 400))
        }
    }
    let task = await Task.findByIdAndUpdate(req.params.id, {
        title,
        status,
        discription,
        status,
        updateAt: Date.now(),
        taskCompletionDay,
        categoryId: categoryTobeAdded._id,
        category: categoryTobeAdded.name,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });
    const lastDateToCompleteTask = task.taskCompletionDay.toDateString();

    res.status(200).json({
        success: true,
        task,
        lastDateToCompleteTask,
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


const getTaskToBeDoneToday = CatchAsycErrors(async (req, res, next) => {


    const today = new Date().toDateString()
    const task = await Task.find();
    let tasks = task.filter((item) => {

        return today === item.taskCompletionDay.toDateString();
    })

    res.status(200).json({
        success: true,
        tasks,
    })

})
module.exports = { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById, getTaskToBeDoneToday };