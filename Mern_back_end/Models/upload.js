const mongoose = require('mongoose');

// Initialising the mongoose Schema
const Schema = mongoose.Schema;

// Registering the City Schema
const usersSchema = new Schema({
    // the better way to insert data using model of data, but here we don't know the what type of data user may enter
    // so, we are leaving this, use model surely for realtie applications.
})

module.exports = mongoose.model('Test', usersSchema );   // exporting the model