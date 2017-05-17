var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var cssMin = require('gulp-css');

gulp.task('css', function(){
    gulp.src([
        './assets/css/style.css'
    ])
    .pipe(concat('dist.min.css'))
    .pipe(cssMin())
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('javascript', function() {
    gulp.src([
        './src/app.js',
        './src/**/*.js'
    ])
    .pipe(concat('dist.min.js'))
    .pipe(uglify().on('error', function(e){
            console.log(e);
    }))
    .pipe(gulp.dest('./dist/js'));
});

//chama as taks css e javascript
gulp.task('default', ['css', 'javascript']);