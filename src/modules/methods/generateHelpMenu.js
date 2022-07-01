const Utils = require('../utils');
const { config, commands } = Utils.variables;
const commandHandler = require('../handlers/CommandHandler').commands;

module.exports = {
    setup: async function () {
        let modules = await Utils.variables.db.get.getModules();
        let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

        modules = modules.filter(m => m.enabled).map(m => m.name);

        modules.forEach(type => {
            module.exports[type] = commandHandler
                .filter(c => c.type == type && commands.Enabled[c.command] !== false && c.enabled)
                .sort((a, b) => alphabet.indexOf(a.command.charAt(0).toLowerCase()) - alphabet.indexOf(b.command.charAt(0).toLowerCase()))
                .map(command => config.Help.Type == 'categorized' ? `**{prefix}${command.command}** - ${command.description}` : `\`${command.command}\``).join(config.Help.Type == 'categorized' ? "\n" : ", ");
        });
    }
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%