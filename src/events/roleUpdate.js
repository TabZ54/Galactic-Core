const Utils = require('../modules/utils');
const { config, lang } = Utils.variables;

module.exports = async (bot, oldRole, newRole) => {
    if (require('../modules/handlers/CommandHandler.js').commands.length > 0) {
        if (config.Logs.Enabled.includes("RoleUpdated")) {
            if (config.Other.IgnoredGuilds.includes(oldRole.guild.id)) return;

            let logs = Utils.findChannel(config.Logs.Channels.RoleUpdated, newRole.guild);

            if (!logs) return;

            let embed = Utils.Embed({
                author: lang.LogSystem.RoleUpdated.Author,
                description: lang.LogSystem.RoleUpdated.Description[0].replace(/{role}/g, newRole)
            });

            if (oldRole.name !== newRole.name) {
                embed.embeds[0].description += lang.LogSystem.RoleUpdated.Description[1].replace(/{old}/g, oldRole.name).replace(/{new}/g, newRole.name);
            }

            if (oldRole.color !== newRole.color) {
                embed.embeds[0].description += lang.LogSystem.RoleUpdated.Description[2].replace(/{old}/g, oldRole.hexColor).replace(/{new}/g, newRole.hexColor);
            }

            if (oldRole.hoist !== newRole.hoist) {
                let oldH = oldRole.hoist ? lang.LogSystem.RoleUpdated.Hoisted : lang.LogSystem.RoleUpdated.NotHoisted;
                let newH = newRole.hoist ? lang.LogSystem.RoleUpdated.Hoisted : lang.LogSystem.RoleUpdated.NotHoisted;
                embed.embeds[0].description += lang.LogSystem.RoleUpdated.Description[3].replace(/{old}/g, oldH).replace(/{new}/g, newH);
            }

            if (oldRole.mentionable !== newRole.mentionable) {
                let oldM = oldRole.mentionable ? lang.LogSystem.RoleUpdated.Mentionable : lang.LogSystem.RoleUpdated.NotMentionable;
                let newM = newRole.mentionable ? lang.LogSystem.RoleUpdated.Mentionable : lang.LogSystem.RoleUpdated.NotMentionable;
                embed.embeds[0].description += lang.LogSystem.RoleUpdated.Description[4].replace(/{old}/g, oldM).replace(/{new}/g, newM);
            }

            if (oldRole.permissions.bitfield !== newRole.permissions.bitfield) {
                embed.embeds[0].description += lang.LogSystem.RoleUpdated.Description[5].replace(/{old}/g, oldRole.permissions.toArray().map(perm => '`' + perm.toLowerCase() + '`').join(", ")).replace(/{new}/g, newRole.permissions.toArray().map(perm => '`' + perm.toLowerCase() + '`').join(", "));
            }

            if (embed.embeds[0].description == `${newRole}: `) return;
            else embed.embeds[0].description += lang.LogSystem.RoleUpdated.Description[6].replace(/{time}/g, ~~(Date.now() / 1000));

            logs.send(embed);
        }
    }
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%