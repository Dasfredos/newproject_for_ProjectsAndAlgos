const FootyEvent = require('../models/footyevent.model');
const jwt = require('jsonwebtoken');
const SECRET = "OHSOSECRET";

const POPULATE_OPTIONS = 'first last skillLevel aboutMe';

const handleError = (res, err, msg = 'An error occurred') => {
    console.log(msg, err);
    return res.status(400).json({ message: msg, errors: err.errors });
};

module.exports = {

    createNewFootyEvent: async (req, res) => {
        try {
            console.log("request cookies", req.cookies);
            const user = jwt.verify(req.cookies.userToken, SECRET);
            console.log("getting user", user)
            const newEvent = await FootyEvent.create({ ...req.body, creator: user });
            console.log("anything", newEvent)
            res.status(201).json(newEvent);
        } catch (err) { console.log(err)
            handleError(res, err, 'Create Obj error');
        }
    },

    findAllFootyEvent: async (req, res) => {
        try {
            let currentDate = new Date();
            currentDate.setHours(0, 0, 0, 0);

            let query = { date: { $gte: currentDate } };
            if (req.query.address) query.address = new RegExp(req.query.address, 'i');

            const allFootyEvents = await FootyEvent.find(query).populate("creator", POPULATE_OPTIONS);  console.log("allfootyevents1", allFootyEvents)

            const formattedFootyEvents = allFootyEvents.map(event => ({
                ...event._doc,
                date: new Date(event.date).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })
            }));
console.log("all footy events", formattedFootyEvents)
            res.json(formattedFootyEvents);
        } catch (err) {
            handleError(res, err);
        }
    },

    findOneSingleFootyEvent: async (req, res) => {
        try {
            const event = await FootyEvent.findById(req.params.id).populate("creator", POPULATE_OPTIONS);
            res.json(event);
        } catch (err) {
            handleError(res, err);
        }
    },

    updateFootyEvent: async (req, res) => {
        try {
            const updatedEvent = await FootyEvent.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
            res.json(updatedEvent);
        } catch (err) {
            handleError(res, err);
        }
    },

    deleteFootyEvent: async (req, res) => {
        try {
            const result = await FootyEvent.findByIdAndDelete(req.params.id);
            res.json(result);
        } catch (err) {
            handleError(res, err);
        }
    },

    showRandomFootyEvent: async (req, res) => {
        try {
            const [randomEvent] = await FootyEvent.aggregate([{ $sample: { size: 1 } }]);
            res.json(randomEvent);
        } catch (err) {
            handleError(res, err);
        }
    },

    findFootyEventByLocation: async (req, res) => {
        try {
            const { city, state, zip } = req.query;
            let query = {};
            if (city) query.city = city;
            if (state) query.state = state;
            if (zip) query.zip = zip;

            const events = await FootyEvent.find(query).populate("creator", POPULATE_OPTIONS);
            res.json(events);
        } catch (err) {
            handleError(res, err);
        }
    }

}
