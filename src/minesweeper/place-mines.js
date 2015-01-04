define(['underscore'], function(_){

  return function(width, height, difficulty){

    var result = [],
        mines = Math.max(
            Math.min(
                Math.floor(height * width * difficulty),
                height * width - 1
            ),
            1
        );

    _.times(mines, function(){

      var coords;

      do{

        coords = {
          x: Math.floor(Math.random() * width),
          y: Math.floor(Math.random() * height)
        };

      }while(!!_.findWhere(result, coords));

      result.push(coords);

    });

    return result;

  };

});