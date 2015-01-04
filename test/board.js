var assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

chai.should();

describe('Minesweeper', function () {


    describe('board', function(){

        it('should exist.', function(){
            var game = new global.Minesweeper(64, 64, .8);
            return game.should.have.property('board');
        });

    });

    describe('select', function(){

        it('should return an array of coordinates', function(){

            var game = new global.Minesweeper(8, 8, .01),
                selection = game.select(1, 1);

            return selection.should.be.instanceof(Array) && selection[0].should.have.property('x') && selection[0].should.have.property('y');

        });

    });

});