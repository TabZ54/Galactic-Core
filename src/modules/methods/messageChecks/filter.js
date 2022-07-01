const Utils = require("../../utils");
const { variables: { config, lang }, Embed } = Utils;

module.exports = async (messageOrInteraction, type, message, interaction, user, channel, guild, reply, member) => {
    return new Promise(async (resolve, reject) => {
        const filterCommand = await Utils.variables.db.get.getCommands("filter");
        if (!filterCommand || !filterCommand.enabled) return resolve();
        if (Utils.hasPermission(member, config.Other.FilterBypassRole)) return resolve();

        const filter = await Utils.variables.db.get.getFilter();
        let content;

        if (interaction) 
            // eslint-disable-next-line no-underscore-dangle
            content = interaction.options._hoistedOptions.map(o => o.value).join(" ");

        if (message) 
            content = message.content.toLowerCase();

        if (filter.some(word => content.includes(word.toLowerCase()))) {
            if (message) message.delete();

            if (Utils.variables.noAnnounceFilter.has(member.id)) return reject();

            reply(Object.assign({}, {
                content: `<@${member.id}>`
            }, Embed({
                author: {
                    text: lang.FilterSystem.FilterSystem,
                    icon: "https://cdn.discordapp.com/attachments/689149005024067704/954111210394091570/emojisky.com-748566.png"
                },
                title: lang.FilterSystem.Filter.Title,
                color: config.EmbedColors.Error,
                timestamp: new Date()
            }))).then(m => Utils.delete(m, 7000));

            return reject();
        }

        return resolve();
    });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%