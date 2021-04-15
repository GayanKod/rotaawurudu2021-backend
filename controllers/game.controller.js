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

        if (!user[game] || (user[game] && (typeof user[game] === 'number' ? user[game] < score : user[game].score < score))) {
            switch (game) {
                case 'LissanaGasa':
                    user[game] = {
                        score: score,
                        time: req.body.time,
                        clicks: req.body.click
                    };
                    break;

                case 'AliyataAsaThebima':
                    user[game] = {
                        score: score,
                        time: req.body.time,
                        distance: req.body.distance
                    };
                    break;

                case 'kanaMuttiya':
                    user[game] = {
                        score: score,
                        time: req.body.time,
                        maxMutti: req.body.maxMutti
                    }
                    break;

                default:
                    user[game] = score;
                    break;
            }
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
        })
    })
}

exports.getGameLeaderboard = (req, res) => {
    const game = req.params.game;
    let query = '';

    switch (game) {
        case 'LissanaGasa', 'AliyataAsaThebima', 'kanaMuttiya':
            query = `${game}.score`;
            break;

        default:
            query = game;
            break;
    }

    User.find({}).sort([
        [query, -1]
    ]).exec((err, docs) => {
        if (err) {
            return res.status(400).json({
                error: err
            });
        }

        return res.status(200).json({
            data: docs
        });
    })
}