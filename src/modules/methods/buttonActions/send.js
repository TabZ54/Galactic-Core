const Utils = require("../../utils");

module.exports = (type, value, channel, deleteAfter, interaction) => {
    return new Promise(async (resolve, reject) => {
        let { member, guild } = interaction;
        let del = msg => Utils.delete(msg, deleteAfter * 1000);

        if (type == "reply") {
            if (!value || typeof value !== "object") return reject("Invalid button action settings");

            await interaction.message.reply(Utils.setupMessage({
                configPath: value,
                variables: [
                    ...Utils.userVariables(member, "user"),
                    ...Utils.userVariables(Utils.variables.bot, "bot")
                ]
            })).then(del);

            return resolve(true);
        }

        else if (type == "message") {
            if (!value || typeof value !== "object") return reject("Invalid button action settings");

            let ch = channel ? Utils.findChannel(channel, guild, "GUILD_TEXT") : interaction.channel;

            if (!ch) return reject("Invalid button action settings");

            await ch.send(Utils.setupMessage({
                configPath: value,
                variables: [
                    ...Utils.userVariables(member, "user"),
                    ...Utils.userVariables(Utils.variables.bot, "bot")
                ]
            })).then(del);

            return resolve(true);
        }

        else reject("Invalid button action settings");
    });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%