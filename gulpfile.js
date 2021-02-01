const gulp = require('gulp');

const browserSync = require('browser-sync').create();
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const del = require('del');

gulp.task('html', function(){
    return gulp.src('app/src/*.html')
        .pipe(gulp.dest('app/dist/'));
});

gulp.task('javascript', function(){
    return gulp.src('app/src/js/**')
    .pipe(babel())
    .pipe(concat('app/src/js/**'))
    .pipe(uglify())
    .pipe(rename("bundle.min.js"))
    .pipe(gulp.dest('app/dist/js/'));
});

gulp.task('styles',function(){
    return gulp.src('app/src/scss/**')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('app/dist/css/'));
});

gulp.task('clean',function(){
    return del('app/dist/**');
});

gulp.task('compile',gulp.series('clean','html','javascript','styles'));

gulp.task('serve', function(){
    browserSync.init({
        server:{
            baseDir: "./app/dist/"
        }
    });

    gulp.watch('app/src/**', gulp.series('compile')).on('change',browserSync.reload);
});

gulp.task('default',gulp.series('compile','serve'));