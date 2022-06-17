const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/Settings.json');
const requirements = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");
const client = require("../index");
const moment = require("moment");
require("moment-duration-format");


client.on("guildMemberAdd", async member => {

    let wc = client.channels.cache.get(Settings.Channels.Welcome);
    let guvenlik = (Date.now() - member.user.createdTimestamp) > 604800000;
    let tm = member.guild.memberCount;
    let createdAt = moment.duration(guvenlik).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]");
    let suspicius = moment.duration(guvenlik).format("DD [Gün], HH [Saat], mm [Dakika]");

    const reqs = await requirements.findOne({ guildId: member.guild.id }).clone();

    if(guvenlik) {
        member.roles.add(reqs.Unregister);
        wc.send(`${member} - \`${member.id}\` sunucuya hoşgeldin! \n Sunucu seninle birlikte \`${tm}\` üyeye ulaştı! \n Hesabın ${createdAt} önce oluşturulmuş. | ${guvenlik ? Settings.Yes : Settings.No} \n <@&${reqs.RegisterStaff}> rolündeki yetkililerimiz seninle ilgileneceklerdir. \n Tagımızı almak için herhangi bir kanala \`.tag\` yazman yeterli. \n İyi sohbetler!`);
    } else {
        member.roles.add(reqs.Suspicius);
        wc.send(`${member} adlı üyenin hesabı ${suspicius} önce açıldığı için onu karantinaya aldım.`);
    }

    if(member.user.username.includes(Settings.Main.Tag)){
        member.roles.add(reqs.TagRole);
        wc.send(`${member} adlı üyemiz taglı olarak sunucuya katıldığı için ona taglı rolü verdim!`);
    };

})