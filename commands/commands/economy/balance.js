const Discord = require('discord.js')
const economy = require('@features/economy')

module.exports = {
  commands: ['balance', 'bal'],
  maxArgs: 1,
  expectedArgs: "[Target user's @]",
  callback: async (message) => {
    const target = message.mentions.users.first() || message.author
    const targetId = target.id

    const guildId = message.guild.id
    const userId = target.id

    const coins = await economy.getCoins(guildId, userId)

    let embed = new Discord.MessageEmbed()
    .setColor('#01c5c4')
    .setDescription(`**${target}'s** balance is **${coins}** coins`)
    message.channel.send(embed)
  },
}