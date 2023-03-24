<template>
  <div class="good-list">
    <el-row>
      <el-col :span="24">
        <el-input placeholder="请输入内容" style="width: 135px"></el-input>
        <el-select v-model="value" placeholder="请选择">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
        <!-- <CateSelect></CateSelect> -->
        <el-date-picker v-model="value" type="daterange" range-separator="至" start-placeholder="开始日期"
          end-placeholder="结束日期">
        </el-date-picker>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="$router.push('/good/add')">添加</el-button>
        <el-button type="primary" icon="el-icon-download">导出</el-button>
        <el-checkbox style="margin-left: 20px">审核人</el-checkbox>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <!-- :data="list" 给表格指定数据源的 -->
    <el-table :data="list" style="width: 100%; margin-top=20px;" border>
      <el-table-column prop="id" label="序号" align="center">
        <!-- 这里是作用域插槽 ----父组件接受子组件传来的数据然后进行个性化展示 -->
        <template slot-scope="{ row, $index }">
          <div>{{ $index + 1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="商品" align="center" width="180">
        <!-- 这里是作用域插槽 ----父组件接受子组件传来的数据然后进行个性化展示 -->
        <template slot-scope="{ row, $index }">
          <div>{{ row.name }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center">
        <!-- 这里是作用域插槽 ----父组件接受子组件传来的数据然后进行个性化展示 -->
        <template slot-scope="{ row, $index }">
          <div>{{ `￥${row.price.toFixed(2)}` }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="cate" label="品类" align="center">
        <template slot-scope="{ row, $index }">
          <div>{{ row.cate }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="hot" label="是否热销" align="center">
        <template slot-scope="{ row, $index }">
          <div>{{ row.hot ? "是" : "否" }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="create_time" label="发布时间" align="center">
        <template slot-scope="{ row, $index }">
          <div>{{ row.create_time }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="check_status" label="商品状态" align="center">
        <template slot-scope="{ row, $index }">
          <div>{{ row.check_status ? "已上架" : "待审核" }}</div>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230">
        <template slot-scope="{ row, $index }">
          <el-button size="mini" type="primary">编辑</el-button>
          <el-button v-if="row.published" size="mini" type="primary">详情</el-button>
          <el-button v-else size="mini" type="success">审核</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4"
      :page-sizes="[2, 5, 10, 20]" :page-size="2" layout="total, sizes, prev, pager, next, jumper" :total="400"
      style="margin-top: 20px">
    </el-pagination>
  </div>
</template>

<script>
// import CateSelect from './components/CateSelect.vue';
export default {
  name: "goodList",
  components: {
    // CateSelect
  },
  props: [],
  data() {
    return {
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      list: [
        {
          id: 1,
          create_time: "2016-09-09",
          name: "小米手机",
          address: "上海市普陀区金沙江路151",
          price: 199,
          img: "",
          cate: "phone",
          hot: true,
          published: true,
          check_status: true,
        },
        {
          id: 2,
          create_time: "2011-09-09",
          name: "华为手机",
          address: "上海市普陀区金沙江路1511",
          price: 1990,
          img: "",
          cate: "phone",
          hot: true,
          published: false,
          check_status: false,
        },
      ],
    };
  },
};
</script>

<style lang="scss">
.good-list {
  padding: 20px;
  box-sizing: border-box;
}
</style>