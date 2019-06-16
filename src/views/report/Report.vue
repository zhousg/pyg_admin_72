<template>
  <div class="report_container">
    <my-bread :list="['数据统计', '数据报表']"></my-bread>
    <el-card class="box-card">
      <div ref="wrapper" style="width: 800px;height:500px;"></div>
    </el-card>
  </div>
</template>

<script>
import mixin from "./Report-Mixin";
export default {
  mixins: [mixin]
};
</script>

<style scoped></style>
