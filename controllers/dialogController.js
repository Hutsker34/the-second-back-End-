//Import Bio Model
Dialog = require('../model/dialogModel');

//For index
exports.index = function (req, res) {
    Dialog.get(function (err, dialog) {
        if (err)
            res.json({
                status: "error",
                message: err
            });
            
        res.json({
            status: "success",
            message: "Got dialog Successfully!",
            data:  convert(dialog) 
        });
    });
};
/**
 * {'hdf453hdhf774ff3321':[],'44gg556gm6f24f4rt5':[]}
 *  
 * [ {_id:'44gg556gm6f24f4rt5' ,messages :[]} { _id:'rhft556f24f4rt5' ,messages :[] } ]
 */ 
function convert (mus){
    let object = {
            
    }
    for(let key in mus){
        const {_id, messages}=mus[key]
        object[_id]=messages
    }
    return object
}

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