define([
  'underscore',
  'jquery',
  'minesweeper/game',
  'text!board/board.ejs'
], function(_, $, Minesweeper, boardEJS){

  var template = _.template(boardEJS);

  function Board(sci, width, height, difficulty){

    this.game = new Minesweeper(width, height, difficulty);

    this.dispatch = {

      selectTile: _.bind(function(e){
        var self = this;
        if(e.target.hasAttribute('data-x') && e.target.hasAttribute('data-y')){
          var selection = this.game.select(
              e.target.getAttribute('data-x'),
              e.target.getAttribute('data-y')
          );
          _.each(selection, self.reveal);
        }
      }, this)

    };

    this.reveal = _.bind(function(tile){
      var x = tile[0],
          y = tile[1];

      return this.$el.find('b.tile[data-x="' + x + '"][data-y="' + y + '"]').addClass('revealed');

    }, this);

    this.romanize = function(int){
      switch(int){
        case 1:
          return 'I';
          break;
        case 2:
          return 'II';
          break;
        case 3:
          return 'III';
          break;
        case 4:
          return 'IV';
          break;
        case 5:
          return 'V';
          break;
        case 6:
          return 'VI';
          break;
        case 7:
          return 'VII';
          break;
        case 8:
          return 'VIII';
          break;
      }
    };

    this.render = function(){

      var $el = $(template({
        game: this.game,
        romanize: this.romanize
      }));

      $('body > main').append($el);

      this.bind($el);

    };

    this.bind = function($el){

      this.$el = $el;

      $el[0].addEventListener('mousedown', this.dispatch.selectTile);

    };

  }

  return Board;

});