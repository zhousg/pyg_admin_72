<template>
  <div class="params_container">
    <my-bread :list="['商品管理', '分类参数']"></my-bread>
    <el-card class="box-card">
      <el-alert
        title="注意：只有第三级分类才能设置参数。"
        type="warning"
        show-icon
      >
      </el-alert>
      <!-- label 级联 -->
      <el-form label-width="120px">
        <el-form-item label="商品分类：">
          <el-cascader
            v-model="selectedCateArr"
            clearable
            :options="cascaderOptions"
            :props="cascaderProps"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
      </el-form>
      <!-- tab切换组件  标签页组件 -->
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button
            type="success"
            @click="openAddDialog()"
            :disabled="disabled"
            >添加动态参数</el-button
          >
          <el-table :data="manyAttrs">
            <el-table-column type="expand">
              <template slot-scope="scope">
                <!-- 渲染的位置 scope.row.attr_vals 是数组-->
                <el-tag
                  closable
                  :key="item.attr_id"
                  v-for="item in scope.row.attr_vals"
                  >{{ item }}</el-tag
                >
                <el-input
                  v-if="!scope.row.tagVisiable"
                  :ref="'add_input_' + scope.row.attr_id"
                  size="small"
                  class="add_input"
                  @blur="addAttrVals(scope.row)"
                ></el-input>
                <el-tag
                  v-if="scope.row.tagVisiable"
                  :disable-transitions="true"
                  class="add_btn"
                  @click="addTag(scope.row)"
                  >+添加tag</el-tag
                >
              </template>
            </el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column width="200" label="操作">
              <template slot-scope="scope">
                <el-button circle icon="el-icon-edit"></el-button>
                <el-button
                  circle
                  icon="el-icon-delete"
                  @click="delParams(scope.row.attr_id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态参数" name="only">
          <el-button
            type="success"
            @click="openAddDialog()"
            :disabled="disabled"
            >添加静态参数</el-button
          >
          <el-table :data="onlyAttrs">
            <el-table-column type="index"></el-table-column>
            <el-table-column
              label="属性名称"
              prop="attr_name"
            ></el-table-column>
            <el-table-column label="属性值">
              <template slot-scope="scope">
                <el-tag :style="{ width: '200px' }">{{
                  scope.row.attr_vals
                }}</el-tag>
              </template>
            </el-table-column>
            <el-table-column width="200" label="操作">
              <template slot-scope="scope">
                <el-button circle icon="el-icon-edit"></el-button>
                <el-button
                  circle
                  @click="delParams(scope.row.attr_id)"
                  icon="el-icon-delete"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog
      :title="activeName === 'many' ? '添加动态参数' : '添加静态参数'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        ref="form"
        :rules="rules"
        label-width="80px"
        autocomplete="off"
        :model="form"
      >
        <el-form-item label="参数名称" prop="attr_name">
          <el-input v-model="form.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import mixin from "./Params-Mixin";
export default {
  mixins: [mixin]
};
</script>

<style scoped>
.el-form {
  margin-top: 20px;
}
.el-tag {
  margin-right: 10px;
}
.add_btn {
  width: 80px;
}
.add_input {
  width: 80px;
}
</style>
