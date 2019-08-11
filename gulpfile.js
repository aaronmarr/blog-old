const gulp = require("gulp")

gulp.task("css", () => (
  gulp
    .src("./css/*.css")
    .pipe(require("gulp-postcss")([ 
      require('postcss-preset-env')(),
      require('postcss-nesting')(),
      require('postcss-custom-media')(),
      require('postcss-custom-properties')()
    ]))
    .pipe(gulp.dest("./build"))
))

gulp.task("watch", function() {
  gulp.watch("./css/*", gulp.series("css"))
})