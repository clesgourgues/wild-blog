/*
This file define document schema for post
*/
'use strict'
let mongoose = require('mongoose')

// Create schema Post
module.exports = mongoose.model('Post', new mongoose.Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    createdAt:
    {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedAt:
    {
        type: Date,
        required: true,
        default: Date.now
    },
    published:
    {
        type: Boolean,
        default: false
    }
}, {
        timestamps: true
    }))
