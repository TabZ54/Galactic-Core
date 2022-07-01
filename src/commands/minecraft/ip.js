const Utils = require("../../modules/utils.js");
const { embeds } = Utils.variables;

module.exports = {
    name: "ip",
    run: async (bot, messageOrInteraction, args, { reply }) => {
        return new Promise(async resolve => {
            reply(Utils.setupMessage({
                configPath: embeds.Embeds.IP
            }));

            return resolve(true);
        });
    },
    description: "View the Minecraft server's IP",
    usage: "ip",
    aliases: [
        "serverip"
    ],
    arguments: []
};

// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%