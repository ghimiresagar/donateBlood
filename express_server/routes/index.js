let express = require('express');
let router = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');

// require control models
let user_controller = require('../controllers/userController');
const user = require('../models/user');

/* url - /donation 
   everything is under this url as it reduces error with front end
*/

router.get('/', user_controller.index);

// register, we don't want to have authentication to register
router.post('/registration', user_controller.registration);
// login
router.post('/', passport.authenticate('local', {session: false}), user_controller.authenticate);
// logout
router.get('/logout', passport.authenticate('jwt', {session: false}), user_controller.logout);
// authentication
router.get('/authenticated', passport.authenticate('jwt', {session: false}), user_controller.authenticated);

// get the users to display for dashboard, don't need no authentication for this
router.get('/donation', user_controller.get_users_dashboard);
// get the users (filtered) for the dashboard
router.post('/donation/filtered', user_controller.get_users_dashboard_filtered);

// routes for user profile
// get the user profile information
router.post('/donation/profile', passport.authenticate('jwt', {session: false}), user_controller.post_user_information);
// update user profile information
router.post('/donation/profile/update', passport.authenticate('jwt', {session: false}), user_controller.post_update_user_information);
module.exports = router;