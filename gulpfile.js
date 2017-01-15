var gulp            = require('gulp'),
    clean           = require('gulp-clean'),
    browserify      = require('gulp-browserify'),
    runSequence     = require('run-sequence');

gulp.task('scripts', function(){
    return gulp.src('src/client/js/index.js')
        .pipe(browserify({
            insertGlobals: true
        }))
        .pipe(gulp.dest('./dist/main.js'))
});

gulp.task('clean', function () {
    return gulp.src('./dist', { read: false })
        .pipe(clean());
});

gulp.task('watch', function () {
    gulp.watch('src/**/*.js', ['scripts']);
});

gulp.task('build', function(callback) {
    runSequence('clean', 'scripts', callback);
});