define(['underscore'], function(_){

  return function(width, height, mines){

    var board = _.times(width, function(i){
      return _.times(height, function(){
        return {
          adjacent: 0
        };
      })
    });

    _.each(mines, function(mine){
      for(var x = mine.x - 1; x < mine.x + 3; x += 1){
        if(x >=0 && x < width) {
          for (var y = mine.y - 1; y < mine.y + 3; y += 1) {
            if(y >=0 && y < height) {
              board[x][y].adjacent += 1;
            }
          }
        }
      }
      board[mine.x][mine.y].mine = true;

    });

    return board;

  };

});