const mongoose = require('mongoose');

const FootyEventSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, 'Must be at least 2 characters'],
        minlength: 2
    },
    date: {
        type: Date,
        required: [true, "Date is required"]
    },
    time: {
        type: String,
        required: [true, 'Time is required']

    },
    address: {
        type: String,
        required: [true, 'Must be at least 10 characters'],
        minlength: 10
    },

    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
},
    {
        timestamps: true
    },
);

module.exports = mongoose.model('FootyEvent', FootyEventSchema);