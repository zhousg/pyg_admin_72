export default {
  data() {
    return {
      // 商品列表数据
      goodsList: [],
      // 传参数据
      reqParams: {
        query: "",
        pagenum: 1,
        pagesize: 5
      },
      // 总页数
      total: 0
    };
  },
  created() {
    this.getData();
  },
  methods: {
    async getData() {
      // 获取商品列表属性
      const {
        data: { data, meta }
      } = await this.$http.get("goods", {
        params: this.reqParams
      });
      if (meta.status !== 200)
        return this.$message.error("获取商品列表数据失败");
      // data {商品列表数据，商品的分页数据}
      this.goodsList = data.goods;
      // 赋值总页数
      this.total = Math.ceil(data.total / this.reqParams.pagesize);
    },
    // 分页函数
    pager(newPage) {
      this.reqParams.pagenum = newPage;
      this.getData();
    },
    // 搜索函数
    search() {
      // 绑定 reqParams.query 数据给 输入框
      this.reqParams.pagenum = 1;
      this.getData();
    },
    // 删除商品
    delGoods(id) {
      this.$confirm("亲，是否删除该商品?", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 删除请求
          const {
            data: { meta }
          } = await this.$http.delete(`goods/${id}`);
          if (meta.status !== 200) return this.$message.error("删除商品失败");
          this.getData();
          this.$message.success("删除商品成功");
        })
        .catch(() => null);
    },
    // 去添加
    toAdd() {
      this.$router.push("/goods/add");
    }
  }
};
