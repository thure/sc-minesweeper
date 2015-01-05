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

    this.render = function(){

      var $el = $( template(this.game) );

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