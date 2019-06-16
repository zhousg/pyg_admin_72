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
        goods_weight: "",
        // 图片的信息 [{pic:'路径'},...]
        pics: []
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
      cascaderOptions: [],
      // 参数数据
      manyAttrs: [],
      onlyAttrs: [],
      // 上传相关数据
      uploadUrl: this.$http.defaults.baseURL + "upload",
      uploadHeaders: { Authorization: window.sessionStorage.getItem("token") },
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  created() {
    // 获取组件初始化需要的数据  其中级联的数据
    this.getData();
  },
  methods: {
    // 监听上传成功
    successImage(response) {
      // console.log(response);
      // 把上传成功的图片的地址追加到data中的form.pics数组中
      this.form.pics.push({ pic: response.data.tmp_path });
    },
    // 预览图片
    previewImage(file) {
      // 把对话框中的img的src属性  改成现在你预览的图片地址
      this.dialogImageUrl = file.response.data.url;
      this.dialogVisible = true;
    },
    // 删除图片
    removeImage(file) {
      // 当你删除图片的时候触发这个钩子函数
      // 去删除pics的数组数据中的一项  根据索引去删除
      // 如果你能知道你删除的是那张图片  你就能知道索引
      // 知道图片的地址  根据地址去pics查找  获取当前查到的数据的索引
      const url = file.response.data.tmp_path;
      const index = this.form.pics.findIndex(item => item.pic === url);
      this.form.pics.splice(index, 1);
    },
    // 删除图片
    // 离开任何一个tab选项的钩子函数
    // Function(activeName, oldActiveName) 告诉我们：函数有传参
    // activeName  now （当前选中的tab索引）  oldActiveName  old （之前选中的tab的索引）
    beforeLeave(now, old) {
      // 监听当前的old的值是0那么证明在离开第一个tab  old是string
      if (+old === 0) {
        // 的 return 也是 beforeLeave 的返回值
        // 在这个位置去返回一个 promise
        return new Promise((resolve, reject) => {
          // 在离开第一个tab  整体进行校验
          this.$refs.form.validate(valid => {
            if (valid) {
              // 成功  切换步骤条
              this.stepActive = +now;
              // 成功  获取参数数据
              this.getParamsData("many");
              this.getParamsData("only");
              resolve();
            } else {
              // 失败 阻止tab的切换
              // 注意：只有钩子函数的return false才好使
              // return false;
              reject();
            }
          });
        });
      } else {
        // 离开其他的tab
        this.stepActive = +now;
      }
    },
    // type = many|only
    async getParamsData(type) {
      // 根据类型获取动态参数和静态参数
      // 调用函数的时候 传入指定的类型
      // 三级分类ID  此时已经选中了三级分类
      const id = this.cascaderValues[2];
      const {
        data: { data, meta }
      } = await this.$http.get(`categories/${id}/attributes`, {
        params: { sel: type }
      });
      if (meta.status !== 200) return this.$message.error("获取参数失败");
      // 保存数据
      this[type + "Attrs"] = data;
    },
    // tab切换事件  点击tab的事件
    // changeTab(tab) {
    //   // tab 是当前选中的tab的实例对象   包含信息
    //   // tab.index 当前tab的标识  索引类型是字符串
    //   // "0" "1" "2" "3" "4" 对应五个tab
    //   // +"100" 隐式转换
    //   // this.stepActive = +tab.index;
    // },
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
