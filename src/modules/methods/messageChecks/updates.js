const Utils = require("../../utils");
const { variables: { config, embeds } } = Utils;

module.exports = async (messageOrInteraction, type, message, interaction, user, channel, guild, reply, member, validPrefixes, prefixFound, commandName, command) => {
    return new Promise(async (resolve) => {
        // Updates
        if (message && [channel.name, channel.id].includes(config.Channels.DefaultUpdates) && config.Other.PostUpdatesByMessagingInChannel && !command) {
            message.delete();
            message.channel.send(Utils.setupMessage({
                configPath: embeds.Embeds.Update,
                variables: [
                    ...Utils.userVariables(member, "user"),
                    { searchFor: /{update}/g, replaceWith: message.content },
                    { searchFor: /{update-version}/g, replaceWith: "" }
                ]
            }));
        }

        return resolve();
    });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%