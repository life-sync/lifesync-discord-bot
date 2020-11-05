require('module-alias/register')

const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('@root/config.json')
const mongoose = require('mongoose')
const mongo = require('@util/mongo')
const welcome = require('@features/welcome')
const messageCount = require('@features/message-count')
const scalingChannels = require('@features/scaling-channels')
const loadCommands = require('@root/commands/load-commands')
const commandBase = require('@root/commands/command-base')
const { addAlias } = require('module-alias')
const command = require('@util/command')
const loadFeatures = require('@root/features/load-features')
const path = require('path')




















client.on('ready', async () => {
  console.log('The client is ready!')





  loadFeatures(client)
  loadCommands(client)
  commandBase.loadPrefixes(client)



   await mongo().then((mongoose) => {
    try {
      console.log('Connected to mongo!')
    } catch(err) {
      console.error(err)
    }
  })









  client.users.fetch('').then((user) => {
    user.send('Hello World!')
  })




command(client, 'server', (message)=>{
  client.guilds.cache.forEach((guild)=>{
    console.log(guild)
    message.channel.send(`**${guild.name}** has a total of **${guild.memberCount} members**`)
    })
  })

  command(client, ['cc', 'clearchannel'], (message)=>{
    if(message.member.hasPermission('ADMINISTRATOR')){
      message.channel.messages.fetch().then((results)=>{
        message.channel.bulkDelete(results)
      })
    }
    else{
      message.channel.send('You do not have the necessary perms')
    }

  })



  














  command(client, 'createtextchannel', (message) => {
    const name = message.content.replace('!createtextchannel ', '')

    message.guild.channels
      .create(name, {
        type: 'text',
      })
      .then((channel) => {
        const categoryId = '745928054412410973'
        channel.setParent(categoryId)
      })
  })

  command(client, 'createvoicechannel', (message) => {
    const name = message.content.replace('!createvoicechannel ', '')

    message.guild.channels
      .create(name, {
        type: 'voice',
      })
      .then((channel) => {
        const categoryId = '745928054412410973'
        channel.setParent(categoryId)
        channel.setUserLimit(10)
      })
  })

  command(client, 'serverinfo', (message) => {
    const { guild } = message

    const { name, region, memberCount, owner, afkTimeout } = guild
    const icon = guild.iconURL()

    const embed = new Discord.MessageEmbed()
      .setTitle(`Server info for "${name}"`)
      .setThumbnail(icon)
      .setColor('#a6f6f1')
      .addFields(
        {
          name: 'Region',
          value: region,
        },
        {
          name: 'Members',
          value: memberCount,
        },
        {
          name: 'Owner',
          value: owner.user.tag,
        },
        {
          name: 'AFK Timeout',
          value: afkTimeout / 60,
        }
      )

    message.channel.send(embed)
  })

  
  const { prefix } = config

  client.user.setPresence({
    activity: {
      name: `"${prefix}help" for help`,
    },
  })




  command(client, 'ban', message =>{
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('BAN_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.ban()
        message.channel.send(`${target} has been banned`)
      } else {
        message.channel.send(`${tag} Please specify someone to ban.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  
  command(client, 'kick', (message) => {
    const { member, mentions } = message

    const tag = `<@${member.id}>`

    if (
      member.hasPermission('ADMINISTRATOR') ||
      member.hasPermission('KICK_MEMBERS')
    ) {
      const target = mentions.users.first()
      if (target) {
        const targetMember = message.guild.members.cache.get(target.id)
        targetMember.kick()
        message.channel.send(`${target} has been kicked`)
      } else {
        message.channel.send(`${tag} Please specify someone to kick.`)
      }
    } else {
      message.channel.send(
        `${tag} You do not have permission to use this command.`
      )
    }
  })

  








})





client.on('message', message => {
  const prefix = '!'
  let args = message.content.substring(prefix.length).split(" ");

  switch (args[0]) {
    case "poll":
      const Embed = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Initiate Poll')
        .setDescription('Use .poll to initiate simple poll!');

      if (!args[1]) {
        message.channel.send(Embed)
        break;
      }

      let msgArgs = args.slice(1).join(" ");
      const pollEmbed = new Discord.MessageEmbed()
      .setColor('RANDOM')
      .setTitle(`📊 ${message.author.username} has initiated a poll!`)
      .setDescription("**" + msgArgs + "**")
      message.channel.send(pollEmbed).then(messageReaction => {
        messageReaction.react('👍🏻')
          .then(() => messageReaction.react('👎🏻'));
        message.delete({
          timeout: 200
        }).catch(console.error);
      })

      break;

  }
});



































client.login(config.token)