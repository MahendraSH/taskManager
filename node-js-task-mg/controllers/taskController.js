
const CatchAsycErrors = require('../middlewares/asyc-error.js');
const Task = require('../models/taskModel.js');
const ErrorHandler = require('../utils/ErroHandler.js');

//  create Task 
const createTask = CatchAsycErrors(async (req, res, next) => {
    const { title, discription, } = req.body;
    const newTask = await Task.create(
        {
            title: title,
            discription: discription,
            status: false,
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


    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
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

    const taskis = await Task.findById(req.params.id);
    if (!taskis) {
        return next(new ErrorHandler("task not found , please check the id ", 404));
    }
    await Task.remove();
    res.status(200).json({
        success: true,
        message: "task deleted successfully",
    });

})

module.exports = { createTask, getAllTask, getTaskById, updateTaskById, deleteTaskById };