const Utils = require("../modules/utils");

module.exports = async (bot, invite) => {
    if (Utils.variables.config.Other.IgnoredGuilds.includes(invite.guild.id)) return;
    Utils.updateInviteCache(bot);
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%