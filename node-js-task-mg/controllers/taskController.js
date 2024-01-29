
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

module.exports = {createTask};