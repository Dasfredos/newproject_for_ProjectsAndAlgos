const FootyController = require("../controllers/footy.controller");

module.exports = (app) => {
    app.get('/api/searchfootyevents', FootyController.findAllFootyEvent);
    app.get('/api/footyevent/:id', FootyController.findOneSingleFootyEvent);
    app.post('/api/createfootyevent', FootyController.createNewFootyEvent);
    app.patch('/api/footyevent/:id', FootyController.updateFootyEvent);
    app.delete('/api/footyevent/:id', FootyController.deleteFootyEvent);
};