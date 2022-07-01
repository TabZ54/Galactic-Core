const Utils = require("../../utils");
const { variables: { config, lang }, Embed } = Utils;

module.exports = async (messageOrInteraction, type, message, interaction, user, channel, guild, reply, member, validPrefixes, prefixFound, commandName, command) => {
    return new Promise(async (resolve, reject) => {
        if ([channel.name, channel.id].includes(config.Verification.Channel)) {
            if (config.Verification.Enabled && config.Verification.Type == "code") {
                if (!command || (command && commandName !== "verify")) {
                    if (type == "interaction") reply(Embed({ preset: "error", description: lang.GeneralModule.Commands.Verify.Errors.WrongChannel }), { ephemeral: true });
                    else message.delete();
                    return reject();
                }
            }
        }
        return resolve();
    });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%