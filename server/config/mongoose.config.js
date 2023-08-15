const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/User", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => ("Something went wrong when connecting to the database ", err));
