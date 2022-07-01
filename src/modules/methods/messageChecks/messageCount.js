const Utils = require("../../utils");
const { variables: { config } } = Utils;

module.exports = async (messageOrInteraction, type, message, interaction, user, channel, guild, reply, member, validPrefixes, prefixFound, commandName, command) => {
    return new Promise(async (resolve) => {
        if (type == "interaction") return resolve();
        if (config.Other.MessageCount.Blacklist.Channels.includes(channel.name) || config.Other.MessageCount.Blacklist.Channels.includes(channel.id)) return resolve();

        let roles = [...member.roles.cache.map(r => r.name), ...member.roles.cache.map(r => r.id)];
        if (roles.some(r => config.Other.MessageCount.Blacklist.Roles.includes(r))) return resolve();

        if (command) {
            if (config.Other.MessageCount.IncludeCommands) await Utils.variables.db.update.messages.increase(message.member);
        } else {
            await Utils.variables.db.update.messages.increase(message.member);
        }

        return resolve();
    });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%