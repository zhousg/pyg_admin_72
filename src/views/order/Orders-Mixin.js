export default {
  data() {
    return {
      // 列表数据
      ordersList: [],
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
    search() {
      this.reqParams.pagenum = 1;
      this.getData();
    },
    async getData() {
      // 获取商品列表属性
      const {
        data: { data, meta }
      } = await this.$http.get("orders", {
        params: this.reqParams
      });
      if (meta.status !== 200)
        return this.$message.error("获取订单列表数据失败");
      // data {商品列表数据，商品的分页数据}
      this.ordersList = data.goods;
      // 赋值总页数
      this.total = Math.ceil(data.total / this.reqParams.pagesize);
    },
    // 分页函数
    pager(newPage) {
      this.reqParams.pagenum = newPage;
      this.getData();
    }
  }
};
