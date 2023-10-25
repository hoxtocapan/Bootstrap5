const { src, dest, watch, series } =require ('gulp');
const imagemin = require('gulp-imagemin');

//Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

//Imagenes
const  imgemin = require('gulp-imagemin');


function css ( done ) {

    src('src/scss/**/*.scss') //Indentificar el archivo principal
        .pipe( sass() ) //Compilar SASS
        .pipe( dest('build/css')) //Exportarlo o guardarlo en una ubicacion

    done(); 
}

function cssbuild ( done ) {
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe(purgecss({
            content:['index.html']
        }))
        .pipe( dest('build/css'))

    done();
}



function dev() {
    watch('src/scss/**/*.scss', css)
}

function imagenes( done ) {
    src('src/img/**/*')
    .pipe( imagemin({ optimizationLevel: 3}))
    .pipe( dest('build/img'))

    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;

exports.default = series( imagenes, css, dev);
exports.build = series(cssbuild);

