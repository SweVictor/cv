/// <binding BeforeBuild='build.dev' />
/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/


var gulp = require('gulp');
var del = require('del'); // rm -rf

var concat = require('gulp-concat');
var inject = require('gulp-inject');
var jshint = require('gulp-jshint');
var less = require('gulp-less');
var series = require('stream-series');
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');
var merge = require('merge-stream');
var tsc = require('gulp-typescript');
var tsProject = tsc.createProject('tsconfig.json');


var bases = {
    app: 'app/',
    dist: 'wwwroot/',
};

var paths = {
    scripts: ['**/*.js'],
    typescripts: ['**/*.ts'],
    templates: ['**/*.html'],
    libs: ['node_modules/systemjs/dist/system.src.js', 'node_modules/angular2/bundles/angular2.dev.js'],
    cssLibs: ['node_modules/purecss/build/pure-min.css', 'node_modules/purecss/build/grids-responsive-min.css'],
    styles: ['**/*.less'],
    html: ['index.html', '404.html'],
    images: ['images/**/*.png'],
    extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};


gulp.task('default', function () {
    // place code for your default task here
});

// Clean the dist directory
gulp.task('clean', function () {
    //return del(bases.dist);	
});

gulp.task('start.dev', function () {
    return runSequence(
      'build.dev',
      'serve'
    );
});

gulp.task('build.dev', function () {
    return runSequence(
      'build.styles.dev',
      'build.js.dev',
      'build.templates.dev',
      'build.index.dev'
    );
});



gulp.task('build.js.dev', function (done) {
    var libs = gulp.src(paths.libs)
			.pipe(concat('libs.js'))
			.pipe(gulp.dest(bases.dist));
    var tsResult = gulp.src(paths.typescripts, { cwd: bases.app })
            .pipe(tsc(tsProject));            

            //.pipe(jshint())
            //.pipe(jshint.reporter('default'))

    var scripts = tsResult.js
            //.pipe(sourcemaps.write('.'))
			.pipe(gulp.dest(bases.dist + 'app'));
    return merge(libs, scripts);

});

gulp.task('build.styles.dev', function () {
    var libs = gulp.src(paths.cssLibs)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest(bases.dist));

    var styles = gulp.src(paths.styles, { cwd: bases.app })
        .pipe(less())
		.pipe(gulp.dest(bases.dist + 'app/'));

    return merge(libs, styles);
});

gulp.task('build.templates.dev', function () {
    var templates = gulp.src(paths.templates, { cwd: bases.app })
		.pipe(gulp.dest(bases.dist + 'app/'));

    return templates;
});

gulp.task('build.index.dev', ['build.js.dev', 'build.css.dev'], function () {
    var vendorStream = gulp.src(['libs.js', 'libs.css', 'http://localhost:35729/livereload.js'], { cwd: bases.dist, read: false });
    var appStream = gulp.src([bases.dist + 'app/bootstrap.js', bases.dist + 'app/app.css'], { read: false });

    var options = {
        ignorePath: ['wwwroot'],
        removeTags: false
    };

    return gulp.src('./index.html')
	  .pipe(inject(series(vendorStream, appStream), options)) // This will always inject vendor files before app files 
	  .pipe(gulp.dest(bases.dist));
});


gulp.task('serve', function () {
    // //1. serve with default settings 
    // var server = gls.static(); //equals to gls.static('public', 3000); 
    // server.start();

    //2. serve at custom port 
    var server = gls.static('dist', 8888);
    server.start();

    // //3. serve multi folders 
    // var server = gls.static(['dist', '.tmp']);
    // server.start();

    //use gulp.watch to trigger server actions(notify, start or stop) 
    // gulp.watch(['dist/**/*.css', 'dist/**/*.js', 'dist/**/*.html'], function (file) {
    // server.notify.apply(server, [file]);
    // });
});

// A development task to run anytime a file changes
gulp.task('watch', function () {
    return gulp.watch('app/**/*', ['scripts', 'copy']);
});