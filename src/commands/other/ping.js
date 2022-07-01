const Utils = require("../../modules/utils.js");
const embeds = Utils.variables.embeds;

module.exports = {
    name: "ping",
    run: async (bot, messageOrInteraction, args, { reply }) => {
        return new Promise(async resolve => {
            const apiPing = Math.round(1000 * bot.ws.ping) / 1000;

            reply(Utils.setupMessage({
                configPath: embeds.Embeds.Ping[0],
                variables: [
                    { searchFor: /{api-ping}/g, replaceWith: apiPing }
                ]
            })).then(msg => {
                msg.edit(Utils.setupMessage({
                    configPath: embeds.Embeds.Ping[1],
                    variables: [
                        { searchFor: /{api-ping}/g, replaceWith: apiPing },
                        { searchFor: /{bot-ping}/g, replaceWith: msg.createdTimestamp - messageOrInteraction.createdTimestamp }
                    ]
                }));

                return resolve(true);
            });
        });
    },
    description: "Check the bot's latency",
    usage: "ping",
    aliases: [
        "latency"
    ],
    arguments: []
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%