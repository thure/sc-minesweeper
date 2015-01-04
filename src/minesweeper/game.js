define([
    'underscore',
    'minesweeper/place-mines',
    'minesweeper/solve-board'
], function(_, placeMines, solveBoard){

  /**
   * Minesweeper game constructor. Returns a unique game object that contains information regarding the board.
   *
   * @param width - width of the board as an integer greater than 0
   * @param height - height of the board as an integer greater than 0
   * @param difficulty - ratio of mines to vacancies (i.e. a number between 0 and 1, 1 being impossible)
   * @constructor
   */
  function Minesweeper(width, height, difficulty){

    this.board = solveBoard(width, height,
        placeMines(width, height, difficulty)
    );

  }

  return Minesweeper;

});