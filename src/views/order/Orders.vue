<template>
  <div class="orders_container">
    <my-bread :list="['订单管理', '订单列表']"></my-bread>
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
      </el-row>
      <el-table :data="ordersList">
        <el-table-column type="index"></el-table-column>
        <el-table-column
          label="订单编号"
          width="250"
          prop="order_number"
        ></el-table-column>
        <el-table-column label="订单金额" prop="order_price"></el-table-column>
        <el-table-column label="是否付款">
          <template slot-scope="scope">
            {{ scope.row.pay_status === "1" ? "已付款" : "未付款" }}
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.create_time | ft }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <el-button icon="el-icon-location" circle=""></el-button>
        </el-table-column>
      </el-table>
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
import mixin from "./Orders-Mixin";
export default {
  mixins: [mixin]
};
</script>

<style scoped></style>
