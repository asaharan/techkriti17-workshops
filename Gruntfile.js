module.exports = function(grunt) {
  process.env.NODE_ENV = 'production';
  grunt.initConfig({
    uglify:{
      build:{
        src:'./app/index.js',
        dest:'./app/index.min.js'
      }
    },
    browserify: {
      dist:{
        files: {
          './app/index.js': ['./app/app.js']
        },
      }
    },
    sass:{
      dist:{
        options:{
          style:'compressed',
        },
        files:{
          '../public/styles/main.css':'styles/main.scss'
        }
      }
    },
    connect: {
      server:{
        options:{
          port:3489
        }
      }
    },
    watch: {
      scripts:{
        files: ['app/view1/*.js','app/*/*.js','app/*.js','!app/index.js','!app/index.min.js'],
        tasks: ['browserify','uglify']
      },
      styles:{
        files:['styles/*.scss','styles/*/*.scss','styles/*/*/*.scss'],
        tasks:['sass']
      }
    }
  });

  //can change sourcemap to none in sass
  // bundle:{
  //   files: ['../public/js/bundle.js'],
  //   tasks: ['uglify']
  // },
  // grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-contrib-connect');

  grunt.registerTask('default', ['watch','browserify','uglify']);

};
