
var gulp = require('gulp');
var del = require('del'); // rm -rf

var concat = require('gulp-concat');
var inject = require('gulp-inject');
var series = require('stream-series');
var gls = require('gulp-live-server');
var runSequence = require('run-sequence');
var merge = require('merge-stream');

var bases = {
 app: 'src/app/',
 dist: 'dist/',
};

var paths = {
 scripts: ['**/*.js'],
 libs: ['node_modules/systemjs/dist/system.src.js', 'node_modules/angular2/bundles/angular2.dev.js'],
 cssLibs: ['node_modules/purecss/build/pure-min.css', 'node_modules/purecss/build/grids-responsive-min.css'],
 styles: ['**/*.css'],
 html: ['index.html', '404.html'],
 images: ['images/**/*.png'],
 extras: ['crossdomain.xml', 'humans.txt', 'manifest.appcache', 'robots.txt', 'favicon.ico'],
};


// Clean the dist directory
gulp.task('clean', function() {
  //return del(bases.dist);	
});

gulp.task('start.dev', function() {
  return runSequence(
	'build.dev',
    'serve'
  );
});
 
gulp.task('build.dev',function() {
  return runSequence(
	'build.css.dev',
	'build.js.dev',
    'build.index.dev'
  );
});


 
gulp.task('build.js.dev', function (done) {
	var libs = gulp.src(paths.libs)
			.pipe(concat('libs.js'))
			.pipe(gulp.dest('./dist'));
	var scripts = gulp.src(paths.scripts, {cwd: bases.app})
			.pipe(gulp.dest(bases.dist + 'app/'));
	
	return merge(libs, scripts);
		
});

gulp.task('build.css.dev', function () {
	var libs = gulp.src(paths.cssLibs)
		.pipe(concat('libs.css'))
		.pipe(gulp.dest('./dist'));
		
	var styles = gulp.src(paths.styles, {cwd: bases.app})
		.pipe(gulp.dest(bases.dist + 'app/'));
		
	return merge(libs, styles);
});

gulp.task('build.index.dev', ['build.js.dev', 'build.css.dev'], function() {
	var vendorStream = gulp.src(['libs.js', 'libs.css', 'http://localhost:35729/livereload.js'], {cwd: bases.dist, read: false});
	var appStream = gulp.src(['dist/app/bootstrap.js', 'dist/app/app.css'], {read: false});

	var options = {
		ignorePath: ['dist'],
		removeTags: false
	};

	return gulp.src('./src/index.html')
	  .pipe(inject(series(vendorStream, appStream), options)) // This will always inject vendor files before app files 
	  .pipe(gulp.dest('./dist'));
});


gulp.task('serve', function() {
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
gulp.task('watch', function() {
 return gulp.watch('app/**/*', ['scripts', 'copy']);
});
