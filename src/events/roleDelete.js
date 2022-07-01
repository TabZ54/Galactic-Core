const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, role) => {
    if (require('../modules/handlers/CommandHandler.js').commands.length > 0) {
        if (!config.Logs.Enabled.includes("RoleDeleted")) return;
        if (config.Other.IgnoredGuilds.includes(role.guild.id)) return;

        const logs = Utils.findChannel(config.Logs.Channels.RoleDeleted, role.guild);
        if (!logs) return;
        if (logs) logs.send(Utils.Embed({
            author: lang.LogSystem.RoleDeleted.Author,
            description: lang.LogSystem.RoleCreated.Description
                .replace(/{role}/g, role.name)
                .replace(/{time}/g, ~~(Date.now() / 1000))
        }));
    }
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%