const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton, Modal, TextInputComponent, MessageSelectMenu } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const config = require("./config.json")

const prefix = '$';

client.on('ready', () => {
console.log(`${client.user.tag}.`)
});

client.on("messageCreate", async message => {
if(message.content.startsWith(prefix + "setup")){
if(config.owner.includes(message.author.id)){
const row = new MessageActionRow()
.addComponents(
new MessageButton()
    .setLabel("تشفير")
    .setStyle("PRIMARY")
    .setCustomId("1"),
    new MessageButton()
    .setLabel("❗")
    .setStyle("SECONDARY")
    .setCustomId("2")
)
const embed = new MessageEmbed()
.setDescription("We can add ban for him..")
.setColor("#f1040")
message.reply({ embeds: [embed], components: [row] })
} else {
message.reply("امرني؟")
}
}
});


client.on("interactionCreate", async message => {
if(!message.isButton()) return;
    if(message.customId == "1"){
const modal = new Modal()
        .setCustomId("buy")
.setTitle("تشفير")
const tshfer = new TextInputComponent()
.setCustomId("tshfer")
.setLabel("الكود")
.setPlaceholder("قم بوضع الكود الذي تريده هنا")
.setMinLength("1")
.setMaxLength("4000")
.setStyle("PARAGRAPH");
        const row = [
new MessageActionRow().addComponents(tshfer)
]
        modal.addComponents(...row)
        message.showModal(modal);
}
});



var JavaScriptObfuscator = require('javascript-obfuscator');
const sourcebin = require('sourcebin_js');

client.on("interactionCreate", async modal => {
if(!modal.isModalSubmit()) return;
    if(modal.customId == "buy") {
const tshfer = modal.fields.getTextInputValue("tshfer")

var obfuscationResult = JavaScriptObfuscator.obfuscate(
    `
        ${tshfer}
    `,
    {
        compact: false,
        controlFlowFlattening: true,
        controlFlowFlatteningThreshold: 1,
        numbersToExpressions: true,
        simplify: true,
        stringArrayShuffle: true,
        splitStrings: true,
        stringArrayThreshold: 1
    }
);

let bin = await sourcebin.create([
    {
        name: modal.user.username,
        content: obfuscationResult.getObfuscatedCode(),
        languageId: 'Javascript'
    }
])

 modal.reply({content: `تفضل الكود بعد تشفير ${bin.url}`, ephemeral: true })
}
});



client.on("messageCreate", async message => {
  if (message.content === prefix + "help") {
    const row = new MessageActionRow()
      .addComponents(
        new MessageSelectMenu()
          .setCustomId("select")
          .addOptions([
            {
              label: "test",
              value: "1"
            }
          ])
      );

    const button = new MessageButton()
      .setLabel("Support Server")
      .setStyle("LINK")
      .setURL("https://discord.gg/dealer"); 
    const rowWithButton = new MessageActionRow().addComponents(button);

    message.reply({ components: [row, rowWithButton] });
  }
});

client.on("interactionCreate", async interaction => {
if(!interaction.isSelectMenu()) return;
    if(interaction.values == "1"){
await interaction.update("hii")
}
})


client.login("MTI0NDY4ODE0NzU0ODM0MDIyNA.Gu7UHU.MkZY7gPyibv9mKkiK6PWnJHhFBrkKSxhHtV3Z4");
