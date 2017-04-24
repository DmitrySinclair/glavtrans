var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var imagemin = require('gulp-imagemin');
var spritesmith = require('gulp.spritesmith');
var buffer = require('vinyl-buffer');
var merge = require('merge-stream');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var connect = require('gulp-connect');
var ftp = require( 'vinyl-ftp' );
var clean = require('gulp-clean');

var pug = require('gulp-pug');
var gulpif = require('gulp-if');
var emitty = require('emitty').setup('src', 'pug', {
  makeVinylFile: true
});

var src = 'src';
var dist = 'dist';


// *********************************
// ---------Clean
// *********************************

gulp.task('clean', function () {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});



// *********************************
// ---------Build sprite
// *********************************

gulp.task('sprite:clean', function() {
  return del([
    dist + '/img/sprite.*',
    src + '/scss/_sprite.scss'
  ]);
});

gulp.task('sprite', gulp.series('sprite:clean') , function() {
  var spriteData = gulp.src( src + '/img/sprite/*.png' )
    .pipe(spritesmith({
      imgName: 'sprite.png',
      imgPath: '../img/sprite/sprite.png',
      cssName: '_sprite.scss',
      cssFormat: 'scss'
    }));

  var imgStream = spriteData.img
    .pipe(buffer())
    .pipe(imagemin())
    .pipe(gulp.dest( dist + '/img/sprite' ));

  var cssStream = spriteData.css
    .pipe(gulp.dest( src + '/scss' ));

  return merge(imgStream, cssStream);
});



// *********************************
// --------Compress images
// *********************************

gulp.task('images', function() {
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

gulp.task('js:vendor', function() {
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
  ])
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest( dist + '/app' ))
  .pipe(connect.reload());
});



gulp.task('js:main', function() {
  return gulp.src([
    src + '/components/header/header.js',
    src + '/components/slider/slider.js',
    src + '/components/to-top/to-top.js',
    src + '/components/button/button.js',
    src + '/components/path/path.js',
  ])
  .pipe(concat('main.js'))
  // .pipe(uglify())
  .pipe(gulp.dest( dist + '/app' ))
  .pipe(connect.reload());
});



// *********************************
// --------Compile sass
// *********************************

gulp.task('sass', function() {
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

gulp.task('html', function () {
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
  gulp.watch( src + '/libs/*.js', gulp.series('js:vendor'));
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

gulp.task('server', function() {
  connect.server({
    livereload: true
  });
});



// *********************************
// ----------Default task
// *********************************

gulp.task('default', gulp.parallel('server', 'clean-and-build', 'watch'));
