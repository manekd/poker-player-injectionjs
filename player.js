var _ = require('lodash');

module.exports = {
  VERSION: "Chuck Norris player 3",
  bet_request: function(game_state) {
    var me = this.findMe(game_state);
    var myBet = this.getMyBet(me);
    var currentBuyIn = this.getCurrentBuyIn(game_state);
    var myRank = this.rankCards(me.hole_cards);
    var commonRank = this.rankCards(game_state.community_cards);

    var cards = this.mergeCards(me.hole_cards, game_state.community_cards);
    var totalRank = this.rankCards(cards);
    var communityRank = this.rankCards(game_state.community_cards);
    console.log("rank", totalRank);
    var newBet = currentBuyIn - myBet;

    if (totalRank > 0) {
      newBet += totalRank;
      console.log('Raising.');
    }
    console.log("commonRank=", communityRank);
    console.log("totalRank=", totalRank);
    console.log("myRank=", myRank);

    if (cards.length === 6 && totalRank === 0) {
      return 0;
    }

    if (totalRank <= commonRank && cards.length === 6) {
      return 0;
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
    console.log("merge step started", cards, mycards, commonCards);
    if (mycards) {
      for (i = 0; i < mycards.length; i++) {
        cards.push(mycards[i]);
      }
    }
    console.log("merge step 1", cards);
    if (commonCards) {
      for (i = 0; i < commonCards.length; i++) {
        cards.push(commonCards[i]);
      }
    }
    console.log("merge step 2", cards);
    return cards;
  },
  rankCards: function(cards) {

    var dict = this._makeDict(cards);
    var fourResult = this.isFourOfKind(dict);
    if(fourResult){
      return 5 * 10 * 11;
    };

    var trippleResult = this.isTripple(dict);
    if (trippleResult) {
      var factor = this.getCardValue(trippleResult);
      return 3 * 10 * factor;
    };
    if (this.isDoublePair(dict)) {
      return 2 * 8 * 10;
    };
    var pairResult = this.isPair(dict);
    if (pairResult) {
      var factor = this.getCardValue(pairResult);
      return factor * 10;
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
  isPair: function(dict) {
    for (var prop in dict) {
      if (dict[prop] >= 2) {
        return prop;
      }
    };
    return 0;
  },
  isDoublePair: function(dict) {
    var pairCount = 0;
    for (var prop in dict) {
      if (dict[prop] >= 2) {
        pairCount++;
      }
    };
    return pairCount >= 2;
  },
  isTripple: function(dict) {
    var trippleCount = 0;
    for (var prop in dict) {
      if (dict[prop] >= 3) {
        return prop;
      }
    };
    return 0;
  },
  isFourOfKind: function(dict) {
    for (var prop in dict) {
      if (dict[prop] >= 4) {
        return prop;
      }
    };
    return 0;
  },

  getCardValue: function(rank) {
    switch (rank) {
      case 'J':
        return 11;
      case 'Q':
        return 12;
      case 'K':
        return 13;
      case 'A':
        return 14;
    }
    return parseInt(rank);
  }


};
