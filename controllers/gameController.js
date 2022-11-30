const Game = require("../models/gameModel");
const mongoose = require("mongoose");

//get all games
const getGames = async (req, res) => {
    const user_id = req.user._id;

    const games = await Game.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(games);
}

//get single game
const getGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Game not found" });
    }

    const game = await Game.findById(id);

    if (!game) {
        return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(game);
}

//create new game
const createGame = async (req, res) => {
    const {players, scoreHistory} = req.body;

    //ensure all fields are filled out
    let emptyFields = [];

    if(!players) {
        emptyFields.push("players");
    }
    if(!scoreHistory) {
        emptyFields.push("scores");
    }
    if(emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    //add game to db
    try {
        const user_id = req.user._id;
        const game = await Game.create({ players, scoreHistory, user_id });
        res.status(200).json(game);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

//delete a game
const deleteGame = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Game not found" });
    }

    const game = await Game.findOneAndDelete({ _id: id });

    if (!game) {
        return res.status(404).json({ error: "Game not found" });
    }

    res.status(200).json(game);
}

module.exports = {
    getGames,
    getGame,
    createGame,
    deleteGame
}