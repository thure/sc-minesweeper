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
  'common/dom-q'
], function(q, $, _, sci, dom){

  function ready(results){
    var i = results[0];
    i.gen({
      name: 'ready'
    });
  }

  q.all([sci('app/main.scxml'), dom]).then(ready);

});