const lock = require("../../modules/methods/lockChannel");

module.exports = {
    name: "lock",
    run: async (bot, messageOrInteraction, args, { type, member, channel, reply }) => {
        return new Promise(async resolve => {
            resolve(await lock(channel, member, true, reply, type));
        });
    },
    description: "Lock the channel so users cannot send messages",
    usage: "lock",
    aliases: [],
    arguments: []
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%