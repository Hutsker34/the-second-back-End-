//initialize express router
let router = require('express').Router();


//Import Bio Controller
var messageController = require('./messageController');

// Bio routes
router.route('/message')  
    .get(messageController.index) 
    .post(messageController.add)

router.route('/message/:message_id')   
    .delete(messageController.delete)
    .patch(messageController.update)
    .post(messageController.view);



//Export API routes
module.exports = router;
