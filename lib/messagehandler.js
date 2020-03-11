const Steamhandler = require('./steamhandler.js');

let guild;
let prefix;

exports.init = (guild_, prefix_) => {
	guild = guild_;
	prefix = prefix_;
}

exports.handle = msg => {
	console.log(msg.content);

	if (msg.author.bot)
		return;
	if (msg.guild != guild)
		return;
	if (!msg.content.startsWith(prefix))
		return;

	const msgarray = msg.content.split(' ');
	const command = msgarray[0].substring(prefix.length);
	let args = [];
	if (msgarray.length > 0)
		args = msgarray.splice(1, msgarray.length - 1);

	if (command === 'verifysteam' && args[0])
		return Steamhandler.verifySteam(msg.author.id, args[0], msg.channel.send);

	if (command === 'deletesteam' && args[0])
		return Steamhandler.deleteSteam(args[0], msg.channel.send);
}
