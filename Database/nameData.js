const mongoose = require("mongoose");

const nameData = mongoose.Schema({ 
    guildId: { type: String, default: "" },
    uyeId: { type: String, default: "" },
    names: { type: Array, default: [] }
});

module.exports = mongoose.model("nameData", nameData);