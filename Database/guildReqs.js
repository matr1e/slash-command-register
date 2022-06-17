const mongoose = require("mongoose");

const guildReqs = mongoose.Schema({ 
    GuildId: { type: String, default: "" },
    Tag: { type: String, default: "" },
    ChatChannel: { type: String, default: "" },
    WelcomeChannel: { type: String, default: "" },
    LogChannel: { type: String, default: "" }
});

module.exports = mongoose.model("guildReqs", guildReqs);