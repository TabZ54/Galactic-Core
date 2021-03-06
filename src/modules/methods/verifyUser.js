const Utils = require("../utils");
const sendWelcomeMessage = require("./sendWelcomeMessage");
const { config } = Utils.variables;

module.exports = async (bot, member) => {
    if (config.Verification.WelcomeMessage == "after-verified" && config.Join.Messages.Enabled) {
        let joins = await Utils.variables.db.get.getJoins(member);
        let inviter;

        if (joins && joins.length) {
            let mostRecent = Math.max(...joins.map(i => i.time));
            inviter = joins.find(i => i.time == mostRecent);
        }

        inviter = inviter && inviter.inviter ? await member.guild.members.fetch(inviter.inviter) : undefined;
        sendWelcomeMessage(bot, member, inviter);
    }

    if (config.Join.Roles) {
        config.Join.Roles.forEach(roleName => {
            let role = Utils.findRole(roleName, member.guild);
            if (role) member.roles.remove(role);
        });
    }

    config.Verification.VerifiedRoles.forEach(roleName => {
        let role = Utils.findRole(roleName, member.guild);
        if (role) member.roles.add(role);
    });

    bot.emit("userVerified", member);
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%