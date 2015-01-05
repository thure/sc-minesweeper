define(['underscore'], function(_){

  return function(xstr, ystr){

    var self = this,
        x = parseInt(xstr, 10),
        y = parseInt(ystr, 10),
        selected = [[x,y]],
        perimeter = [],
        cx, cy;

    if(this.board[x][y].adjacent === 0){

      var stack = [selected[0]];

      var checkDiagonal = function(dx, dy){
        if (!self.board[dx][dy].revealed) {
          if (self.board[dx][dy].adjacent === 0) {
            stack.push([dx,dy]);
          } else {
            perimeter.push([dx,dy]);
            self.board[dx][dy].revealed = true;
          }
        }
      };

      while(stack.length > 0){
        var cur = stack.pop(),
            left = false,
            right = false;

        cx = cur[0];
        cy = cur[1];

        // move upward
        while(cy - 1 >= 0 && this.board[cx][cy - 1].adjacent === 0){
          cy -= 1;
        }

        // add upper cap to perimeter
        if(cy - 1 >= 0){
          perimeter.push([cx, cy - 1]);
          this.board[cx][cy-1].revealed = true;

          if(cx-1 >= 0) {
            checkDiagonal(cx - 1, cy - 1);
          }

          if (cx + 1 < this.width) {
            checkDiagonal(cx + 1, cy - 1);
          }
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
            if(!this.board[cx-1][cy].revealed){
              if(this.board[cx-1][cy].adjacent === 0) {
                if (!left) {
                  stack.push([cx - 1, cy]);
                  left = true;
                }
              }else{
                perimeter.push([cx - 1, cy]);
                this.board[cx - 1][cy].revealed = true;
              }
            }else
            if(left){
              left = false;
            }
          }

          if(cx < this.width - 1){
            if(!this.board[cx+1][cy].revealed){
              if(this.board[cx+1][cy].adjacent === 0) {
                if (!right) {
                  stack.push([cx + 1, cy]);
                  right = true;
                }
              }else{
                perimeter.push([cx + 1, cy]);
                this.board[cx + 1][cy].revealed = true;
              }
            }else
            if(right){
              right = false;
            }
          }

          cy += 1;

        } // done filling downward

        // add lower cap to perimeter
        if(cy < this.height){
          perimeter.push([cx, cy]);
          this.board[cx][cy].revealed = true;

          if(cx-1 >= 0){
            checkDiagonal(cx - 1, cy);
          }

          if(cx+1 < this.width){
            checkDiagonal(cx+1, cy);
          }
        }

      } // done with stack

    } // done selecting all empty tiles

    return selected.concat(perimeter);

  };

});