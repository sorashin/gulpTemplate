var gulp = require("gulp");

//sass compiler
var sass = require("gulp-sass");

gulp.task("sass", function(){
	gulp.src("sass/**/*.scss")
		.pipe(sass())
		.pipe(gulp.dest("./css"));
}
});

//autpoprefixer
var autoprefixer = require("gulp-autoprefixer");

gulp.task("sass", function(){
	gulp.src("sass/**/*.scss")
	.pipe(sass())
	.pipe(autoprefixer())
	.pipe(gulp.dest("./css"));
});

//frontnote
var frontnote = require("gulp-frontnote");

gulp.task("sass", function(){
	gulp.src("sass/**/*.scss")
		.pipe(frontnote({
			css:'../css/style.css'
		}))
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("./css"));
});

//gulp uglify
var uglify = require("gulp-uglify");

gulp.task("js", function(){
	gulp.src(["js/**/*.js", "!js/min/**/+.js"])
		.pipe(uglify())
		.pipe(gulp.dest("./js/min"));
});

gulp.task("default", function(){
	gulp.watch(["js/**/*.js","!js/min/**/*.js"], ["js"]);
	gulp.watch(["sass/**/*.scss"],["sass"]);
})

//browser sync
var browser = require("browser-sync");
 
gulp.task("server", function() {
    browser({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(uglify())
        .pipe(gulp.dest("./js/min"))
        .pipe(browser.reload({stream:true}))
});
 
gulp.task("sass", function() {
    gulp.src("sass/**/*.scss")
        .pipe(frontnote())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});
 
gulp.task("default",['server'], function() {
    gulp.watch(["js/**/*.js","!js/min/**/*.js"],["js"]);
    gulp.watch(["sass/**/*.scss"],["sass"]);
});

//plumber
var plumber = require("gulp-plumber");
 
gulp.task("js", function() {
    gulp.src(["js/**/*.js","!js/min/**/*.js"])
        .pipe(plumber())
        .pipe(frontnote({
            css: '../css/style.css'
          }))
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}));
});
 
gulp.task("sass", function() {
    gulp.src("sass/**/*scss")
        .pipe(plumber())
        .pipe(frontnote())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(gulp.dest("./css"))
        .pipe(browser.reload({stream:true}))
});