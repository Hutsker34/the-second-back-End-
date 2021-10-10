//Import Bio Model
Dialog = require('../model/dialogModel');
Message = require('../model/messageModel');

//For index
exports.index = function (req, res) {
    Dialog.get(function (err, dialog) {
        if (err)
            res.json({
                status: "error",
                message: err
            });

        Message.find({
            'id': {$in: dialog.map(it => it._id)}
        }, function (err, docs) {
            if (err) {
                return res.json({
                    status: "error",
                    message: err
                });
            }

            // Аналог convert, только пробегаемся по всем сообщениям и аккумулируем по айдишнику диалога (поле id в модели сообщения)
            const result = docs.reduce((total, item) => {
                if (total[item.id]) {
                    total[item.id].push(item)
                } else {
                    total[item.id] = [item];
                }
                return total;
            }, {});

            return res.json({
                status: "success",
                message: "Got dialog Successfully!",
                data: result
            });
        });
    });
};
exports.add = function (req, res) {
    const dialog = new Dialog();

    //Save and check error
    dialog.save(function (err) {
        if (err)
            res.json(err);

        res.json({
            message: "New dialog Added!",
            data: dialog
        });
    });
};

// View Bio
exports.view = function (req, res) {
    Dialog.findById(req.params.dialog_id, function (err, dialog) {
        if (err)
            res.send(err);
        res.json({
            message: 'dialog Details',
            data: dialog
        });
    });
};

// Update Bio
exports.update = function (req, res) {
    Dialog.findById(req.params.dialog_id, function (err, dialog) {
        if (err)
            res.send(err);
            dialog.messages.push(...req.body.messages_id)
        //save and check errors
        dialog.save(function (err) {
            if (err)
                res.json(err)
            res.json({
                message: "dialog Updated Successfully",
                data: dialog
            });
        });
    });
};

// Delete Bio
exports.delete = function (req, res) {
    Dialog.deleteOne({
        _id: req.params.dialog_id
    }, function (err, contact) {
        if (err)
            res.send(err)
        res.json({
            status: "success",
            message: 'dialog delete'
        });
    });
};