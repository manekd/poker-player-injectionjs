module.exports = {
    VERSION: "Chuck Norris player",
    bet_request: function(game_state) {
        var me = this.ijs_findMe(game_state);
        var myBet = this.ijs_getMyBet(me);
        var currentBuyIn = this.ijs_getCurrentBuyIn(game_state);
        return 1 + currentBuyIn - meBet;
    },

    showdown: function(game_state) {},

    ijs_getMyBet: function(player) {
        return player.bet;
    },

    ijs_findMe: function(game_state) {
        game_state.players.forEach(function(player, index) {
            if (player.name === "Injectionjs") {
                return player;
            }

        })
    },

    ijs_getMinimumRaise: function(game_state) {
        return game_state.minimum_raise;
    },

    ijs_getCurrentBuyIn: function(game_state) {
        return game_state.current_buy_in;
    },

    ijs_findMaxBetOfActivePlayer: function(game_state) {
        var maxBet = 0;
        game_state.players.forEach(function(player, index) {
            if (player.status === 'active') {
                maxBet += player.bet;
            }
        });

        return maxBet;
    }
};
