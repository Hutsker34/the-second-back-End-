const mongoose = require('mongoose');

//schema
const messageSchema = mongoose.Schema({
    name: {
        type: String,
        required: false, 
        default: ''
    },
    avatar: {
        type: String,
        required: false,
        default: ''
    },
    time: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});

// Export Bio Model
const Message = module.exports = mongoose.model('message', messageSchema);

module.exports.get = function (callback, limit) {
    Message.find(callback).limit(limit);
}