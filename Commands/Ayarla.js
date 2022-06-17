const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/settings.json');
const requirements = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");

module.exports = {
    name: "set",
    description: "Sets a role/channel.",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 4, name: 'selection', description: 'Select' },
        { type: 2, name: 'role', description: 'Rol Belirtin' },
        { type: 3, name: 'channel', description: 'Kanal Belirtin' }
    ],
    run: async (client, interaction) => {

        
        function embed(msg) {
            const emb = new MessageEmbed()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${msg}**`)
            .setFooter({ text: "Matrié" })
            
            interaction.reply({ embeds: [emb], ephemeral: true });
        }
        
        const sec = interaction.options.getString('selection');

        if(Settings.Footer.some(id => interaction.member.id !== id)) return;
        if(!sec) return embed("Lütfen ayarlanacak bir şey belirtiniz.");

        if(sec === "regStaff"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { RegisterStaff: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Register Staff" olarak ayarlandı!`);
        };

        if(sec === "jailStaff"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { JailStaff: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Jail Staff" olarak ayarlandı!`);
        }

        if(sec === "banStaff"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { BanStaff: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Ban Staff" olarak ayarlandı!`);
        }
        
        if(sec === "muteStaff"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { MuteStaff: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Mute Staff" olarak ayarlandı!`);
        }

        if(sec === "transportStaff"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { TransportStaff: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Transport Staff" olarak ayarlandı!`);
        }

        


        if(sec === "manRole"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { ManRole: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Erkek Rol" olarak ayarlandı!`);
        }

        if(sec === "womanRole"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { WomanRole: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Kadın Rol" olarak ayarlandı!`);
        }

        
        if(sec === "unregRole"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { Unregister: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Kayıtsız Rol" olarak ayarlandı!`);
        }

        if(sec === "mutedRole"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $set: { MutedRole: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Muted Rol" olarak ayarlandı!`);
        }

        if(sec === "jailRole"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $set: { JailedRole: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Cezalı Rol" olarak ayarlandı!`);
        }

        if(sec === "tagRole"){
            const role = interaction.options.getRole('role');
            if(!role) return embed(`Lütfen bir rol belirtiniz.`)
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $set: { TagRole: role.id } }, { upsert: true });
            await embed(`Başarıyla <@&${role.id}> adlı rol "Taglı Rol" olarak ayarlandı!`);
        }

        
        if(sec === "rlogChnl"){
            const chnl = interaction.options.getChannel('channel');
            if(!chnl) return embed("Bir kanal belirtin!");
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $set: { RegisterLog: chnl.id } }, { upsert: true });
            await embed(`Başarıyla <#${chnl.id}> adlı kanal "Kayıt Log Kanalı" olarak ayarlandı!`);
        }

        if(sec === "mlogChnl"){
            const chnl = interaction.options.getChannel('channel');
            if(!chnl) return embed("Bir kanal belirtin!");
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $set: { MuteLog: chnl.id } }, { upsert: true });
            await embed(`Başarıyla <#${chnl.id}> adlı kanal "Mute Log Kanalı" olarak ayarlandı!`);
        }

        if(sec === "banLogChnl"){
            const chnl = interaction.options.getChannel('channel');
            if(!chnl) return embed("Bir kanal belirtin!");
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $set: { BanLog: chnl.id } }, { upsert: true });
            await embed(`Başarıyla <#${chnl.id}> adlı kanal "Ban Log Kanalı" olarak ayarlandı!`);
        }

        if(sec === "jlogChnl"){
            const chnl = interaction.options.getChannel('channel');
            if(!chnl) return embed("Bir kanal belirtin!");
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $set: { JailLog: chnl.id } }, { upsert: true });
            await embed(`Başarıyla <#${chnl.id}> adlı kanal "Cezalı Log Kanalı" olarak ayarlandı!`);
        }

        if(sec === "tagLogChnl"){
            const chnl = interaction.options.getChannel('channel');
            if(!chnl) return embed("Bir kanal belirtin!");
            await requirements.findOneAndUpdate({ guildId: interaction.guild.id }, { $push: { TagLog: chnl.id } }, { upsert: true });
            await embed(`Başarıyla <#${chnl.id}> adlı kanal "Tag Log Kanalı" olarak ayarlandı!`);
        }

    }
}