const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: {
        type: String,

        required: [true, 'title is required'],
        trim: true,
        unique: [true, "title must be unique "],
        minLength: [4, "title must be at least 4 characters"],
    },
    discription: {
        type: String,
    },

    status: {
        type: Boolean,  // true/ 1 -> task completed 
        required: [true, "status is required "],

    },
    // category: {
    //     type: String,
    //     required: [true, 'category is required'],
    // }
    // ,

    // user: {
    //     type: mongoose.Schema.ObjectId,
    //     ref: 'User',
    //     required: true,
    // },

    createAt: {
        type: Date,
        default: Date.now,
        required: true,
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
        required: true,
    }
});

module.exports = mongoose.model('Task', taskSchema);