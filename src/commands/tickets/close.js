const closeTicket = require("../../modules/methods/closeTicket");

module.exports = {
    name: "close",
    run: async (bot, messageOrInteraction, args, { member, channel, reply }) => {
        return new Promise(async resolve => {
            const response = await closeTicket(bot, args, member, channel, undefined, reply);

            if (response) return resolve(true);
            else return resolve();
        });
    },
    description: "Close the ticket you are typing in",
    usage: "close [reason]",
    aliases: [
        "ticketclose",
        "closeticket"
    ],
    arguments: [
        {
            name: "reason",
            description: "The reason for closing the ticket",
            required: false,
            type: "STRING"
        }
    ]
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%