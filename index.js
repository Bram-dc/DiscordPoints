const Discord = require('discord.js');

const config = require('./config.json');

const token = config.token || 'Njg3MjM3NjQwMTIyNDAwNzY4.Xmi2Rg.shgku0zUuwJ5LB6nM60g_U70GuE';
const serverid = config.serverid || '687234738372608002';
const prefix = config.prefix || '!';
const sql = config.sql ? {
	host     : 'config.sql.host',
	user     : 'config.sql.user',
	password : 'config.sql.password',
	database : 'config.sql.database'
} : console.log('Sql database credentials are not defined.');

const client = new Discord.Client();

const Commandhandler = require('./lib/commandhandler.js');
const Pointclock = require('./lib/pointclock.js');

client.on('ready', () => {
	console.log('Connected to discord!');

	const guild = client.guilds.cache.get('666363318230843392');

	console.log(`Listening on server: ${guild.name}`);

	Commandhandler.init(guild, prefix);
	Pointclock.init(guild, sql);
	
	client.user.setActivity("Knasty Knights PvP", { type: "PLAYING"});
});

client.on('message', msg => Commandhandler.handle(msg));

client.login(token);
