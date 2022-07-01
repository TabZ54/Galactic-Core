const Utils = require("../../modules/utils");
const { lang } = Utils.variables;

module.exports = {
    name: "tickets",
    run: async (bot, messageOrInteraction, args, { member, guild, reply }) => {
        return new Promise(async resolve => {
            const targetUser = Utils.ResolveUser(messageOrInteraction, 0, true) || member;
            let tickets = await Utils.variables.db.get.getTickets();
    
            tickets = tickets.filter(t => t.creator == targetUser.id).filter(t => guild.channels.cache.get(t.channel_id));
    
            reply(Utils.Embed({
                author: {
                    text: targetUser.displayName,
                    icon: targetUser.user.displayAvatarURL()
                },
                title: lang.TicketModule.Commands.Tickets.Title,
                description: tickets.length ? lang.TicketModule.Commands.Tickets.Description[0].replace(/{user}/g, targetUser).replace(/{tickets}/g, tickets.map(t => `<#${t.channel_id}>`).join("\n")) : lang.TicketModule.Commands.Tickets.Description[1].replace(/{user}/g, targetUser),
                timestamp: new Date()
            }));

            return resolve(true);
        });
    },
    usage: "tickets <@user>",
    description: "Get a list of tickets a user has opened",
    aliases: [],
    arguments: [
        {
            name: "user",
            description: "The user to get the tickets of",
            required: false,
            type: "USER"
        }
    ]
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%