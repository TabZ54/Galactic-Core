const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, emoji) => {
    if (require('../modules/handlers/CommandHandler.js').commands.length > 0) {
        if (!config.Logs.Enabled.includes("EmojiDeleted")) return;
        if (config.Other.IgnoredGuilds.includes(emoji.guild.id)) return;

        const logs = Utils.findChannel(config.Logs.Channels.EmojiDeleted, emoji.guild);
        if (!logs) return;
        logs.send(Utils.Embed({
            author: lang.LogSystem.EmojiDeleted.Author,
            description: lang.LogSystem.EmojiDeleted.Description
                .replace(/{name}/g, emoji.name)
                .replace(/{image}/g, emoji.url)
                .replace(/{id}/g, emoji.id)
                .replace(/{time}/g, ~~(Date.now() / 1000))
        }));
    }
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%