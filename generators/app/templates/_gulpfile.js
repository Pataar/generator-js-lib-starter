var gulp            = require('gulp'),
    concat          = require('gulp-concat'),
    uglify          = require('gulp-uglify'),
    stylish         = require('jshint-stylish'),
    rename          = require('gulp-rename'),
    template        = require('gulp-template'),
    jshint          = require('gulp-jshint'),
    watch           = require('gulp-watch'),
    gutil           = require('gulp-util'),

    libfiles        = ['./src/lib/*.js'],
    srcfiles        = ['./src/**/*.js'],

    version         = '<%= version %>',

    variables       = {
        'VERSION'       : version,
        'VERSION_MAJOR' : version.split('.')[0],
        'VERSION_MINOR' : version.split('.')[1],
        'VERSION_PATCH' : version.split('.')[2],
        'NAME'          : '<%= projectname %>'
    };

gulp.task('default', ['build']);

gulp.task('build', ['lint'], function () {

    //build <%= projectname %>.js
    gulp.src(libfiles.concat(srcfiles))
    .pipe(concat(variables.NAME + '.js'))
    .pipe(template(variables))
    .pipe(gulp.dest('./dist/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});


gulp.task('watch', function() {
    gulp.watch(['./**/*.js', '!./node_modules/**', '!./dist/**'], ['build']).on('error', swallowError);
});

//stops breaking watch when finding an error
function swallowError (error) {
    console.log(error.toString());

    this.emit('end');
}

gulp.task('lint', function() {
    return gulp.src(srcfiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
