const { MessageActionRow, MessageEmbed, MessageButton  } = require('discord.js');
const Settings = require('../Settings/settings.json');
const requirements = require("../Database/registerRequirements");
const nameData = require("../Database/nameData");
const ytData = require("../Database/YetkiliData");
const guildReqs = require("../Database/guildReqs");

module.exports = {
    name: "kayıt",
    description: "Belirttiğiniz üyeyi kayıt edersiniz.",
    options: [ // Types: 1, 2, 3, 4, 5, 6, 7
        { type: 1, name: 'user', description: 'Birisini etiketleyin.' },
        { type: 4, name: 'name', description: 'İsim belirtiniz.' },
        { type: 5, name: 'age', description: 'Yaş belirtiniz.' },
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
        const name = interaction.options.getString('name');
        const age = interaction.options.getInteger('age');
        


        if(!reqs) return embed(`Database ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.ManRole) return embed(`Roller ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.WomanRole) return embed(`Roller ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.RegisterStaff) return embed(`Roller ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);
        if(!reqs.RegisterLog) return embed(`Kanallar ayarlanmamış. Lütfen bot sahibi ile iletişime geçin! ${Settings.Footer.map(x => `<@${x}>`)}`);

        if(!reqs.RegisterStaff.some(role => interaction.member.roles.cache.has(role)) && !interaction.member.permissions.has("ADMINISTRATOR")) return embed("Yeterli yetkiniz bulunmamakta.");
        if(!user) return embed(`Bir kişi etiketlemeli/id belirtmelisiniz. Örn: /kayıt Matrié/ID Matrié 19`);
        if(!name) return embed(`Lütfen bir kişi etiketleyiniz!`);
        if(!age) return embed(`Lütfen bir yaş belirtiniz!`);

        let lastName = `${Settings.Main.Tag} ${name.charAt(0).replace("i", "İ").toUpperCase() + name.slice(1).toLowerCase()} | ${age}`;
        const member = client.guilds.cache.get(Settings.Main.GuildID).members.cache.get(user.id);
        
        member.setNickname(lastName).catch(err => embed(`İsim Çok Uzun`));

        let row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("MAN")
            .setLabel("Erkek")
            .setStyle("PRIMARY"),

            new MessageButton()
            .setCustomId("WOMAN")
            .setLabel("Kadın")
            .setStyle("SECONDARY"),

            new MessageButton()
            .setCustomId("CANCEL")
            .setLabel("İptal")
            .setStyle("DANGER")
        )

        let m = new MessageEmbed()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.avatarURL({ dynamic: true })})
        .setDescription(`${user} adlı kişinin ismi başarıyla "${lastName}" olarak ayarlandı! \n Lütfen 30 saniye içerisinde aşağıdaki butonlardan kaydı tamamlayınız \n Üyeyi kaydetmeden önce önceki isimlerine bakmanız önerilir. \n .isimler <@Matrié/ID> şeklinde üyenin isimlerini sorgulayabilirsiniz.`)
        .setFooter({ text: "Matrié" });

        let mr = new MessageEmbed()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.avatarURL({ dynamic: true })})
        .setDescription(`${user} başarıyla ${reqs ? ( reqs.ManRole ? reqs.ManRole.map(x => `<@&${x}>`) : "Rol Yok?") : "Data Ayarlanmamış."} rolleriyle kaydedildi!`)
        .setFooter({ text: "Matrié" });

        let mrs = new MessageEmbed()
        .setAuthor({ name: interaction.member.displayName, iconURL: interaction.member.avatarURL({ dynamic: true })})
        .setDescription(`${user} başarıyla ${reqs ? ( reqs.WomanRole ? reqs.WomanRole.map(x => `<@&${x}>`) : "Rol Yok?") : "Data Ayarlanmamış."} rolleriyle kaydedildi!`)
        .setFooter({ text: "Matrié" });

        let log = new MessageEmbed()
        .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({ dynamic: true })})
        .setFooter({ text: "Matrié" });

        let Matrie = await interaction.channel.send({ embeds: [m], components: [row] });
        let filter = but => but.member.id === interaction.member.id;
        let collector = Matrie.createMessageComponentCollector({ filter: filter, time: 30000 });

        collector.on("collect", async button => {
            if(button.customId === "MAN"){
                for(i = 0; i < reqs.ManRole.length; i++){
                    if(i === "undefined") return;
                    await member.roles.add(reqs.ManRole[i]);
                }
                for(i = 0; i < reqs.Unregister.length; i++){
                    if(i === "undefined") return;
                    await member.roles.remove(reqs.Unregister[i]);
                }
                nameData.findOneAndUpdate({ guildId: interaction.guild.id, uyeId: user.id }, { $push: { names: { name: member.displayName, staff: interaction.member.id, role: reqs.ManRole.map(x => `<@${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
                ytData.findOneAndUpdate({ guildId: interaction.guild.id, Yetkili: interaction.member.id }, { $inc: { Reg: 1, Puan: 25, FMReg: 1 } }, { upsert: true });
                Matrie.edit({ embeds: [mr], components: [] });
                log.setDescription(`${user} başarıyla ${reqs ? ( reqs.ManRole ? reqs.ManRole.map(x => `<@&${x}>`) : "Rol Yok?") : "Data Ayarlanmamış."} rolleriyle kaydedildi!`)
            }

            if(button.customId === "WOMAN"){
                for(i = 0; i < reqs.WomanRole.length; i++){
                    if(i === "undefined") return;
                    await member.roles.add(reqs.WomanRole[i]);
                }
                for(i = 0; i < reqs.Unregister.length; i++){
                    if(i === "undefined") return;
                    await member.roles.remove(reqs.Unregister[i]);
                }
                await nameData.findOneAndUpdate({ guildId: interaction.guild.id, uyeId: user.id }, { $push: { names: { name: member.displayName, staff: interaction.member.id, role: reqs.WomanRole.map(x => `<@${x}>`).join(" , "), date: Date.now() } } }, { upsert: true });
                await ytData.findOneAndUpdate({ guildId: interaction.guild.id, Yetkili: interaction.member.id }, { $inc: { Reg: 1, Puan: 25, FMReg: 1 } }, { upsert: true });
                Matrie.edit({ embeds: [mr], components: [] });
                log.setDescription(`${user} başarıyla ${reqs ? ( reqs.WomanRole ? reqs.WomanRole.map(x => `<@&${x}>`) : "Rol Yok?") : "Data Ayarlanmamış."} rolleriyle kaydedildi!`)
            }

            if(button.customId === "CANCEL"){
                await member.roles.add(reqs.Unregister);
                log.setDescription(`Kayıt İşlemi İptal Edildi.`);
                Matrie.edit({ embeds: [log] });
            }
        })

        collector.on("end", async () => {
            Matrie.delete();
            client.channels.cache.get(reqs.RegisterLog).send({ embeds: [log] }).catch(err => console.log(err));
        })

    }
}