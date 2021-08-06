const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost://127.0.0.1:5500/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection;