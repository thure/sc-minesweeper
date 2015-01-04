define([
  'underscore',
  'jquery',
  'minesweeper/game',
  'text!board/board.ejs'
], function(_, $, Minesweeper, boardEJS){

  var template = _.template(boardEJS);

  function Board(width, height, difficulty){

    var game = new Minesweeper(width, height, difficulty);

    this.render = function(){

      var $el = $( template(game) );
      $('body > main').append($el);
      this.bind($el);

    };

    this.bind = function($el){};

  }

  return Board;

});