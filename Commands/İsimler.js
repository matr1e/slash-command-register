const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/settings.json');
const requirements = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");

module.exports = {
    name: "isimler",
    description: "Belirttiğiniz kişinin isimlerini sıralar",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Birisini etiketleyin.' },
    ],
    run: async (client, interaction) => {

        
        function embed(msg) {
            const emb = new MessageEmbed()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${msg}**`)
            .setFooter({ text: "Matrié" })
            
            interaction.reply({ embeds: [emb] });
        }

        const reqs = await requirements.findOne({ guildId: interaction.guild.id }).clone();

        const user = interaction.options.getUser('user');
        
        if(!reqs.RegisterStaff.some(role => interaction.member.roles.cache.has(role)) && !interaction.member.permissions.has("ADMINISTRATOR")) return embed("Yeterli yetkiniz bulunmamakta.");
        if(!user) return embed("Bir kişi etiketlemelisiniz!");
        
        const data = await nameData.findOne({ guildId: interaction.member.id, uyeId: user.id }).clone();

        embed(`${user} üyesinin isim bilgileri aşağıda belirtilmiştir. \n\n ${data ? data.names.splice(0, 10).map((x, i) => { `\`${i + 1}\`` `\`${x.name}\`` `[${x.role}]` `\`[${x.staff}]\`` `\`${moment(x.date).format("LLL")}\``}).join("\n") : "İsim geçmişi temiz!"}`)
        
        
    }
}