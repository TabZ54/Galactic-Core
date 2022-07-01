const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, ticket, executor, oldName, newName) => {

    if (!config.Tickets.Logs.Enabled) return;

    let guild = bot.guilds.cache.get(ticket.guild);
    let logs = Utils.findChannel(config.Tickets.Logs.Channel, guild);

    if (!logs) return;

    logs.send(Utils.Embed({
        author: lang.TicketModule.Logs.Tickets.Renamed.Author,
        description: lang.TicketModule.Logs.Tickets.Renamed.Description
            .replace(/{executor}/g, executor)
            .replace(/{ticket}/g, ticket.channel_name)
            .replace(/{channel}/g, `<#${ticket.channel_id}>`)
            .replace(/{old}/g, oldName)
            .replace(/{new}/g, newName)
            .replace(/{time}/g, ~~(Date.now() / 1000))
    }));
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%