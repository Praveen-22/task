const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:{
        type: String,
        required: true,
        createIndexes: { unique: true }
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model('user', UserSchema);