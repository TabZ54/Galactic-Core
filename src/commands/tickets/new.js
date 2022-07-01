const Utils = require("../../modules/utils");
const config = Utils.variables.config;
const createTicket = require("../../modules/methods/createTicket");

module.exports = {
    name: "new",
    run: async (bot, messageOrInteraction, args, { type, member, channel, reply }) => {
        return new Promise(async resolve => {
            let autoDelete = parseInt(config.Tickets.TicketCreatedMessage.AutoDelete);
            if (autoDelete && type == "message") Utils.delete(messageOrInteraction, autoDelete * 1000);
            const response = await createTicket(bot, args, member, channel, !!autoDelete, autoDelete ? autoDelete * 1000 : undefined, undefined, undefined, undefined, reply, type == "interaction");

            if (response) return resolve(true);
            else return resolve();
        });
    },
    description: "Create a ticket",
    usage: config.Tickets.RequireReason ? "new <reason>" : "new [reason]",
    aliases: [
        "ticket"
    ],
    arguments: [
        {
            name: "reason",
            description: "The reason for the ticket",
            required: config.Tickets.RequireReason,
            type: "STRING"
        }
    ]
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%