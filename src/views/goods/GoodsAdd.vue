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
      <el-tabs tab-position="left" :before-leave="beforeLeave">
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
              <el-input
                v-model="form.goods_name"
                style="width:600px"
              ></el-input>
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
              <el-input
                v-model="form.goods_price"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input
                v-model="form.goods_number"
                style="width:300px"
              ></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input
                v-model="form.goods_weight"
                style="width:300px"
              ></el-input>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品参数">
          <el-form style="margin-left:50px" label-width="80px">
            <el-form-item
              :key="item.attr_id"
              v-for="item in manyAttrs"
              :label="item.attr_name"
            >
              <el-tag
                :key="i"
                v-for="(tag, i) in item.attr_vals
                  ? item.attr_vals.split(',')
                  : []"
                >{{ tag }}</el-tag
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品属性">
          <el-form style="margin-left:50px" label-width="180px">
            <el-form-item
              :key="item.attr_id"
              v-for="item in onlyAttrs"
              :label="item.attr_name"
            >
              <el-tag style="width:200px">{{ item.attr_vals }}</el-tag>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="商品图片">
          <el-upload
            :action="uploadUrl"
            :headers="uploadHeaders"
            list-type="picture-card"
            :on-preview="previewImage"
            :on-remove="removeImage"
            :on-success="successImage"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="商品内容">
          <quill-editor v-model="form.goods_introduce"></quill-editor>
          <br />
          <el-button type="success" @click="saveGoods()">保存商品</el-button>
        </el-tab-pane>
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
.el-tag {
  margin-right: 10px;
}
</style>
