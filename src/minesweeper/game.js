define([
    'underscore',
    'minesweeper/place-mines',
    'minesweeper/solve-board',
    'minesweeper/select'
], function(_, placeMines, solveBoard, select){

  /**
   * Minesweeper game constructor. Returns a unique game object that contains information regarding the board.
   *
   * @param width - width of the board as an integer greater than 0
   * @param height - height of the board as an integer greater than 0
   * @param difficulty - ratio of mines to vacancies (i.e. a number between 0 and 1, 1 being impossible)
   * @constructor
   */
  function Minesweeper(width, height, difficulty){

    this.width = width;
    this.height = height;

    this.select = _.bind(select, this);

    this.board = solveBoard(width, height,
        placeMines(width, height, difficulty)
    );

    this.checkVictory = _.bind(function(){
      for(var i = 0; i < this.width; i += 1){
        for(var j = 0; j < this.height; j += 1){
          var cur = this.board[i][j];
          if((cur.mine && !cur.flagged) || (!cur.mine && cur.flagged)) return false;
        }
      }
      return true;
    }, this);

  }

  return Minesweeper;

});