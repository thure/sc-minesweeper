define(['underscore'], function(_){

  return function(xstr, ystr){

    var x = parseInt(xstr, 10),
        y = parseInt(ystr, 10),
        selected = [[x,y]];

    if(this.board[x][y].adjacent === 0){

      var stack = [selected[0]];

      while(stack.length > 0){
        var cur = stack.pop(),
            cx = cur[0],
            cy = cur[1],
            left = false,
            right = false;

        // move upward
        while(cy - 1 >= 0 && this.board[cx][cy - 1].adjacent === 0){
          cy -= 1;
        }

        // fill downward
        while(cy < this.height && this.board[cx][cy].adjacent === 0){

          // add this tile
          if(!(cx === x && cy === y)){
            selected.push([cx, cy]);
            this.board[cx][cy].revealed = true;
          }

          // check for stack opportunities
          if(cx > 0){
            if(this.board[cx-1][cy].adjacent === 0 && !this.board[cx-1][cy].revealed){
              if(!left){
                stack.push([cx-1,cy]);
                left = true;
              }
            }else
            if(left){
              left = false;
            }
          }

          if(cx < this.width - 1){
            if(this.board[cx+1][cy].adjacent === 0 && !this.board[cx+1][cy].revealed){
              if(!right){
                stack.push([cx+1,cy]);
                right = true;
              }
            }else
            if(right){
              right = false;
            }
          }

          cy += 1;

        } // done filling downward

      } // done with stack

    } // done selecting all empty tiles

    return selected;

  };

});