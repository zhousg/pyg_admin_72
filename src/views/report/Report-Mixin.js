import echarts from "echarts";
export default {
  data() {
    return {
      options: {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#E9EEF3"
            }
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ]
      }
    };
  },
  mounted() {
    // 绘制报表
    // Error in created hook: "TypeError: Cannot read property 'getAttribute' of undefined"
    // 在 created 还没有渲染页面  你获取到dom吗？
    this.initReport();
  },
  methods: {
    async initReport() {
      const myChart = echarts.init(this.$refs.wrapper);
      // const option = "自己的报表配置项和数据项";
      // 获取后台提供的包含数据的配置项
      // 获取成功后  和 现在的基础配置项进行合并
      const {
        data: { data, meta }
      } = await this.$http.get("reports/type/1");
      if (meta.status !== 200) return this.$message.error("获取报表数据失败");
      // 合并配置项  data  this.options
      // Object.assgin() 合并对象
      this.options = Object.assign(this.options, data);
      myChart.setOption(this.options);
    }
  }
};
