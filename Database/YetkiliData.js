const mongoose = require("mongoose")

const YetkiliData = new mongoose.Schema({
    guildId: { type: String, default: "" },
    Yetkili: String,
    Ban: Number,
    Jail: Number,
    Mute: Number,
    Reg: Number,
    MReg: Number,
    FMReg: Number,
    Puan: Number
})

module.exports = mongoose.model("YetkiliData", YetkiliData)