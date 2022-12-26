const Discord = require('discord.js')
const client = new Discord.Client()

var prefix = '.'
var commands = []

const fs = require('fs')
fs.readFile('commands.json', (data, err) => {
  if (err) {
    return err
  }
  commands = JSON.parse(data)
})

client.login(process.env.BOT_TOKEN)

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag)
})

client.on('message', message => {
  commands.forEach(cmd => {
    if (cmd == (prefix + message.content)) {
      message.channel.send(cmd.response)
    }
  })
})