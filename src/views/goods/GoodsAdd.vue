<template>
  <div class="goodsadd_container">
    <my-bread :list="['商品管理', '商品添加']"></my-bread>
    <el-card class="box-card">
      <el-alert title="请按照步骤录入商品信息" type="info" center show-icon>
      </el-alert>
      <!-- :active  当前激活的步骤（完成的步骤）-->
      <el-steps :active="1" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <!-- tabs -->
      <el-tabs tab-position="left" style="height: 200px;">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import mixin from "./GoodsAdd-Mixin";
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.el-steps {
  margin-top: 15px;
}
.el-tabs {
  margin-top: 25px;
}
</style>
