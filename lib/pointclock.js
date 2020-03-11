const Stickerhandler = require('./stickers/stickerhandler.js');
const Musichandler = require('./muziek/musichandler.js');
const Botlane = require('./random/botlane.js');
const Censorship = require('./random/censorship.js');
const {isMusicCommand, executeMusicCommand} = require('./muziek/musichandler.js');

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
	if (!msg.guild)
		return;

	Censorship.run(msg);

	const stickers = msg.content.match(/<:[^:]*:[0-9]+>/g);
	if (stickers)
		return Stickerhandler.handleSticker(msg, stickers);

	if (!msg.content.startsWith(prefix))
		return;

	const msgarray = msg.content.split(' ');
	const command = msgarray[0].substring(1);
	let args = [];
	if (msgarray.length > 0)
		args = msgarray.splice(1, msgarray.length - 1);

	if (msg.channel.id != spamChannel.id) {
		spamChannel.send('⛔ Je zit niet in de goede text channel!!!');
		msg.delete();
	}

	if (command === 'botlane')
		return Botlane.run(msg);

	if (command === 'addsticker')
		return Stickerhandler.handleCommand(msg, args);

	if (command === 'play' ||
		command === 'skip' ||
		command === 'stop' ||
		command === 'np' ||
		command === 'queue' ||
		command === 'pause' ||
		command === 'resume' ||
		command === 'shuffle' ||
		command === 'first' ||
		command === 'bangers')
		return Musichandler.handle(msg, command, args);
}
