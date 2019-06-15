<template>
  <div class="goodsadd_container">
    <my-bread :list="['商品管理', '商品添加']"></my-bread>
    <el-card class="box-card">
      <el-alert title="请按照步骤录入商品信息" type="info" center show-icon>
      </el-alert>
      <!-- :active  当前激活的步骤（完成的步骤）-->
      <el-steps :active="stepActive" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
      </el-steps>
      <!-- tabs -->
      <el-tabs @tab-click="changeTab" tab-position="left">
        <el-tab-pane label="基本信息">
          <el-form
            style="margin-left:50px"
            ref="form"
            :model="form"
            :rules="rules"
            label-width="80px"
            autocomplete="off"
          >
            <el-form-item label="商品名称" prop="goods_name">
              <el-input style="width:600px"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                style="width:300px"
                v-model="cascaderValues"
                :options="cascaderOptions"
                :props="{
                  expandTrigger: 'hover',
                  label: 'cat_name',
                  value: 'cat_id'
                }"
                @change="cascaderChange"
              ></el-cascader>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input style="width:300px"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input style="width:300px"></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
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
