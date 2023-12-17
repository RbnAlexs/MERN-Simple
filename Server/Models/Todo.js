const mongoose = require('mongoose');

const TodoSchema = mongoose.Schema({
    task : {
        type: String,
        required: true
    },
    done:{
        type: Boolean,
        required: true, 
        default: false
    }
});

const Todomodel = mongoose.model('todos', TodoSchema);
module.exports = Todomodel;