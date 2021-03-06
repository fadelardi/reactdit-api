var gulp = require('gulp');
var eslint = require('gulp-eslint');
var nodemon = require('gulp-nodemon');

gulp.task('nodemon', function() {
	nodemon({});
});

gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!node/modules/**'])
    .pipe(eslint())
    .pipe(eslint.format());
});


gulp.task('default', ['lint', 'nodemon'], function() {
  var watcher = gulp.watch('**/*.js', ['lint']);
  watcher.on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks... ');
  });
});
