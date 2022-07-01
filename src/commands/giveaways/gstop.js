const endGiveaway = require('../../modules/methods/endGiveaway');
const Utils = require('../../modules/utils');
const { lang } = Utils.variables;
const Embed = Utils.Embed;

module.exports = {
    name: "gstop",
    run: async (bot, messageOrInteraction, args, { type, channel, reply }) => {
        return new Promise(async resolve => {
            const giveaway = args.length > 0 ? await Utils.variables.db.get.getGiveawayFromID(args[0]) || await Utils.variables.db.get.getGiveawayFromName(args.join(" ")) : await Utils.variables.db.get.getLatestGiveaway();

            if (args.length > 0 && !giveaway) {
                reply(Embed({
                    preset: "error",
                    description: lang.GiveawaySystem.Errors.UnknownGiveaway
                }), { ephemeral: true });
                return resolve();
            }

            if (!giveaway) {
                reply(Embed({
                    preset: "error",
                    description: lang.GiveawaySystem.Errors.NoGiveaways
                }), { ephemeral: true });
                return resolve(true);
            }

            const link = `https://discordapp.com/channels/${giveaway.guild}/${giveaway.channel}/${giveaway.message}`;

            endGiveaway(bot, giveaway);

            if (type == "interaction" || giveaway.channel !== channel.id) reply(Embed({
                title: lang.GiveawaySystem.Commands.Gstop.Title,
                description: lang.GiveawaySystem.Commands.Gstop.Description.replace(/{name}/g, giveaway.prize).replace(/{link}/g, link),
                timestamp: new Date()
            }), { ephemeral: giveaway.channel == channel.id });

            return resolve(true);
        });
    },
    description: "Force a giveaway to end",
    usage: "gstop [giveaway name]",
    aliases: [
        "gend",
        "giveawayend",
        "giveawaystop",
        "gforcestop",
        "giveawayforcestop"
    ],
    arguments: [
        {
            name: "giveaway",
            description: "The giveaway to end (name or message ID)",
            required: false,
            type: "STRING"
        }
    ]
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%