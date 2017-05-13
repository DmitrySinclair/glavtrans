'use strict';

const gulp = require('gulp'),
      browserify = require('browserify'),
      es = require('event-stream'),
      sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps'),
      autoprefixer = require('gulp-autoprefixer'),
      imagemin = require('gulp-imagemin'),
      rename = require('gulp-rename'),
      concat = require('gulp-concat'),
      uglify = require('gulp-uglify'),
      clean = require('gulp-clean'),
      connect = require('gulp-connect'),
      source = require('vinyl-source-stream'),
      buffer = require('vinyl-buffer'),
      gutil = require('gulp-util'),

      pug = require('gulp-pug'),
      gulpif = require('gulp-if'),
      emitty = require('emitty').setup('src', 'pug', {
        makeVinylFile: true
      }),

      src = 'src',
      dist = 'dist';


// *********************************
// ---------Clean
// *********************************

gulp.task('clean', () => {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});



// *********************************
// --------Compress images
// *********************************

gulp.task('images', () => {
  return gulp.src([
    // '!' + src + '/img/*.png',
    src + '/images/**/**'
  ], {base: src})
  .pipe(imagemin())
  .pipe(gulp.dest( dist ));
});



// *********************************
// ----------Compile js
// *********************************

gulp.task('js:main', function () {
  // set up the browserify instance on a task basis
  var b = browserify({
    entries: './src/app/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('dist/app/'));
});

gulp.task('js:vendor', () => {
  return gulp.src([
    src + '/libs/jquery/jquery-3.1.0.js',
    src + '/libs/slick/slick.js',
    src + '/libs/scroll/scroll.js',
    // src + '/libs/headroom/headroom.js',
    // src + '/libs/fancybox3/jquery.fancybox.min.js',
    // src + '/libs/baron/baron.js',
    // src + '/libs/scrollreveal/scrollreveal.min.js',
    src + '/libs/gsap/TweenMax.min.js',
    src + '/libs/gsap/MorphSVGPlugin.min.js',
    src + '/libs/inputmask/jquery.inputmask.bundle.min.js'
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest( dist + '/app' ))
  .pipe(connect.reload());
});



// *********************************
// --------Compile sass
// *********************************

gulp.task('sass', () => {
  return gulp.src( src + '/main.scss' )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: '> 0.1%'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest( dist + '/app' ))
    .pipe(connect.reload());
});



// *********************************
// -------Compile pug files
// *********************************

gulp.task('pug', () => {
  return gulp.src('src/templates/*.pug')
    .pipe(pug({ pretty: true }))
    .pipe(gulp.dest('dist/html'));
});

gulp.task('pug-watch', () => {
	// Shows that run "watch" mode
	global.watch = true;

	return gulp.watch('src/**/*.pug', gulp.series('pug-templates', 'html'))
		.on('all', (event, filepath) => {
			global.emittyChangedFile = filepath;
		});
});

gulp.task('pug-templates', () =>
	new Promise((resolve, reject) => {
		emitty.scan(global.changedStyleFile).then(() => {
			gulp.src('src/templates/*.pug')
				.pipe(gulpif(global.watch, emitty.filter(global.emittyChangedFile)))
				.pipe(pug({ pretty: true }))
				.pipe(gulp.dest('dist/html'))
				.on('end', resolve)
				.on('error', reject);
		});
	})
);



// *********************************
// ----Update html in livereload
// *********************************

gulp.task('html', () => {
  return gulp.src(dist + '/html/*.html')
    .pipe(connect.reload());
});



// *********************************
// ----------Build files
// *********************************

gulp.task('build', gulp.parallel('sass', 'js:vendor', 'js:main', 'pug', 'images'));
gulp.task('clean-and-build', gulp.series('clean', 'build'));



// *********************************
// ---------Watch tasks
// *********************************

gulp.task('watch:scss', () => {
  gulp.watch( src + '/**/*.scss', gulp.series('sass'));
});

gulp.task('watch:vendor', () => {
  gulp.watch( [src + '/libs/*.js'], gulp.series('js:vendor'));
});

gulp.task('watch:js', () => {
  gulp.watch( [src + '/**/*.js', '!' + src + '/libs/*.js'], gulp.series('js:main'));
});



// *********************************
// ---------Watch files
// *********************************

gulp.task('watch', gulp.parallel(
  // 'watch:html',
  'watch:scss',
  'watch:vendor',
  'watch:js',
  'pug-watch'
));



// *********************************
// ----------Dev server
// *********************************

gulp.task('server', () => {
  connect.server({
    livereload: true
  });
});



// *********************************
// ----------Default task
// *********************************

gulp.task('default', gulp.parallel('server', 'build', 'watch'));
