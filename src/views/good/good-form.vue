<template>
  <div class="good-form">
    <el-page-header @back="$router.back()" content="添加商品"> </el-page-header>

    <!-- 表单 -->
    <!-- ref="form"在一个组件上写ref 目的就是为了获取组件实例 -->
    <!-- :model="form" 数据绑定 -->
    <!-- :rules="rules" 指定校验规则 -->
    <el-form ref="form" :model="ruleForm" :rules="rules" label-width="0px;">
      <!-- el-form-item是表单中的每一项 -->
      <!-- prop="name" 校验规则 -->
      <el-form-item label="商品名称" prop="name">
        <!-- v-model="ruleForm.name"输入框和ruleForm中的name进行双向绑定 -->
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="商品描述" prop="desc">
        <el-input type="texterea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item label="商品分类" prop="desc">
        <cate-select></cate-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import CateSelect from "./components/CateSelect1.vue"
export default {
  name: "goodForm",
  comments: {
    CateSelect,
  },
  data() {
    return {
      ruleForm: {
        name: "", //商品名称
      },
      rules: {
        name: [
          //  require:true  表示这个输入框是必填项
          //  message:'请输入活动名称'  提示
          //  trigger:'blur'  当失去焦点时提示
          { required: true, message: "请输入商品名称", trigger: "blur" },
          {
            pattern: /[\u4e00-\u9fa5]{4,8}/,
            message: "商品名称要求是 4 - 8 个中文",
            trigger: "blur",
          },
        ],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" },
        ],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change",
          },
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change",
          },
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change",
          },
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" },
        ],
        desc: [
          { required: true, message: "请填写商品介绍", trigger: "blur" },
          {
            min: 20,
            max: 30,
            message: "商品名称要求20 ~ 30个字符",
            trigger: "blur",
          },
        ],
      },
    };
  },
};
</script>

<style lang="scss">
.good-form {
  padding: 20px;
  box-sizing: border-box;
}
</style>
