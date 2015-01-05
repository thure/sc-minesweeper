var path = require('path');

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  var watchPort = 35729,
      assets = {
        'reset': grunt.file.read('./src/assets/reset.svg')
      };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      options: {
        livereload: watchPort
      },
      source: {
        files: ['src/**/*.js', 'src/**/*.ejs', 'src/**/*.scxml', 'src/assets/*'],
        tasks: ['ejs:watch', 'dist:copy']
      },
      styles: {
        files: 'src/**/*.less',
        tasks: ['styles']
      }
    },
    ejs: {
      watch: {
        expand: true,
        flatten: true,
        src: './src/app/index.ejs',
        dest: './dist/',
        ext: '.html',
        options: {
          watch: watchPort,
          prod: false,
          assets: assets
        }
      },
      nowatch: {
        expand: true,
        flatten: true,
        src: './src/app/index.ejs',
        dest: './dist/',
        ext: '.html',
        options: {
          watch: false,
          prod: false,
          assets: assets
        }
      },
      prod: {
        expand: true,
        flatten: true,
        src: './src/app/index.ejs',
        dest: './',
        ext: '.html',
        options: {
          watch: false,
          prod: true,
          assets: assets
        }
      }
    },
    bower: {
      install: {
        options: {
          cleanup: true,
          targetDir: './vendor'
        }
      }
    },
    less: {
      main: {
        options: {
          paths: ['./'],
          lineNumbers: true
        },
        files: {
          'dist/style/main.css': 'src/app/main.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 2 versions']
      },
      main: {
        src: 'dist/style/main.css',
        dest: 'dist/style/main.css'
      }
    },
    cssmin: {
      prod: {
        files: [{
          src: ['./dist/style/main.css'],
          dest: './style/main.min.css'
        }]
      }
    },
    requirejs: {
      compile: {
        options: {
          baseUrl: "./dist/js",
          name: 'app/main',
          mainConfigFile: "./dist/js/app/main.js",
          out: "./js/main.min.js",
          include: 'requireLib',
          paths: {
            requireLib: './vendor/require'
          }
        }
      }
    },
    copy: {
      vendor: {
        expand: true,
        flatten: true,
        cwd: './vendor',
        src: [
          'underscore/underscore.js',
          'require/require.js',
          'text/text.js',
          'jquery/jquery.js',
          'scion/dist/scion.js',
          'q/q.js'
        ],
        dest: './dist/js/vendor/'
      },
      sources: {
        expand: true,
        flatten: false,
        cwd: './src',
        src: ['**/*.js', '**/*.ejs', '**/*.scxml', '**/*.svg'],
        dest: './dist/js/'
      },
      assets: {
        expand: true,
        flatten: false,
        cwd: './src',
        src: ['**/*.svg', '**/*.scxml'],
        dest: './js/'
      }
    }
  });

  grunt.registerTask('default',      ['dist:watch', 'watch']);
  grunt.registerTask('install',      ['bower:install']);
  grunt.registerTask('styles',       ['less', 'autoprefixer']);
  grunt.registerTask('dist:copy',    ['copy:vendor', 'copy:sources']);
  grunt.registerTask('prod:copy',    ['copy:assets']);
  grunt.registerTask('dist:watch',   ['styles', 'dist:copy', 'ejs:watch']);
  grunt.registerTask('dist:nowatch', ['styles', 'dist:copy', 'ejs:nowatch']);
  grunt.registerTask('prod',         ['styles', 'dist:copy', 'requirejs', 'cssmin', 'prod:copy', 'ejs:prod']);

};