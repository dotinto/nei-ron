const Discord = require('discord.js')
const client = new Discord.Client()

client.login(process.env.BOT_TOKEN)

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag)
})

client.on('message', message => {
  if (message.content == ".ping") {
    message.reply('Pong!')
  }
})