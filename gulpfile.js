const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    useref = require('gulp-useref'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    minifyCss = require('gulp-clean-css'),
    imagemin = require('gulp-imagemin'),
    webp = require('gulp-webp'),
    gzip = require('gulp-gzip'),
    changed = require('gulp-changed'),
    del = require('del'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence')
    iconfont = require('gulp-iconfont'),
    iconfontCss = require('gulp-iconfont-css'),
    fontmin = require('gulp-fontmin');

//== DEV tasks
//

// Serve files from the app/ folder of this project
gulp.task('browserSync-dev', () => {
    browserSync.init({
        server: "app"
    });
});

// Reload task
gulp.task('bs-reload', () => {
    browserSync.reload();
});

//Converts SCSS files to CSS with autoprefixing
gulp.task('sass', () => {

    const sassInput = 'app/scss/main.scss';
    const cssOutput = 'app/css';

    return gulp.src(sassInput)
        .pipe(sourcemaps.init())
        .pipe(changed(cssOutput))
    	.pipe(plumber())
        .pipe(sass())
        .pipe(autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(cssOutput))
        
        /* Reload the browser CSS after every change */
        .pipe(reload({stream:true}));
});

gulp.task('json', () => {
    gulp.src('app/json/*.json')
        .pipe(gulp.dest('dist/json'));
});

gulp.task('watch', ['browserSync-dev','sass'], () => {
    /* Watch scss, run the sass task on change. */
    gulp.watch('app/scss/**/*.scss', ['sass'])
    .on('change', function(event){
        console.log('Le fichier SASS ' + event.path + ' a ete modifie')
    });
     /* Watch JS files, run the scripts task on change. */
    gulp.watch('app/scripts/*.js', ['bs-reload'])
    .on('change', function(event){
        console.log('Le fichier JS ' + event.path + ' a ete modifie')
    });
    /* Watch .html files, run the bs-reload task on change. */
    gulp.watch('app/**/*.html', ['bs-reload'])
    .on('change', function(event){
        console.log('Le fichier HTML ' + event.path + ' a ete modifie')
    });
});

//Run DevServer with liveReload
gulp.task('run:dev' , (callback) => {
    runSequence(
        ['sass','browserSync-dev','watch'],
        callback)
});

//== OPTIMIZATION & BUILD tasks
//

// Combines JS & CSS files by file type
gulp.task('useref', () => {
    gulp.src('app/**/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulp.dest('dist'));
});

//Retrieves JSON file without treatment
gulp.task('json', () => {
    gulp.src('app/**/*.json')
    .pipe(gulp.dest('dist'));
});

//Optimizes images
gulp.task('imgOptim', () => {

    const imgInput = 'app/img/**/*';
    const imgOutput = 'dist/img';

    return gulp.src(imgInput)
        .pipe(changed(imgOutput))
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: true}]})
        ]))
        .pipe(gulp.dest(imgOutput));
});

//Creates icon font
gulp.task('iconfont', () => {

let runTimestamp = Math.round(Date.now()/1000);
const fontName = 'altimaIcons';

return gulp.src('app/img/icons/*.svg')
    .pipe(iconfontCss({
        fontName: fontName,
        targetPath: '../../scss/partials/_icons.scss', //Relative to dist
        fontPath: '../../css/fonts/' //Relative to targetPath
        }))
    .pipe(iconfont({
            fontName: fontName,
            prependUnicode: true,
            formats: ['ttf', 'eot', 'woff','woff2'],
            timestamp: runTimestamp,
            centerHorizontally: true,
            normalize: true,
            fontHeight: 1001
    }))
    .on('glyphs', function(glyphs, options) {
        // CSS templating, e.g. 
    })
    .pipe(gulp.dest('app/css/fonts'));
})

// Minifies all fonts
gulp.task('fontsmin',['iconfont'], () => {
    return gulp.src('app/css/fonts/**/*.{ttf,eot, woff,woff2}')
        .pipe(changed('dist/css/fonts'))
        .pipe(fontmin())
        .pipe(gulp.dest('dist/css/fonts'));
})

//Converts images to WebP
gulp.task('webp', ['imgOptim'], () => {
    return gulp.src('app/img/*.{jpg,jpeg,png}')
        .pipe(webp())
        .pipe(gulp.dest('dist/img'));
});

//Gzip text files
gulp.task('gzip', () => {
    return gulp.src('dist/**/*.{html,xml,json,css,js}')
        .pipe(gzip())
        .pipe(gulp.dest('dist/'));
});

//Clean dist folder
gulp.task('clean', () => {
    return del('dist');
});

//Clean dist folder except img folder (imgOptim task could be long if lot of images)
gulp.task('clean:dist', (callback) => {
    return del(['dist/**/*', '!dist/img', '!dist/img/**/*'], callback)
});

//== PROD tasks
//

// Serve files from the dist/ folder of this project
gulp.task('browserSync-prod', () => {
    browserSync.init({
        server: "dist"
    });
});

//Build production folder & Run ProdServer
gulp.task('run:prod' , (callback) => {
    runSequence('clean:dist',
        ['sass', 'json', 'useref', 'imgOptim','iconfont'],
        ['fontsmin','webp','gzip'],
        'browserSync-prod',
        callback)
});

gulp.task('default', ['browserSync-prod'], () => {
    
});