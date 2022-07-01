const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, ticket, executor, reason) => {

    if (!config.Tickets.Logs.Enabled) return;

    let guild = bot.guilds.cache.get(ticket.guild);
    let creator = await bot.users.fetch(ticket.creator);
    let logs = Utils.findChannel(config.Tickets.Logs.Channel, guild);
    let addedUsers = await Utils.variables.db.get.getAddedUsers(ticket.channel_id);

    if (!logs) return;

    logs.send(Utils.Embed({
        author: lang.TicketModule.Logs.Tickets.Closed.Author,
        description: lang.TicketModule.Logs.Tickets.Closed.Description
            .replace(/{executor}/g, executor)
            .replace(/{ticket}/g, ticket.channel_name)
            .replace(/{reason}/g, reason ? reason : lang.TicketModule.Logs.Tickets.NoReason)
            .replace(/{creator}/g, creator ? creator : ticket.creator)
            .replace(/{added-users}/g, addedUsers.map(u => `<@${u.user}>`).join(', ') || lang.Global.None)
            .replace(/{time}/g, ~~(Date.now() / 1000))
    }));
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%