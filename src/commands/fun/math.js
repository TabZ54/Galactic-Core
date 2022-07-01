const Utils = require('../../modules/utils');
const Embed = Utils.Embed;
const lang = Utils.variables.lang;

const { Parser } = require('expr-eval');

module.exports = {
    name: "math",
    run: async (bot, messageOrInteraction, args, { prefixUsed, reply }) => {
        return new Promise(async resolve => {
            if (args.length < 1) {
                reply(Embed({
                    preset: "invalidargs",
                    usage: module.exports.usage
                }, { prefixUsed }), { ephemeral: true });

                return resolve();
            }

            try {
                const parser = new Parser();
                const expr = parser.evaluate(args.join(" "));

                reply(Embed({
                    title: lang.FunModule.Commands.Math.Embed.Title,
                    fields: [
                        {
                            name: lang.FunModule.Commands.Math.Embed.Fields[0],
                            value: args.join(" ")
                        },
                        {
                            name: lang.FunModule.Commands.Math.Embed.Fields[1],
                            value: expr
                        }
                    ]
                }));

                return resolve(true);
            } catch (err) {
                reply(Embed({
                    preset: "error",
                    description: lang.FunModule.Commands.Math.Error
                }));

                return resolve();
            }
        });
    },
    description: "Evaluate a math equation",
    usage: "math <equation>",
    aliases: [],
    arguments: [
        {
            name: "equation",
            description: "The equation to evaluate",
            required: true,
            type: "STRING"
        }
    ]
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%