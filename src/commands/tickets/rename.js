const Utils = require("../../modules/utils.js");
const Embed = Utils.Embed;
const { lang } = Utils.variables;

module.exports = {
    name: "rename",
    run: async (bot, messageOrInteraction, args, { prefixUsed, member, channel, reply }) => {
        return new Promise(async resolve => {
            const ticket = await Utils.variables.db.get.getTickets(channel.id);
            const oldName = channel.name;
            const newName = args.join(" ");
    
            if (!ticket) {
                reply(Embed({ 
                    preset: "error", 
                    description: lang.TicketModule.Errors.TicketNotExist 
                }), { ephemeral: true });

                return resolve();
            }

            if (!newName.length) {
                reply(Embed({ 
                    preset: "invalidargs", 
                    usage: module.exports.usage 
                }, { prefixUsed }), { ephemeral: true });

                return resolve();
            }
            
            await channel.setName(newName);
    
            reply(Embed({
                title: lang.TicketModule.Commands.Rename.Title,
                description: lang.TicketModule.Commands.Rename.Description.replace(/{old-name}/g, oldName).replace(/{new-name}/g, newName.toLowerCase())
            }));
    
            bot.emit("ticketRenamed", ticket, member, oldName, newName.toLowerCase());
        });
    },
    description: "Rename a ticket channel",
    usage: "rename <new name>",
    aliases: [
        "renameticket"
    ],
    arguments: [
        {
            name: "new-name",
            description: "The new name of the ticket channel",
            required: true,
            type: "STRING"
        }
    ]
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%