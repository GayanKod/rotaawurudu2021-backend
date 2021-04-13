const mongoose = require('mongoose');
const crypto = require('crypto');
// user schema
const userScheama = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true,
        lowercase: true
    },
    name: {
        type: String,
        trim: true,
        required: true
    },
    hashed_password: {
        type: String,
        required: true
    },
    salt: String,
    batch: {
        type: String,
        required: true
    },
    faculty: {
        type: String,
        required: true
    },
    house: {
        type: String,
        required: true
    },
    resetPasswordLink: {
        data: String,
        default: ''
    },

    // Game fields
    kanaMuttiya: {
        type: Number,
        min: 0
    },
    LissanaGasa: {
        type: Number,
        min: 0
    },
    GamaHarahaDiwima: {
        type: Number,
        min: 0
    },
    AliyataAsaThebima: {
        type: Number,
        min: 0
    },
    BaloonPipirima: {
        type: Number,
        min: 0
    },
    KottaPora: {
        type: Number,
        min: 0
    },
}, {
    timestamps: true
});

// virtual
userScheama
    .virtual('password')
    .set(function(password) {
        this._password = password;
        this.salt = this.makeSalt();
        this.hashed_password = this.encryptPassword(password);
    })
    .get(function() {
        return this._password;
    });

// methods
userScheama.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if (!password) return '';
        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },

    makeSalt: function() {
        return Math.round(new Date().valueOf() * Math.random()) + '';
    }
};

module.exports = mongoose.model('User', userScheama);