const mongoose = require('mongoose');

//schema
const dialogSchema = mongoose.Schema({
    messages: {
        type: Array,
        default: []
    }
});

// Export Bio Model
const Dialog = module.exports = mongoose.model('dialog', dialogSchema);

module.exports.get = function (callback, limit) {
   Dialog.find(callback).limit(limit); 
}