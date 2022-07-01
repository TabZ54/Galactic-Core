const Utils = require("../../utils");
const { variables: { config }, Embed } = Utils;

module.exports = async (messageOrInteraction, type, message, interaction, user, channel, guild, reply, member, validPrefixes, prefixFound, commandName, command) => {
    return new Promise(async (resolve, reject) => {
        if (!config.BugReports.Enabled) return resolve();
        if (![channel.name, channel.id].includes(config.BugReports.Channels.Pending)) return resolve();

        if (interaction && command.command !== "bnote") {
            reply(Embed({ preset: "error", description: "You cannot use slash commands in this channel" })).then(Utils.delete);
            return reject();
        }

        if (message && command ? command.command !== "bnote" : true) {
            if (["revivenode", "send-message", "both"].includes(config.Suggestions.Type.toLowerCase())) {
                if (message.attachments.size) {
                    const imageLogs = Utils.findChannel(config.Channels.ImageLogs, message.guild, 'GUILD_TEXT');
                    const attachment = message.attachments.first();

                    if (imageLogs) {
                        imageLogs.send(attachment)
                            .then(m => {
                                message.delete();

                                require("../createBugreport")(message.content, message.member, m.attachments.first());
                                return reject();
                            });
                    } else {
                        reply(Embed({ preset: "console" }));
                        return reject();
                    }
                } else {
                    message.delete();

                    require("../createBugreport")(message.content, message.member);
                    return reject();
                }
            }
        }

        return resolve();
    });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%