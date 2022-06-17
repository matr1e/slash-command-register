const mongoose = require("mongoose");

const regReqs = new mongoose.Schema({ 
    guildId: { type: String, default: "" },
    RegisterStaff: { type: Array, default: [] },
    JailStaff: { type: Array, default: [] },
    BanStaff: { type: Array, default: [] },
    MuteStaff: { type: Array, default: [] },
    TransportStaff: { type: Array, default: [] },
    ManRole: { type: Array, default: [] },
    WomanRole: { type: Array, default: [] },
    Unregister: { type: Array, default: [] },
    TagRole: { type: String, default: "" },
    JailedRole: { type: String, default: "" },
    MutedRole: { type: String, default: "" },
    RegisterLog: { type: String, default: "" },
    JailLog: { type: String, default: "" },
    MuteLog: { type: String, default: "" },
    BanLog: { type: String, default: "" },

});

module.exports = mongoose.model("registeryReqs", regReqs);