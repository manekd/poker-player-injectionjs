module.exports = {
    VERSION: "Chuck Norris player",
    bet_request: function(game_state) {
        return this.ijs_getCurrentBuyIn(game_state)
        - this.ijs_findMaxBetOfActivePlayer(game_state)
        + 1
        + this.ijs_getMinimumRaise(game_state);
    },

    showdown: function(game_state) {

    },

    ijs_getMinimumRaise:function(game_state){
        return game_state.minimum_raise;
    },

    ijs_getCurrentBuyIn: function(game_state) {
        return game_state.current_buy_in;
    },

    ijs_findMaxBetOfActivePlayer: function(game_state) {
        var maxBet = 0;
        game_state.players.forEach(function(player, index) {
            if (player.status === 'active' && player.bet > maxBet) {
                maxBet = player.bet;
            }
        });

        return maxBet;
    }
};
