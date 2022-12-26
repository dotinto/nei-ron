const { REST, Routes, Discord } = require('discord.js');

const client = new Discord.Client()

var prefix = '.'

const { clientId } = require('./config.json');
const guildId = client.guilds.cache.id;
const token = process.env.BOT_TOKEN;

const commands = [];

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		
		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();

client.login(token)

client.on('ready', () => {
  console.log('Logged in as ' + client.user.tag)
})