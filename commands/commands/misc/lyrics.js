

module.exports = {
  commands: 'lyrics',
  minArgs: '1',
  expectedArgs: "name of song",
  callback: async (message, arguments) => {
    const genius = require("genius-lyrics")
    const G = new genius.Client('E0ipm5tXNqCANDPSU0uJnxROobck7ZAknczyoaAJA2skhK7GTVQNjjH65ROKufgw')
    arguments.shift()

     
    G.tracks.search(message.content.split(' ').slice(1).join(' '), {limit: 1})
    .then(results => {
 const song = results[0]
 message.channel.send(`**${song.artist.name} - ${song.title}**\n<${song.url}>`) //song.lyrics
 })
     .catch(err => message.reply(err))
   }
    }


