// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!

const postcss = require('rollup-plugin-postcss');

module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    config.plugins.push(
      postcss({
        inject: true,
        extract: !!options.writeMeta,
        modules: true, // 使用css modules
        // namedExport: true, // 类名导出
        camelCase: true, // 支持驼峰
        sass: true, // 是否使用sass
        // less:true,
        // autoModules:true,
        // namedExports(name) {
        //   // Maybe you simply want to convert dash to underscore
        //   return name.replace(/-/g, '_')
        // }
      })
    );

    return config; // always return a config.
  },
};
