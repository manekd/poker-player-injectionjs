var _ = require('lodash');

module.exports = {
  VERSION: "Chuck Norris player 2",
  bet_request: function(game_state) {
    var me = this.findMe(game_state);
    var myBet = this.getMyBet(me);
    var currentBuyIn = this.getCurrentBuyIn(game_state);
    var cards = this.mergeCards(me.hole_cards, game_state.community_cards);
    var rank = this.rankCards(cards);
    var communityRank = this.rankCards(game_state.community_cards);
    console.log("rank", rank);
    var newBet = currentBuyIn - myBet;
    if (rank > communityRank) {
      newBet += 11;
      console.log('Raising.');
    }

    console.log("new bet=", newBet);
    return newBet;
  },

  showdown: function(game_state) {},

  getMyBet: function(player) {
    return player.bet;
  },

  findMe: function(game_state) {
    return game_state.players[2];

  },

  getMinimumRaise: function(game_state) {
    return game_state.minimum_raise;
  },
  getCurrentBuyIn: function(game_state) {
    return game_state.current_buy_in;
  },

  findMaxBetOfActivePlayer: function(game_state) {
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
    var i = 0;
    if (mycards) {
      for (i = 0; i < mycards.length; i++) {
        cards.push(mycards[i]);
      }
    }
    if (commonCards) {
      for (i = 0; i < commonCards.length; i++) {
        cards.push(commonCards[i]);
      }
    }
    return cards;
  },
  rankCards: function(cards) {
    if (this.isTripple(cards)) {
      return 3;
    };
    if (this.isDoublePair(cards)) {
      return 2;
    };
    if (this.isPair(cards)) {
      return 1;
    }

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
    return dict;
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
    console.log("in tripple: cards = ", cards);
    for (var prop in dict) {
      console.log("prop = ", prop, dict[prop]);
      if (dict[prop] >= 3) {
        trippleCount++;
      }
    };

    return trippleCount >= 1;
  },

  getCardValue: function(card) {
    switch (card.rank) {
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      case 'A':
        return 14;
    }
    return card.rank;
  }


};
