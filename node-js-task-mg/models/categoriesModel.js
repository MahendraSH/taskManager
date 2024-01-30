const mongoose = require('mongoose');
const categorySchema = mongoose.Schema({
    name: {
        type: String,

        required: [true, 'Category name is required'],
        trim: true,
        unique: [true, "Category name must be unique "],
        minLength: [3, "Category name must be at least 3 characters"],
    },

    createAt: {
        type: Date,
        default: Date.now(),
        required: true,
    },

});

module.exports = mongoose.model('Category', categorySchema);