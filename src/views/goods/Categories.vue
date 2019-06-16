<template>
  <div class="category_contianer">
    <my-bread :list="['商品管理', '商品分类']"></my-bread>
    <el-card class="box-card">
      <el-button type="primary" @click="openAddDialog()">添加分类</el-button>
      <!-- 树状表格 -->
      <el-table border style="width:100%" row-key="cat_id" :data="categoryList">
        <el-table-column prop="cat_name" label="分类名称"></el-table-column>
        <el-table-column label="是否有效">
          <template slot-scope="scope">
            <i
              v-if="!scope.row.cat_deleted"
              class="el-icon-success"
              style="color:green"
            ></i>
            <i
              v-if="scope.row.cat_deleted"
              class="el-icon-error"
              style="color:red"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="分类等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.cat_level === 0">一级分类</el-tag>
            <el-tag type="success" v-if="scope.row.cat_level === 1"
              >二级分类</el-tag
            >
            <el-tag type="warning" v-if="scope.row.cat_level === 2"
              >三级分类</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-edit"
              @click="openEditDialog(scope.row)"
              circle
            ></el-button>
            <el-button
              @click="delCate(scope.row.cat_id)"
              icon="el-icon-delete"
              circle
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :current-page="reqParams.pagenum"
        :page-count="total"
        @current-change="pager"
      >
      </el-pagination>
    </el-card>
    <!-- 添加分类对话框 -->
    <el-dialog title="添加分类" :visible.sync="addDialogFormVisible">
      <el-form
        :rules="rules"
        :model="addForm"
        label-width="80px"
        autocomplete="off"
        ref="addForm"
      >
        <el-form-item label="父级分类">
          <el-cascader
            v-model="selectedCateArr"
            :options="cascaderOptions"
            clearable
            :props="{
              expandTrigger: 'hover',
              value: 'cat_id',
              label: 'cat_name',
              checkStrictly: true
            }"
            @change="handleChange"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCate()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑分类对话框 -->
    <el-dialog title="编辑分类" :visible.sync="editDialogFormVisible">
      <el-form
        :rules="rules"
        :model="editForm"
        label-width="80px"
        autocomplete="off"
        ref="editForm"
      >
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="editForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editCate()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import mixin from "./Categories-Mixin";
export default {
  mixins: [mixin]
};
</script>

<style scoped></style>
