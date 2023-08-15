const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = mongoose.Schema({

    first: {
        type: String,
        required: true,
        minLength: [2, 'Must be at least 2 characters']
    },
    last: {
        type: String,
        required: true,
        minLength: [2, 'Must be at least 2 characters']
    },
    skillLevel: {
        type: String,
        required: true,
        enum: ["For Fun", "Sunday League", "College", "Semi Pro", "Pro"]
    },
    aboutMe: {
        type: String,
        minLength: [10, 'Must be at least 10 characters']
    },

    email: {
        type: String,
        required: true,
        minLength: [8, 'Must be at least 8 characters']
    },
    password: {
        type: String,
        required: true,
        minLength: [8, 'Must be at least 8 characters']
    }
}, { timestamps: true });


UserSchema.virtual('confirmPassword')
    .get(function () { return this._confirmPassword; })
    .set(function (e) { this._confirmPassword = e; });
UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Passwords must match!')
    }
    next()
})

UserSchema.virtual('confirmEmail')
    .get(function () { return this._confirmEmail; })
    .set(function (e) { this._confirmEmail = e; });
UserSchema.pre('validate', function (next) {
    if (this.email !== this.confirmEmail) {
        this.invalidate('confirmEmail', 'Emails must match!')
    }
    next()
})

UserSchema.pre('save', async function (next) {
    try {
        const hashedPassword = await bcrypt.hash(this.password, 10)
        this.password = hashedPassword
        next()
    } catch (err) {
        console.log('ERROR IN SAVE: ', err)
    }
})

module.exports = mongoose.model('User', UserSchema);