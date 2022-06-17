const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/Settings.json');
const safeCode = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");

module.exports = {
    name: "debeme",
    description: "qwe",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Mention user.' },
        { type: 3, name: 'channel', description: 'Mention channel.' }
    ],
    run: async (client, interaction) => {

        
        function embed(msg) {
            const emb = new MessageEmbed()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${msg}**`)
            .setFooter({ text: "Matrié" })
            
            interaction.reply({ embeds: [emb] });
        }
        
        const channel = interaction.options.getChannel('channel');
        const user = interaction.options.getUser('user');
        /*
            interaction.options.get<optionType>('<optionName>');
        */
        
    }
}