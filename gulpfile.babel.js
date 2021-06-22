import { src, dest, watch, series, parallel } from "gulp";
import yargs from "yargs";
import sass from "gulp-sass";
import cleanCss from "gulp-clean-css";
import gulpif from "gulp-if";
import postcss from "gulp-postcss";
import sourcemaps from "gulp-sourcemaps";
import del from "del";
import info from "./package.json";
import cssnano from "cssnano";
import Fiber from "fibers";
import scrape from 'website-scraper';
import purgecss from 'gulp-purgecss';
import safelist from './static/src/purgecss.safelist'

const PRODUCTION = yargs.argv.prod;
sass.compiler = require('sass');

export const extractHtml = (c) => {
  return scrape({
    urls: [`${info.link}`],
    directory: 'static/gulpdist/extracted',
    recursive: true,
    maxRecursiveDepth: 2,
    sources: [
      {}
    ]
  }, c);
};

export const styles = () => {
  return src(["static/src/scss/bundle.scss", "static/src/scss/bundle-rtl.scss"])
    .pipe(gulpif(!PRODUCTION, sourcemaps.init()))
    .pipe(sass({ fiber: Fiber }).on("error", sass.logError))
    .pipe(gulpif(PRODUCTION, cleanCss({ level: 0 })))
    .pipe(gulpif(PRODUCTION, postcss([cssnano({ preset: 'advanced' })])))
    .pipe(gulpif(!PRODUCTION, sourcemaps.write()))
    .pipe(dest("static/gulpdist/css"));
};

export const stylePurge = () => {
  return src(['static/gulpdist/css/bundle.css', 'static/gulpdist/css/bundle-rtl.css'])
    .pipe(gulpif(PRODUCTION, purgecss({
      content: ['static/gulpdist/extracted/**/*.html', 'static/gulpdist/js/**/*.js'],
      safelist: {
        standard: [...safelist.whitelist],
        deep: [...safelist.whitelistPatterns]
      }
    })))
    .pipe(dest("static/gulpdist/css"))
}

export const copy = () => {
  return src([
    "static/src/**/*",
    "!static/src/{images,js,scss,html}",
    "!static/src/{images,js,scss,html}/**/*",
  ]).pipe(dest("static/gulpdist"));
};

export const clean = () => del(["static/gulpdist"]);
export const extractClean = () => del(["static/gulpdist/extracted"]);

export const watchForChanges = () => {
  watch("static/src/scss/**/*.scss", styles);
  watch(
    ["static/src/**/*", "!src/{images,js,scss}", "!static/src/{images,js,scss}/**/*"],
    copy
  );
};

export const dev = series(
  clean,
  parallel(styles, copy),
  watchForChanges
);
export const build = series(
  clean,
  extractHtml,
  parallel(styles, copy),
  stylePurge,
  extractClean,
);
export default dev;
