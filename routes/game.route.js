const express = require('express');
const router = express.Router();

// import controller
const { requireSignin } = require('../controllers/auth.controller');
const { getGameLeaderboard } = require('../controllers/game.controller');

router.get('/game/:game/leaderboard', requireSignin, getGameLeaderboard);

module.exports = router;