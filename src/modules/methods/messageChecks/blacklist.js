const Utils = require("../../utils");
const { variables: { config, lang }, Embed } = Utils;

module.exports = async (messageOrInteraction, type, message, interaction, user, channel, guild, reply, member, validPrefixes, prefixFound, commandName, command) => {
    return new Promise(async (resolve, reject) => {
        if (!command) return resolve();
        if (!Utils.hasPermission(member, config.Moderation.CommandBlacklistBypass)) {
            let blacklists = await Utils.variables.db.get.getBlacklists(member) || [];
            if (blacklists.includes(command?.command) || blacklists.includes("all")) {
                reply(Embed({
                    color: config.EmbedColors.Error,
                    title: blacklists.includes("all") ? lang.ModerationModule.Commands.Blacklist.Embeds.Blacklist.Title[0] : lang.ModerationModule.Commands.Blacklist.Embeds.Blacklist.Title[1],
                }));
                return reject();
            }
        }

        return resolve();
    });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%