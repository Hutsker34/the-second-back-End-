//Import Bio Model
Message = require('../model/messageModel');
Dialog = require('../model/dialogModel');
//For index
exports.index = function (req, res) {
    Message.get(function (err, message) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
        res.json({
            status: "success",
            message: "Got Bio Successfully!",
            data: message
        });
    });
};

exports.add = async function (req, res) {
    const message = new Message();
    const { name, avatar, time, id, text } = req.body.history
    message.name = name;
    message.avatar = avatar;
    message.time = time;
    message.id = id;
    message.text = text
    //Save and check error
    await message.save(function (err) {
        if (err) {
            res.json(err);
            return
        }
    });
    
    Dialog.findById(req.body.id, function (err, dialog) {
        if (err)
            return res.send(err);
            dialog.messages.push(message._id.toString())
        //save and check errors
        dialog.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "dialog Updated Successfully",
                data: message
            });
        });
    });
};



// View Bio
exports.view = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err)
            res.send(err);
        res.json({
            message: 'Bio Details',
            data: message
        });
    });
};

// Update Bio
exports.update = function (req, res) {
    Message.findById(req.params.message_id, function (err, message) {
        if (err)
            res.send(err);
        message.text = req.body.newText

        //save and check errors
        message.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Message Updated Successfully",
                data: message,
                success: true
            });
        });
    });
};

// Delete Bio

exports.delete = function (req, res) {
    Message.deleteOne({
        _id: req.params.message_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'message delete'
        });
    });
};