var path = require('path'),
    spawn = require('child_process').spawn,
    requirejs = require('requirejs'),
    assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

chai.should();

describe('Minesweeper', function () {

    var Minesweeper = null;

    before(function(done){

        requirejs.config({
            baseUrl: path.join(__dirname, '../dist/js'),
            paths: {
                'text': 'vendor/text',
                'q': 'vendor/q',
                'underscore': 'vendor/underscore',
                'jquery': 'vendor/jquery',
                'scion': 'vendor/scion'
            }
        });

        var grunt = spawn('grunt', ['dist:nowatch']);

        grunt.on('close', function(){

            requirejs(['minesweeper/game'], function(game){
                Minesweeper = game;
                done();
            });

        });

    });

    it('board should exist.', function(){
        var game = new Minesweeper(8, 8, .2);
        return game.should.have.property('board');
    })

});