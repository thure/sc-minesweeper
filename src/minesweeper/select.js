define(['underscore'], function(_){

  return function(x, y){

    var cur = [x + '.' + y];

    if(this.board[x][y].adjacent === 0){

      // TODO: flood fill edges with zeros with diagonal adjacency

    }

    return _.map(_.uniq(cur), function(xystr){
      var xyarr = xystr.split('.');
      return {
        x: parseInt(xyarr[0]),
        y: parseInt(xyarr[1])
      };
    });

  };

});