const Utils = require("../../modules/utils.js");
const { config, embeds } = Utils.variables;

module.exports = {
    name: 'links',
    run: async (bot, messageOrInteraction, args, { reply }) => {
        return new Promise(resolve => {
            let fields = Object.keys(config.Links).map(name => {
                return { name: name, value: config.Links[name] };
            });

            reply(Utils.setupMessage({
                configPath: embeds.Embeds.Links,
                fields: fields
            }));
            return resolve(true);
        });
    },
    description: "View links related to the Discord server",
    usage: 'links',
    aliases: [],
    arguments: []
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%