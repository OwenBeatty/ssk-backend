const bcrypt = require("bcrypt");
const validator = require("validator")
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

//static signup method
userSchema.statics.signup = async function(username, password) {
    //validation
    if (!username || !password) {
        throw Error("All fields required");
    }
    if (!validator.isStrongPassword(password)) {
        throw Error("Stronger password required");
    }

    const exists = await this.findOne({ username });

    if (exists) {
        throw Error("Username not available");
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ username, password: hash });

    return user;
}

//static login method
userSchema.statics.login = async function(username, password) {
    if (!username || !password) {
        throw Error("All fields required");
    }

    const user = await this.findOne({ username });

    if (!user) {
        throw Error("User not found");
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
        throw Error("Incorrect password");
    }

    return user;
}

module.exports = mongoose.model("User", userSchema);