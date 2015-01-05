define([
  'underscore',
  'jquery',
  'minesweeper/game',
  'text!board/board.ejs',
  'text!assets/mine.svg'
], function(_, $, Minesweeper, boardEJS, mineSVG){

  var template = _.template(boardEJS);

  function Board(sci, width, height, difficulty){

    this.game = new Minesweeper(width, height, difficulty);

    this.dispatch = {

      selectTile: _.bind(function(e){
        var $tile = e.target.classList.contains('tile') ? $(e.target) : $(e.target).parents('.tile');
        if($tile.hasClass('mine')){
          sci.gen('trip');
        } else
        if($tile.attr('data-x') && $tile.attr('data-y')){
          sci.gen({
            name: 'reveal',
            data: {
              x: $tile.attr('data-x'),
              y: $tile.attr('data-y')
            }
          });
        }
      }, this),

      transitionEnd: _.bind(_.debounce(function(e){
        sci.gen('done-revealing');
      }, 100), this)

    };

    this.reveal = _.bind(function(x, y){
      _.each(this.game.select(x, y), this.revealTile);
    }, this);

    this.revealTile = _.bind(function(tile){
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
        romanize: this.romanize,
        mineSVG: mineSVG
      }));

      $('body > main > section.game').html($el);

      this.bind($el);

    };

    this.bind = function($el){

      this.$el = $el;

      $el[0].addEventListener('mousedown', this.dispatch.selectTile);
      $el[0].addEventListener('transitionend', this.dispatch.transitionEnd);
      $el[0].addEventListener('animationend', this.dispatch.transitionEnd);
      $el[0].addEventListener('webkitAnimationEnd', this.dispatch.transitionEnd);

    };

  }

  return Board;

});