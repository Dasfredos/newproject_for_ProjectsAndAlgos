const FootyController = require("../controllers/footy.controller");

module.exports = app => {
    app.get('/api/searchfootyevents', FootyController.findAllPickUp);
    app.get('/api/footyevent/:id', FootyController.findOnePickUp);
    app.post('/api/createfootyevent', FootyController.createNewPickUp);
    app.patch('/api/footyevent/:id', FootyController.updatePickUp);
    app.delete('/api/footyevent/:id', FootyController.deletePickUp);
};