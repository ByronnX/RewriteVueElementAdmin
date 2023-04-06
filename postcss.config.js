/*
  vue-loader 的 postcss 会默认读取这个文件的里的配置项，所以在这里直接改配置文件就可以了。配置和 postcss是一样的。
*/
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
