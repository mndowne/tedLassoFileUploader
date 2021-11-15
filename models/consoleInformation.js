const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consoleInformationSchema = new Schema({
    message: {
        type: String,
        required: true
    }
}, { timestamps: true } );

const consoleInformation = mongoose.model('consoleInformation', consoleInformationSchema);

module.exports = consoleInformation;

