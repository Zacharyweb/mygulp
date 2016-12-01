
'use strict';
//载入Gulp模块、所需要的插件
var gulp = require('gulp');
//html压缩插件
var htmlmin = require('gulp-htmlmin');
//css压缩插件
var cssnano = require('gulp-cssnano');
//less编译插件
var less = require('gulp-less');
//js压缩混淆插件
var uglify = require('gulp-uglify');
//文件合并插件
var concat = require('gulp-concat');
//开启本地服务器插件
var browserSync = require('browser-sync').create();

//压缩html文件，去除注释
gulp.task('sethtml',function(){
	gulp.src('./*.html')
	.pipe(htmlmin({
		collapseWhitespace: true,
		removeComments: true
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

//压缩合并css文件
gulp.task('setcss',function(){
	gulp.src('./css/*.css')
	.pipe(cssnano())
	.pipe(concat('gulpcss.css'))
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

//解析less并输出css文件
gulp.task('setless',function(){
	//'_'开头命名的less文件不会被编译，建议导包用的less文件命名以'_'开头
	gulp.src(['./less/*.less','!./less/_*.less'])
	.pipe(less())
	.pipe(cssnano())
	.pipe(gulp.dest('dist/css'))
	.pipe(browserSync.reload({
		stream: true
	}));

});

//合并压缩混淆js文件
gulp.task('setjs',function(){
	gulp.src('./js/*.js')
	.pipe(concat('gulpjs.js'))
	.pipe(uglify())
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

//复制图片
gulp.task('setimg',function(){
	gulp.src('./img/*.*')
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.reload({
		stream: true
	}));
});

//开启同步浏览器并进行同步监视
gulp.task('gbrowser',function(){
	browserSync.init({
		server: {
			baseDir: "./dist"
		}
	});
	gulp.watch('./*.html',['sethtml']);
	gulp.watch('./css/*.css',['setcss'])
	gulp.watch('./less/*.less',['setless']);
	gulp.watch('./js/*.js',['setjs']);
	gulp.watch('./img/*.*',['setimg']);
});
