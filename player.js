module.exports = {
    VERSION: "Chuck Norris player",
    bet_request: function(game_state) {
        var bet = ijs_getCurrentStack(game_state) / 2;
        console.log(bet);

        return bet;
    },

    showdown: function(game_state) {

    },

    ijs_getCurrentStack: function(game_state) {
      var currentUserIdx = game_state.in_action;
      return game_state.players[currentUserIdx].stack;
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
            if (player.status === 'active') {
                maxBet += player.bet;
            }
        });

        return maxBet;
    }
};
