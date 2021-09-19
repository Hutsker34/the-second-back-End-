 //Import Bio Model
Message = require('./messageModel');

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

exports.add = function (req, res) {
    const message = new Message();
    message.name = req.body.name;
    message.avatar = req.body.avatar;
    message.time = req.body.time;
    message.id = req.body.id;
    message.text = req.body.text

    //Save and check error
    message.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New Bio Added!",
            data: message
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
            message.text = req.body.text

        //save and check errors
        message.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "Message Updated Successfully",
                data: message
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