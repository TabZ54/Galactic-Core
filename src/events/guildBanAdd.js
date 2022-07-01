const Utils = require("../modules/utils");

module.exports = async (bot, ban) => {
    if (Utils.variables.config.Other.IgnoredGuilds.includes(ban.guild.id)) return;

    await Utils.delay(2);
    ban.guild.fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
        .then(async logs => {
            if (!logs.entries.first()) return;

            let executor = logs.entries.first().executor;

            if (executor.id == bot.user.id) return;

            let punishment = {
                type: "ban",
                user: ban.user.id,
                tag: ban.user.tag,
                reason: logs.entries.first().reason,
                time: Date.now(),
                executor: executor.id
            };

            await Utils.variables.db.update.punishments.addPunishment(punishment);
            ban.user.guild = ban.guild;

            bot.emit('userPunished', punishment, ban.user, executor);
        });
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%