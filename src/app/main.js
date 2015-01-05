requirejs.config({
  baseUrl: 'js',
  paths: {
    'text': 'vendor/text',
    'q': 'vendor/q',
    'underscore': 'vendor/underscore',
    'jquery': 'vendor/jquery',
    'scion': 'vendor/scion'
  }
});

requirejs([
  'q',
  'jquery',
  'underscore',
  'common/scion-q',
  'common/dom-q',
  'board/board'
], function(q, $, _, sci, dom, Board){

  function ready(results){
    var sci = results[0],
        $reset = $('button[data-for="reset"]');

    var dispatch = {

      lose: function(){
        document.body.setAttribute('data-state', 'lost');
      },
      win: function(){
        document.body.setAttribute('data-state', 'won');
      },
      play: function(){
        var gameBoard = new Board(sci, 8, 8, .1);
        document.body.setAttribute('data-state', 'playing');
        return gameBoard;
      }

    };

    $reset.on('click', function(){
      sci.gen('reset');
    });

    sci.gen({
      name: 'ready',
      data: {
        dispatch: dispatch,
        $reset: $reset
      }
    });

  }

  q.all([sci('app/main.scxml'), dom]).then(ready);

});