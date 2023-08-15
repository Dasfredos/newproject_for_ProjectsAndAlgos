const UserController = require('../controllers/user.controller');

module.exports = function(app){
    app.post('/api/register', UserController.registerUser);
    app.post('/api/login', UserController.loginUser);
    app.get('/api/user', UserController.index);
    app.get('/api/user-current', UserController.getLogged);
    app.get('/api/logout', UserController.logout);
    app.get('/user/:id', UserController.findOneUser);
    app.put('/api/user/update', UserController.updateOne);
}