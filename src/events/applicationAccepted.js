const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, application, executor, reason) => {

    if (!config.Applications.Logs.Enabled) return;

    let guild = bot.guilds.cache.get(application.guild);
    let applicant = await bot.users.fetch(application.creator);
    let logs = Utils.findChannel(config.Applications.Logs.Channel, guild);

    if (!logs) return;

    logs.send(Utils.Embed({
        author: lang.TicketModule.Logs.Applications.Accepted.Author,
        description: lang.TicketModule.Logs.Applications.Accepted.Description
            .replace(/{executor}/g, executor)
            .replace(/{applicant}/g, applicant ? applicant : application.creator)
            .replace(/{rank}/g, application.rank)
            .replace(/{channel}/g, Utils.findChannel(application.channel_id, guild, "GUILD_TEXT", false) || application.channel_name)
            .replace(/{reason}/g, reason ? reason : lang.TicketModule.Logs.Applications.NoReason)
            .replace(/{time}/g, ~~(Date.now() / 1000))
    }));
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%