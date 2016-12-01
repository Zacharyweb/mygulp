# 简单的自用gulp工作流

## gulp说明

gulp-用自动化构建工具增强你的工作流程的工具。[官网](http://gulpjs.com/)  [中文网](http://www.gulpjs.com.cn/)

## 本款gulp工作流的使用

### 使用须知

#### 本工作流使用前需要放到根目录下，其默认获取以下内容进行操作：   
- 根目录文件中的html文件   
- 根目录css文件夹里面的css文件   
- 根目录less文件夹里面的less文件   
- 根目录js文件夹里面的js文件   
- 根目录img文件夹里面的图片文件   

#### 操作完成后根目录下会自动生成一个dist文件夹，输出的文件在该文件夹里面。
#### 如需要操作其它文件，需要自行修改gulpfile.js文件中的文件获取路径。

### 使用方法

* 压缩html文件，并去除里面的注释
```bash
 $ gulp sethtml
```

* 压缩合并css文件
```bash
 $ gulp setcss
```

* 编译less并输出css文件
```bash
 $ gulp setless
```

* 合并压缩混淆js文件
```bash
 $ gulp setjs
```

* img复制
```bash
 $ gulp setimg
```

* 开启同步浏览器并进行同步监视
```bash
 $ gulp gbrowser
```

# gulp使用基础

## 1.全局安装gulp:

```bash
  $ npm install gulp -g
```

## 2.项目根目录下：

* 创建 package.json文件
```bash
  $ npm init
```

* 设置gulp包为开发阶段依赖
```bash
  $ npm install gulp --save-dev
```

* 创建gulpfile.js文件

## 3.在gulpgile.js里注册任务

  * 注册任务：`gulp.task('任务名'，执行的任务fn) `
  * 输出文件：`gulp.dest('文件输出路径')`
  * 同步文件变化：`gulp.watch('监视的文件路径'，[监视的文件变化时执行的任务,数组格式可多个])`
  * 链式编程`.pipe() `
  * 例：拷贝index.html文件到dist文件夹
  ```javascript
  gulp.src('index.html')
  .pipe(gulp.dest('../dist/'));
  ```

## 4.任务编写完成后执行

```bash
   $gulp 任务名
```

## 5.其他说明

  * 为了防止发生死循环,`gulp.watch()`不该写在其监视文件变化后调动执行的任务里，建议写在单独的任务里。
  * cmd运行 `gulp.watch()`所在的任务时，目标文件才处于被监视状态，该文件的变化会在其输出文件中同步。
  * gulp轻内核，没什么实质性功能，需要许多插件的安装，例：
  ```bash
  $ npm install gulp-less --save-dev
  ```
  ```javascript
  var less = require('gulp-less')
  ```

### 常用插件：
  - [`gulp-connect`](https://www.npmjs.com/package/gulp-connect) 创建本地服务器（推荐使用更强大的`browser-sync`包）   
  - [`gulp-minify-html`](https://www.npmjs.com/package/gulp-minify-html) 压缩html文件    
  - [`gulp-less`](https://www.npmjs.com/package/gulp-less) less编译输出css    
  - [`gulp-cssnano`](https://www.npmjs.com/package/gulp-cssnano) css压缩文件     
  - [`gulp-minify-css`](https://www.npmjs.com/package/gulp-minify-css) 同上，压缩css文件(不推荐使用)    
  - [`gulp-uglify`](https://www.npmjs.com/package/gulp-uglify) 最小化 js 文件    
  - [`gulp-imagemin`](https://www.npmjs.com/package/gulp-imagemin) 最小化图像   
  - [`gulp-concat`](https://www.npmjs.com/package/gulp-concat) 合并文件     
  - [`gulp-rename`](https://www.npmjs.com/package/gulp-rename) 重命名文件  

### 浏览器同步工具browser-sync使用 

  1.安装browser-sync包
  ```bash
  $ npm install browser-sync --save-dev
  ```

  2.在gulpgile.js中引入模块并注册任务
  ```javascript
  //引包
  var gulp = require('gulp');
  var browserSync = require('browser-sync').create();
  //注册任务
  gulp.task('serve',function(){
    browserSync.init({
      server: {
        baseDir: "./"
      }
    });
  });
  ```

  3.使用browser-sync,自动打开本地服务器，可实现多窗口同步滚动测试（注：cmd上出现的UI地址即为后台管理地址）。
  ```bash
  $ npm serve
  ```
 
  4.也可全局安装browser-sync，使用`$ browser-sync start`运行。但没有同步效果，需要同步要在html文件中加入提示的一段内容。