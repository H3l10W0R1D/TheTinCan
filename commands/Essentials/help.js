module.exports = async message => {
    try {
        let cmd = shiftWord(message.content);
        cmd = firstWord(cmd).toLowerCase();
        if (bot.commands.cmds[cmd]) {
            let fields = bot.commands.info[bot.commands.cmds[cmd]];
            for (let i = 0; i < fields.Examples.length; i++) {
                fields.Examples[i] = eval('`' + fields.Examples[i].replace(/`/g, '\\`') + '`');
            }
            return await response.send(response.create({
                message: message,
                title: 'Commands/' + bot.commands.files[bot.commands.cmds[cmd]],
                fields: {
                    Category: fields.Category,
                    About: fields.About,
                    Syntax: fields.Syntax,
                    Examples: fields.Examples
                },
                error: 'Failed to fetch command list',
                footer: {
                    icon_url: Client.displayAvatarURL,
                    text: `Prefix: ${prefix}`
                }
            }));
        }
        else {
            let data = {...bot.commands.list};
            let keys = Object.keys(data);
            for (let i = 0; i < keys.length; i++) {
                data[keys[i]] = data[keys[i]].join(', ');
            }
            return await response.send(response.create({
                message: message,
                title: 'Commands',
                fields: data,
                error: 'Failed to fetch command list',
                footer: {
                    icon_url: Client.displayAvatarURL,
                    text: `Prefix: ${prefix}`
                }
            }));
        }
    } catch (error) {
        debug(error);
    }
}
