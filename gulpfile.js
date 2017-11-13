var fs      = require('fs');
var gulp    = require('gulp');
var gutil   = require('gulp-util');
var GulpSSH = require('gulp-ssh');

gulp.task('deploy', function() {
  var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: {
      host: 'favouroom.com',
      username: 'www-data',
      privateKey: fs.readFileSync(gutil.env.privateKey)
    }
  })

  return gulp.src('./public/**')
    .pipe(gulpSSH.dest('favouroom.com'))
})
