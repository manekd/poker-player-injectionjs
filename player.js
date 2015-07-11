module.exports = {
  VERSION: "Chuck Norris player",
  bet_request: function(game_state) {
    var bet = Math.max(400, this.ijs_findMaxBetOfActivePlayer(game_state));
    var cards = this.mergeCards(game_state.hole_cards, game_state.community_cards);
    var rank = this.rankCards(cards);
    console.log(bet);
    console.log("rank", rank);
    return bet;
  },

  showdown: function(game_state) {

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
  },
  mergeCards: function(mycards, commonCards) {
    var cards = [];
    if (mycards) {
      for (var i = 0; i < mycards.length; i++) {
        cards.push(mycards[i]);
      }
    }
    if (commonCards) {
      for (var i = 0; i < commonCards.length; i++) {
        cards.push(commonCards[i]);
      }
    }
    return cards;
  },
  rankCards: function(cards) {
    if (this.isPair(cards)) {
      return 1;
    }
    if (this.isDoublePair(cards)) {
      return 2;
    };
    if (this.isTripple(cards)) {
      return 3;
    };
    return 0;
  },
  _makeDict: function(cards) {
    var dict = {};
    cards.forEach(function(c, i) {
      if (dict[c.rank]) {
        dict[c.rank]++;
      } else {
        dict[c.rank] = 1;
      }
    });
  },
  isPair: function(cards) {
    var dict = this._makeDict(cards);
    for (var prop in dict) {
      if (dict[prop] >= 2) {
        return true;
      }
    };
    return false;
  },
  isDoublePair: function(cards) {
    var dict = this._makeDict(cards);
    var pairCount = 0;
    for (var prop in dict) {
      if (dict[prop] >= 2) {
        pairCount++;
      }
    };
    return pairCount >= 2;
  },
  isTripple: function(cards) {
    var dict = this._makeDict(cards);
    var trippleCount = 0;
    for (var prop in dict) {
      if (dict[prop] >= 3) {
        trippleCount++;
      }
    };
    return trippleCount >= 1;
  }
};
