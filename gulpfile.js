function defaultTask(cb) {
  // place code for your default task here
  
  gulp.task("sprites", function () {
    // Hack: Avoid require-cache
    delete require.cache[require.resolve("../resources/images.js")];
    var config = require("./resources/images.js");
  
    var pixiPacker = new PixiPacker(
        config,
        path.resolve(__dirname, "resources"),
        path.resolve(__dirname, "static/build/resources/images"),
        path.resolve(__dirname, path.join(process.env.HOME || process.env.USERPROFILE, ".pixi-packer-tmp"))
    );
  
    pixiPacker.log = {
        error: _.compose(gutil.log, util.format),
        info: _.compose(gutil.log, util.format),
        warn: _.compose(gutil.log, util.format)
    };
  
    return pixiPacker.process();
  });  
  
  
  
  cb();
}

exports.default = defaultTask

