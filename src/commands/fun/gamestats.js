const Utils = require("../../modules/utils.js");
const Embed = Utils.Embed;
const lang = Utils.variables.lang;

module.exports = {
    name: "gamestats",
    run: async (bot, messageOrInteraction, args, { member, reply }) => {
        return new Promise(async resolve => {
            const targetUser = Utils.ResolveUser(messageOrInteraction) || member;
            let gameData = await Utils.variables.db.get.getGameData(targetUser) || {};
    
            if (!gameData.connect4) gameData.connect4 = {
                wins: 0,
                losses: 0,
                ties: 0
            };
    
            if (!gameData.tictactoe) gameData.tictactoe = {
                wins: 0,
                losses: 0,
                ties: 0
            };
    
            reply(Embed({
                author: {
                    icon: targetUser.user.displayAvatarURL({ dynamic: true }),
                    text: targetUser.user.username
                },
                title: lang.FunModule.Commands.Gamestats.Title,
                fields: [
                    {
                        name: lang.FunModule.Commands.Gamestats.Fields[0].Name,
                        value: lang.FunModule.Commands.Gamestats.Fields[0].Value.replace(/{wins}/g, gameData.connect4.wins).replace(/{losses}/g, gameData.connect4.losses).replace(/{ties}/g, gameData.connect4.ties).replace(/{total}/g, Object.values(gameData.connect4).reduce((a, b) => a + b)),
                        inline: true
                    }, {
                        name: lang.FunModule.Commands.Gamestats.Fields[1].Name,
                        value: lang.FunModule.Commands.Gamestats.Fields[1].Value.replace(/{wins}/g, gameData.tictactoe.wins).replace(/{losses}/g, gameData.tictactoe.losses).replace(/{ties}/g, gameData.tictactoe.ties).replace(/{total}/g, Object.values(gameData.tictactoe).reduce((a, b) => a + b)),
                        inline: true
                    }
                ],
                timestamp: new Date()
            }));

            return resolve(true);
        });
    },
    description: "View a user's game stats",
    usage: "gamestats [@user]",
    aliases: [
        "connect4stats", 
        "tictactoestats"
    ],
    arguments: [
        {
            name: "user",
            description: "The user to get the stats of",
            required: false,
            type: "USER"
        }
    ]
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%