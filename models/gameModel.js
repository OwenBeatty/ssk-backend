const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    players: {
        type: Array,
        required: true
    },
    scoreHistory: {
        type: Array,
        required: true
    },
    user_id: {
        type: String,
        required: true
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Game", gameSchema);