define([
  'underscore',
  'jquery',
  'minesweeper/game',
  'text!board/board.ejs',
  'text!assets/mine.svg'
], function(_, $, Minesweeper, boardEJS, mineSVG){

  var template = _.template(boardEJS);

  function Board(sci, width, height, difficulty){
    var self = this;

    this.game = new Minesweeper(width, height, difficulty);

    this.dispatch = {

      contextmenu: function(e){
        e.preventDefault();
        return false;
      },

      mousedown: _.bind(function(e){
        var $tile = e.target.classList.contains('tile') ? $(e.target) : $(e.target).parents('.tile'),
            rightClick = e.which === 3 || e.button === 2;
        if($tile.length && rightClick && document.body.getAttribute('data-state') === 'playing'){
          if($tile.hasClass('flagged')){
            $tile.removeClass('flagged');
            this.game.board[parseInt($tile.attr('data-x'))][parseInt($tile.attr('data-y'))].flagged = false;
          }else{
            $tile.addClass('flagged');
            this.game.board[parseInt($tile.attr('data-x'))][parseInt($tile.attr('data-y'))].flagged = true;
            if(this.game.checkVictory()){
              sci.gen('all-flagged');
            }
          }
        }else {
          if ($tile.hasClass('mine')) {
            sci.gen('trip');
          } else if ($tile.attr('data-x') && $tile.attr('data-y')) {
            sci.gen({
              name: 'reveal',
              data: {
                x: $tile.attr('data-x'),
                y: $tile.attr('data-y')
              }
            });
          }
        }
      }, this),

      transitionEnd: _.bind(_.debounce(function(e){
        sci.gen('done-revealing');
      }, 100), this)

    };

    this.reveal = _.bind(function(x, y){

      _.each(this.game.select(x, y), function(tile){
        self.revealTile(tile, x, y)
      });
    }, this);

    this.revealTile = _.bind(function(tile, ox, oy){
      var x = tile[0],
          y = tile[1],
          delay = Math.sqrt( Math.pow(x - ox, 2) + Math.pow(y - oy, 2) ) * 100 + 'ms';

      return this.$el.find('b.tile[data-x="' + x + '"][data-y="' + y + '"]').addClass('revealed').css({
        'transition-delay': delay,
        '-webkit-transition-delay': delay,
        '-moz-transition-delay': delay,
        '-o-transition-delay': delay,
        '-ms-transition-delay': delay
      }).find('.cover').css({
        'animation-delay': delay,
        '-webkit-animation-delay': delay,
        '-moz-animation-delay': delay,
        '-o-animation-delay': delay,
        '-ms-animation-delay': delay
      });

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

      $el[0].addEventListener('mousedown', this.dispatch.mousedown, true);
      $el[0].addEventListener('contextmenu', this.dispatch.contextmenu, true);
      $el[0].addEventListener('transitionend', this.dispatch.transitionEnd, true);
      $el[0].addEventListener('animationend', this.dispatch.transitionEnd, true);
      $el[0].addEventListener('webkitAnimationEnd', this.dispatch.transitionEnd, true);

    };

  }

  return Board;

});