const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    game: {
        required: true,
        type: String
    },
    highscores: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
});

module.exports = mongoose.model('Game', gameSchema);