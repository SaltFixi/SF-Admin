<template>
  <div>
    <a-page-header style="padding-left: 0" title="图表中心" sub-title="Echart Center" />

    <a-row :gutter="[32, 32]">
      <a-col :span="6" v-for="item in cardList" :key="item.icon">
        <div class="card" :style="{ background: item.bgColor }">
          <div class="detail">
            <p class="text1">{{ item.text1 }}</p>
            <p class="text2">{{ item.text2 }}</p>
            <div class="money">$ {{ item.money | ftmMoney }}</div>
          </div>
          <i class="iconfont icon" :class="item.icon"></i>
        </div>
      </a-col>
    </a-row>

    <a-row :gutter="[32, 32]">
      <a-col :span="12">
        <div ref="salesStatus" style="height: 400px"></div>
      </a-col>
      <a-col :span="12">
        <div ref="financesStatus" style="height: 400px"></div>
      </a-col>
    </a-row>

    <a-row :gutter="[32]">
      <a-col :span="15">
        <a-table size="middle" :columns="columns" :data-source="table" rowKey="id" :pagination="false">
          <template slot="title">
            <div class="title">客户管理</div>
          </template>
        </a-table>
      </a-col>
      <a-col :span="9">
        <div ref="sectorStatus" style="height: 350px"></div>
      </a-col>
    </a-row>

  </div>
</template>

<script>
import * as echarts from 'echarts'
// 这里使用 require 导入因为它是运行时加载，等到它执行时才执行该js文件
// 通过import导入的js文件缓存完就会立即执行，频繁刷新就会丢失dom
const { setLineOption, setBarOption, setPieOption } = require('./setOption')

export default {
  data() {
    return {
      cardList: [],
      table: [],
      columns: []
    }
  },

  methods: {
    async getEchart() {
      const { data: { card, line, bar, table, pie } } = await this.$get('/echart/info')
      this.cardList = card
      this.table = table

      // 将拿过来的table数据进行处理
      const columnsData = ['客户总数', '本周新增客户', '正式客户-不活动', '正式客户-活动', '潜在客户', '今日', '昨日', '本周', '本月']
      const columns = columnsData.map(item => ({ title: item }))

      const keyArray = Object.keys(table[0])
      for (let i = 0; i < keyArray.length - 1; i++) {
        columns[i].dataIndex = keyArray[i]
        columns[i].key = keyArray[i]
        columns[i].align = 'center'
      }
      this.columns = columns

      // 拿到dom，初始化图表
      const salesStatus = echarts.init(this.$refs.salesStatus)
      // 显示图表。
      setLineOption(salesStatus, line)

      const financesStatus = echarts.init(this.$refs.financesStatus)
      setBarOption(financesStatus, bar)

      const sectorStatus = echarts.init(this.$refs.sectorStatus)
      const color = pie.map(r => r.color)
      setPieOption(sectorStatus, pie, color)

      // 当容器大小改变时，图表的大小也相应地改变。
      window.onresize = function() {
        salesStatus.resize()
        financesStatus.resize()
        sectorStatus.resize()
      }
    }

  },

  mounted() {
    this.getEchart()
  }
}
</script>

<style lang="less" scoped>
.card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  color: #fff;
  background: #7460ee;
  border-radius: 6px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  .detail {
    font-size: 13px;
    .money {
      font-size: 24px;
      font-weight: 500;
    }
  }
  .icon {
    font-size: 55px;
  }
}

.title {
  font-weight: bold;
  font-size: 18px;
  color: #494949;
  padding-left: 10px;
  user-select: none;
}

::v-deep .ant-table-thead > tr > th {
  font-size: 13px;
  background: #F3F3F3;
}
</style>
