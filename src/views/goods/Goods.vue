<template>
  <div class="goods_container">
    <my-bread :list="['商品管理', '商品列表']"></my-bread>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model="reqParams.query" placeholder="请输入内容">
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="search()"
            ></el-button>
          </el-input>
        </el-col>
        <el-col :span="18">
          <el-button type="primary" @click="toAdd()">添加商品</el-button>
        </el-col>
      </el-row>
      <!-- 表格 -->
      <el-table :data="goodsList">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          width="400"
          label="商品名称"
          prop="goods_name"
        ></el-table-column>
        <el-table-column label="价格" prop="goods_price"></el-table-column>
        <el-table-column label="重量" prop="goods_weight"></el-table-column>
        <el-table-column width="200" label="创建时间">
          <template slot-scope="scope">{{ scope.row.add_time | ft }}</template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button icon="el-icon-edit" circle=""></el-button>
            <el-button
              icon="el-icon-delete"
              @click="delGoods(scope.row.goods_id)"
              circle=""
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
  </div>
</template>

<script>
import mixin from "./Goods-Mixin";
export default {
  mixins: [mixin]
};
</script>

<style scoped></style>
