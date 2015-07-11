module.exports = {
  VERSION: "Chuck Norris player",
  bet_request: function(game_state) {
    console.log(game_state);
    var bet = 1 + this.ijs_getMinimumRaise(game_state);
    console.log(bet);
    return bet;
  },

  showdown: function(game_state) {

  },

  ijs_getMinimumRaise: function(game_state) {
    console.log("state:", game_state);
    console.log("min:", game_state.minimum_raise);
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
