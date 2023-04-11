import Vue from "vue";
import SvgIcon from "@/components/SvgIcon"; // svg component

// register globally
Vue.component("svg-icon", SvgIcon);

//导入当前目录下svg的所有svg图片 详细解释：https://blog.csdn.net/dangpugui/article/details/113863727
// require.context("./test", false, /.test.js$/);
// 这行代码就会去 test 文件夹（不包含子目录）下面的找所有文件名以 .test.js 结尾的文件能被 require 的文件。
// 更直白的说就是 我们可以通过正则匹配引入相应的文件模块。

const req = require.context("./svg", false, /\.svg$/);
const requireAll = (requireContext) =>
  requireContext.keys().map(requireContext);
requireAll(req);
