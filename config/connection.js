const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/NoSQL-Challenge-Social-Network', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// Use this to log mongo queries being executed!
mongoose.set('debug', true);

module.exports = mongoose.connection;