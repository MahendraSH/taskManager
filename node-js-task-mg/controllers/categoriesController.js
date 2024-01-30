
const CatchAsycErrors = require('../middlewares/asyc-error.js');
const Category = require('../models/categoriesModel.js');
const Task = require('../models/taskModel.js');

const ErrorHandler = require('../utils/ErroHandler.js');

const createCategory = CatchAsycErrors(async (req, res, next) => {
    const newCategory = await Category.create(
        req.body
    )
    res.status(201).json({
        success: true,
        newCategory,
        message: "category created successfully",
    });
})
const getAllCategory = CatchAsycErrors(async (req, res, next) => {
    const categories = await Category.find();
    res.status(200).json({
        success: true,
        categories,
    });
})
const getCategoryById = CatchAsycErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return next(new ErrorHandler("category not found , please check the id ", 404));
    }
    res.status(200).json({
        success: true,
        category,
    });
})
const updateCategoryById = CatchAsycErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return next(new ErrorHandler("category not found , please check the id ", 404));
    }
    const updatedCategory = await Category.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({
        success: true,
        updatedCategory,
        message: " Category updated"
    });
})
const deleteCategoryById = CatchAsycErrors(async (req, res, next) => {
    const category = await Category.findById(req.params.id)
    if (!category) {
        return next(new ErrorHandler("category not found , please check the id ", 404));
    }
    const tasks = await Task.find({ categoryId: category._id })

    console.log(tasks)

    if (!tasks || !tasks.length) {
        await Category.deleteOne(category)
    } else {

        return next(new ErrorHandler("category is in use can not be deleted ", 401));
    }
    res.status(200).json({
        success: true,
        message: " Category deleted"
    });
})

module.exports = { createCategory, getAllCategory, getCategoryById, updateCategoryById, deleteCategoryById }