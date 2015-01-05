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
    var sci = results[0];
    sci.gen({
      name: 'ready'
    });

    var gameBoard = new Board(sci, 8, 8, .1);
    gameBoard.render();

  }

  q.all([sci('app/main.scxml'), dom]).then(ready);

});