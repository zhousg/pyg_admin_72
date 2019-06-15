export default {
  data() {
    const checkCat = (rule, value, callback) => {
      if (this.cascaderValues.length !== 3) {
        return callback(new Error("商品的分类必须选中三级分类"));
      }
      callback();
    };
    return {
      // 当前完成的步骤
      stepActive: 0,
      // 表单数据
      form: {
        goods_name: "",
        // 三级分类以逗号分隔 1,10,100
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: ""
      },
      // 定义校验规则
      rules: {
        goods_name: [
          { required: true, message: "商品名称必填", trigger: "blur" }
        ],
        goods_cat: [
          {
            validator: checkCat,
            trigger: "change"
          }
        ],
        goods_price: [
          { required: true, message: "商品价格必填", trigger: "blur" }
        ],
        goods_number: [
          { required: true, message: "商品数量必填", trigger: "blur" }
        ],
        goods_weight: [
          { required: true, message: "商品重量必填", trigger: "blur" }
        ]
      },
      // 级联数据
      cascaderValues: [],
      cascaderOptions: []
    };
  },
  created() {
    // 获取组件初始化需要的数据  其中级联的数据
    this.getData();
  },
  methods: {
    // tab切换事件  点击tab的事件
    changeTab(tab) {
      // tab 是当前选中的tab的实例对象   包含信息
      // tab.index 当前tab的标识  索引类型是字符串
      // "0" "1" "2" "3" "4" 对应五个tab
      // +"100" 隐式转换
      this.stepActive = +tab.index;
    },
    // 级联选择事件
    cascaderChange() {},
    // 获取级联数据
    async getData() {
      const {
        data: { data, meta }
      } = await this.$http.get("categories");
      if (meta.status !== 200) return this.$message.error("获取级联信息失败");
      this.cascaderOptions = data;
    }
  }
};
