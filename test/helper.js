var path = require('path'),
    spawn = require('child_process').spawn,
    requirejs = require('requirejs'),
    assert = require('assert'),
    chai = require('chai'),
    expect = chai.expect;

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
      global.Minesweeper = game;
      done();
    });

  });

});