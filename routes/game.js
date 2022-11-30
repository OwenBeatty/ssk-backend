const express = require("express");
const {
    getGames,
    getGame,
    createGame,
    deleteGame
} = require("../controllers/gameController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//require auth for all routes
router.use(requireAuth);

//GET all games
router.get("/", getGames);

//GET single game
router.get("/:id", getGame);

//POST new game
router.post("/", createGame);

//DELETE new game
router.delete("/:id", deleteGame);

module.exports = router;