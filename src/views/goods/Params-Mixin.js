export default {
  data() {
    return {
      // 级联数据  选中的分类
      selectedCateArr: [],
      // 级联数据  所有级分类数据
      cascaderOptions: [],
      // 级联数据  属性相关属性
      cascaderProps: {
        expandTrigger: "hover",
        label: "cat_name",
        value: "cat_id"
      },
      // tabs的属性 参数类型
      activeName: "many",
      // 动态参数列表数据
      manyAttrs: [],
      // 静态参数列表数据
      onlyAttrs: [],
      // 控制按钮禁用
      disabled: true,
      // 和添加参数相关的数据
      form: {
        attr_name: ""
      },
      rules: {
        attr_name: [
          { required: true, message: "参数名称必填", trigger: "blur" }
        ]
      },
      dialogFormVisible: false
      // 控制+添加tag按钮的显示和隐藏
      // tagVisiable: true
    };
  },
  // 计算属性：当需要的一项数据，需要依赖data中的数据，通过一些逻辑得到
  // 语法: computed:{key:value} key数据的名字 value 数据对应的函数 必须有返回值
  computed: {
    thirdCateId() {
      let id = null;
      if (this.selectedCateArr.length === 3) {
        id = this.selectedCateArr[2];
      }
      return id;
    }
  },
  created() {
    // 给cascaderOptions赋值  获取所有分类数据
    this.getData();
  },
  methods: {
    // 添加属性值
    addAttrVals(row) {
      row.tagVisiable = true;
    },
    // 点击 +添加tag 按钮
    addTag(row) {
      row.tagVisiable = false;
      // 获取焦点  操作dom需要在渲染完毕后才能操作
      this.$nextTick(() => {
        this.$refs[`add_input_${row.attr_id}`].focus();
      });
    },
    // 删除参数
    delParams(attrId) {
      // 1. 确认框
      // 2. 获取数据  参数ID  三级分类ID
      // 3. 请求
      this.$confirm("亲，是否删除该参数？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          // 确认操作
          const {
            data: { meta }
          } = await this.$http.delete(
            `categories/${this.thirdCateId}/attributes/${attrId}`
          );
          if (meta.status !== 200) return this.$message.error("删除参数失败");
          this.getParamsData();
          this.$message.success("删除参数成功");
        })
        .catch(() => null);
    },
    openAddDialog() {
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs.form.resetFields();
      });
    },
    addParams() {
      // 1. 进行表单校验
      // 2. 获取后端需要的数据
      // 3. 发送请求
      // 4. 失败 提示
      // 5. 成功：关闭对话框  更新当前的参数列表
      this.$refs.form.validate(async valid => {
        if (valid) {
          // id  其实就是  this.thirdCateId
          // attr_name 其实就是  this.form.attr_name
          // attr_sel 其实就是 this.activeName
          const {
            data: { meta }
          } = await this.$http.post(
            `categories/${this.thirdCateId}/attributes`,
            {
              attr_name: this.form.attr_name,
              attr_sel: this.activeName
            }
          );
          if (meta.status !== 201) return this.$message.error("添加参数失败");
          this.dialogFormVisible = false;
          this.getParamsData();
          this.$message.success("添加参数成功");
        }
      });
    },
    async getParamsData() {
      // 严谨处理  让你的程序更加健壮
      if (!this.thirdCateId) {
        return false;
      }
      // 获取参数列表数据
      // 依赖：第三级分类的ID
      // 依赖：参数的类型
      const {
        data: { data, meta }
      } = await this.$http.get(`categories/${this.thirdCateId}/attributes`, {
        params: { sel: this.activeName }
      });
      if (meta.status !== 200) return this.$message.error("获取参数失败");

      // 在动态参数列表渲染的时候  attr_vals 需求数组
      if (this.activeName === "many") {
        // data [{attr_name,attr_vals},{},{}]
        data.forEach(item => {
          // attr_vals 可能是空字符串 使用split(',')产生空的一项的数组
          item.attr_vals = item.attr_vals ? item.attr_vals.split(",") : [];
          // 数据：控制当前行的 tag 的显示和隐藏
          item.tagVisiable = true;
        });
      }

      // 赋值 修改 manyAttrs 渲染
      // 赋值 修改 onlyAttrs 渲染
      // 根据当前的参数类型 去赋值
      this[this.activeName + "Attrs"] = data;
    },
    // 切换了选项卡触发事件
    handleClick() {
      // tab 是当前选中的选项卡实例
      this.getParamsData();
    },
    handleChange() {
      // 选择了分类触发事件
      // 参数是挂在 三级分类下  其他分类是无意义的
      if (this.selectedCateArr.length !== 3) {
        this.$message.warning("第三级分类才能设置参数");
        this.selectedCateArr = []; // 清空级联
        this.disabled = true; //禁用按钮
        this[this.activeName + "Attrs"] = []; // 清空列表
        return false;
      }
      // 选中了第三级
      this.disabled = false;
      this.getParamsData();
    },
    async getData() {
      const {
        data: { data, meta }
      } = await this.$http.get("categories");
      if (meta.status !== 200) return this.$message.error("获取分类失败");
      this.cascaderOptions = data;
    }
  }
};
