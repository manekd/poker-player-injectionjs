module.exports = {
    VERSION: "Chuck Norris player",
    bet_request: function(game_state) {
        return getCurrentBuyIn(game_state) - findMaxBetOfActivePlayer(game_state) + 1+getMinimumRaise(game_state);
    },

    showdown: function(game_state) {

    },

    getMinimumRaise:function(game_state){
        return game_state.minimum_raise;
    },

    getCurrentBuyIn: function(game_state) {
        return game_state.current_buy_in;
    },

    findMaxBetOfActivePlayer: function(game_state) {
        var maxBet = 0;
        game_state.players.forEach(function(player, index) {
            if (player.status === 'active' && player.bet > maxBet) {
                maxBet = player.bet;
            }
        });

        return maxBet;
    }
};
