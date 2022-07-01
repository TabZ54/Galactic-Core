const Utils = require("../modules/utils.js");
const { config, lang } = Utils.variables;

module.exports = async (bot, punishment, user, executor) => {
    if (!config.Moderation.Logs.Enabled) return;

    let logs = Utils.findChannel(config.Moderation.Logs.Channel, user.guild);
    let type = punishment.type;
    if (!logs) return;

    if (punishment.type.startsWith("temp")) {
        let id = await Utils.variables.db.get.getPunishmentID();
        logs.send(Utils.Embed({
            author: lang.ModerationModule.Logs.UserTempPunished.Author,
            description: lang.ModerationModule.Logs.UserTempPunished.Description
                .replace(/{executor}/g, executor)
                .replace(/{punishment-type}/g, punishment.type.replace("temp", "") == "ban" ? "banned" : "muted")
                .replace(/{user}/g, user)
                .replace(/{reason}/g, punishment.reason)
                .replace(/{id}/g, id)
                .replace(/{length}/g, Utils.DDHHMMSSfromMS(punishment.length))
                .replace(/{time}/g, ~~(punishment.time / 1000))
        }));
    } else if (punishment.type == "warn") {
        logs.send(Utils.Embed({
            author: lang.ModerationModule.Logs.UserWarned.Author,
            description: lang.ModerationModule.Logs.UserWarned.Description
            .replace(/{executor}/g, executor)
            .replace(/{user}/g, user)
            .replace(/{reason}/g, punishment.reason)
            .replace(/{id}/g, punishment.id)
            .replace(/{count}/g, punishment.warnCount)
            .replace(/{time}/g, ~~(punishment.time / 1000))
        }));
    } else {
        let id = await Utils.variables.db.get.getPunishmentID();
        logs.send(Utils.Embed({
            author: lang.ModerationModule.Logs.UserPunished.Author,
            description: lang.ModerationModule.Logs.UserPunished.Description
            .replace(/{executor}/g, executor)
            .replace(/{punishment-type}/g, type.endsWith("e") ? type + "d" : type.endsWith("n") ? type + "ned" : type + "ed")
            .replace(/{user}/g, user)
            .replace(/{reason}/g, punishment.reason)
            .replace(/{id}/g, id)
            .replace(/{time}/g, ~~(punishment.time / 1000))
        }));
    }
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%