const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/Settings.json');
const requirements = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");
const client = require("../index");
const moment = require("moment");
require("moment-duration-format");


client.on("userUpdate", async (oldUser, newUser)  => {

    function embed(msg, authr) {
        const emb = new MessageEmbed()
        .setAuthor({ name: authr })
        .setDescription(`**${msg}**`)
        .setFooter({ text: "Matrié" })
        
        tagchnl.send({ embeds: [emb] });
    }

    let member = client.guilds.cache.get(Settings.Main.GuildID).members.cache.get(oldUser.id);

    const reqs = await requirements.findOne({ guildId: member.guild.id }).clone();
    let tagchnl = client.channels.cache.get(reqs.TagLog);

    if(oldUser.tag !== newUser.tag){
        if(oldUser.tag.includes(Settings.Main.Tag) && !newUser.tag.includes(Settings.Main.Tag)){
            member.roles.remove(reqs.TagRole);
            embed(`${member} adlı üyemiz kullanıcı adından \`${Settings.Main.Tag}\` tagını çıkardığı için ailemizden ayrıldı.`, "Aramızdan Ayrıldı");
        }

        if(!oldUser.tag.includes(Settings.Main.Tag) && newUser.tag.includes(Settings.Main.Tag)){
            member.roles.add(reqs.TagRole);
            embed(`${member} adlı üyemiz kullanıcı adından \`${Settings.Main.Tag}\` tagını aldığı için ailemize katıldı!`, "Aramıza Katıldı");
        }

        if(oldUser.tag.includes(Settings.Main.EtiketTag) && !newUser.tag.includes(Settings.Main.EtiketTag)){
            member.roles.remove(reqs.TagRole);
            embed(`${member} adlı üyemiz kullanıcı adından \`${Settings.Main.EtiketTag}\` tagını çıkardığı için ailemizden ayrıldı.`, "Aramızdan Ayrıldı");
        }

        if(!oldUser.tag.includes(Settings.Main.EtiketTag) && newUser.tag.includes(Settings.Main.EtiketTag)){
            member.roles.add(reqs.TagRole);
            embed(`${member} adlı üyemiz kullanıcı adından \`${Settings.Main.EtiketTag}\` tagını aldığı için ailemize katıldı!`, "Aramıza Katıldı");
        }
    }

})