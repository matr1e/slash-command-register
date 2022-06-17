const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/settings.json');
const requirements = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");

module.exports = {
    name: "kontrol",
    description: "Kontrol",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
    ],
    run: async (client, interaction) => {

        
        function embed(msg) {
            const emb = new MessageEmbed()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${msg}**`)
            .setFooter({ text: "Matrié" })
            
            interaction.reply({ embeds: [emb] });
        }

        if(Settings.Footer.some(id => interaction.member.id !== id)) return;

        const reqs = await requirements.findOne({ guildId: interaction.guild.id }).clone();

        embed(`**Ayarlanan roller aşağıdadır. \n\n Kayıt Yetkilisi: ${reqs ? ( reqs.RegisterStaff ? reqs.RegisterStaff.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Jail Staff: ${reqs ? ( reqs.JailStaff ? reqs.JailStaff.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Ban Staff: ${reqs ? ( reqs.BanStaff ? reqs.BanStaff.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Mute Staff: ${reqs ? ( reqs.MuteStaff ? reqs.MuteStaff.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Transport Staff: ${reqs ? ( reqs.TransportStaff ? reqs.TransportStaff.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Erkek Rol: ${reqs ? ( reqs.ManRole ? reqs.ManRole.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Kadın Rol: ${reqs ? ( reqs.WomanRole ? reqs.WomanRole.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Kayıtsız Rol: ${reqs ? ( reqs.Unregister ? reqs.Unregister.map(x => `<@&${x}>`) : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Kayıt Log: ${reqs ? ( reqs.RegisterLog ? `<#${reqs.RegisterLog}>` : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Jail Log: ${reqs ? ( reqs.JailLog ? `<#${reqs.JailLog}>` : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Ban Log: ${reqs ? ( reqs.BanLog ? `<#${reqs.BanLog}>` : "Ayarlanmamış." ) : "Dataya ulaşılamadı."} \n Mute Log: ${reqs ? ( reqs.MuteLog ? `<#${reqs.MuteLog}>` : "Ayarlanmamış." ) : "Dataya ulaşılamadı."}**`);
    }
}