const User = require('../models/auth.model');
const Game = require('../models/game.model');

exports.updateUserGameScore = (req, res) => {
    const { game, score, _id } = req.body;

    User.findOne({ _id }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user[game]) {
            user[game] = (user[game] < score ? score : user[game])
        } else {
            user[game] = score
        }

        user.save((err, savedUser) => {
            if (err) {
                console.log('USER UPDATE ERROR', err);
                return res.status(400).json({
                    error: 'User update failed'
                });
            }

            return res.status(200).json({
                user: savedUser
            });

            // Game.findOne({ game }).populate('highscores').exec((err, gameData) => {
            //     if (err) {
            //         return res.status(400).json({
            //             error: 'Game leaderboard fetching failed'
            //         });
            //     }

            //     if (gameData.highscores[gameData.highscores.length - 1][game] < score) {

            //     }

            //     return res.status(200).json({
            //         user: savedUser
            //     });
            // })
        })
    })
}