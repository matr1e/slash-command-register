const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/settings.json');
const safeCode = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const guildReqs = require("../Database/guildReqs");

module.exports = {
    name: "isim",
    description: "Belirttiğini kişinin ismini yeniler.",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Birisini etiketleyin.' },
        { type: 4, name: 'name', description: 'İsim belirtiniz.' },
        { type: 5, name: 'age', description: 'Yaş belirtiniz.' }
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
        const name = interaction.options.getUser('name');
        const age = interaction.options.getUser('age');


        if(!reqs) return embed(`Database ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.ManRole) return embed(`Roller ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.WomanRole) return embed(`Roller ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.RegisterStaff) return embed(`Roller ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.RegisterLog) returnembed(`Kanallar ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);

        if(!reqs.RegisterStaff.some(role => interaction.member.roles.cache.has(role)) && !interaction.member.permissions.has("ADMINISTRATOR")) return embed("Yeterli yetkiniz bulunmamakta.");
        if(!user) return embed(`Bir kişi etiketlemeli/id belirtmelisiniz. Örn: /kayıt Matrié/ID Matrié 19`);
        if(!name) return embed(`Lütfen bir kişi etiketleyiniz!`);
        if(!age) return embed(`Lütfen bir yaş belirtiniz!`);

        let lastName = `${Settings.Main.Tag} ${name.charAt(0).replace("i", "İ").toUpperCase() + name.slice(1).toLowerCase()} | ${age}`;

        user.setNickname(lastName).catch(err => embed(`İsim Çok Uzun`));
        await nameData.findOneAndUpdate({ guildId: interaction.guild.id, uyeId: user.id }, { $push: { names: { name: user.user.displayName, staff: interaction.member.id, role: "İsim Değiştirme", date: Date.now() } } }, { upsert: true });

        
    }
}