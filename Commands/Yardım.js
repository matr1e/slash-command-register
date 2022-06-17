const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/settings.json');
const safeCode = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");
const fs = require('fs');


module.exports = {
    name: "yardım",
    description: "Komut bilgilerini gösterir.",
    options: [
    ],
    run: async (client, interaction) => {

      fs.readdirSync('./Commands').filter(file => file.endsWith('.js'));
        
        function embed(msg) {
            const emb = new MessageEmbed()
            .setAuthor({ name: interaction.member.displayName, iconURL: interaction.user.avatarURL({ dynamic: true }) })
            .setDescription(`**${msg}**`)
            .setFooter({ text: "Matrié" })
            
            interaction.reply({ embeds: [emb] });
        }
        

    const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setCustomId("MEMBER")
        .setLabel("Kullanıcı")
        .setStyle("PRIMARY"),

        new MessageButton()
        .setCustomId("STAFF")
        .setLabel("Yetkili")
        .setStyle("SUCCESS")
      )
      const emb = new MessageEmbed()
      .setAuthor({ name: "Komut listesi" })
      .setFooter({ text: "Matrié" });
      
      for(const file of cmdFiles){
        	const command = require(`./Commands/${file}`);
          emb.setDescription(`${command.name} - ${command.description}`);
      }

      let matrie = await message.channel.send({ embeds: [emb] });
      
      
        
    }
}