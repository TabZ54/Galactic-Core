const createApplication = require("../../modules/methods/createApplication.js");

module.exports = {
    name: "apply",
    run: async (bot, messageOrInteraction, args, { member, channel, reply }) => {
        return new Promise(async resolve => {
            const response = await createApplication(bot, member, channel, false, 10000, reply);

            if (!response) return resolve();
            else return resolve(true);
        });
    },
    description: "Create an application",
    usage: "apply",
    aliases: [
        "application"
    ],
    arguments: []
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%