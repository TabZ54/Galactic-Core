const Utils = require('./utils.js');
module.exports = {
    set: function (variable, value, expireAfter = 0) {
        if (variable == 'set') return Utils.error('Cannot set variable \'set\'');
        this[variable] = value;
        if (expireAfter > 0)
            setTimeout(function () {
                delete this[variable];
            }, expireAfter);
        return value;
    }
};
// 199197   8501   e202de103880216c56e15764c7520c8f    84830   1654352244   ac5405a45f9d68088f38efb8cee1cc7b   %%__NONCE__%%