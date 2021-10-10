//initialize express router
let router = require('express').Router();


//Import Bio Controller
const messageController = require('./controllers/messageController');
const dialogController = require('./controllers/dialogController');

// Bio routes
router.route('/message')  
    .get(messageController.index) 
    .post(messageController.add)

router.route('/message/:message_id')   
    .delete(messageController.delete)
    .patch(messageController.update)
    .post(messageController.view);

router.route('/dialog')   
    .get(dialogController.index)
    .post(dialogController.add)

router.route('/dialog/:dialog_id')
    .delete(dialogController.delete)
    .patch(dialogController.update)
    .post(dialogController.view)


//Export API routes
module.exports = router;
