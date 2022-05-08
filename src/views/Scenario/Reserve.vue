<template>
  <div>
    <s-tip color="deepskyblue">预约场景</s-tip>

    <table class="tb">
      <tr>
        <th>时间\教室</th>
        <th v-for="(row, index) in rows" :key="index">{{ row }}</th>
      </tr>

      <tr v-for="(col, index) in cols" :key="index">
        <td style="font-weight: bold">{{ col }}</td>
        <td class="reserve-cell" :class="{ busy: isBusy(row, col) }" v-for="(row, index) in rows" :key="index">
          {{ isBusy(row, col) ? '已占用' : '空闲' }}
          <a v-if="!isBusy(row, col)" class="reserve-tip" @click="showDrawer(row, col)">预约</a>
          <a v-else class="reserve-tip" @click="cancel(row, col)">取消预约</a>
        </td>
      </tr>
    </table>

    <a-drawer title="新增预约" placement="right" :closable="false" :visible="visible" @close="onClose">
      <div>教室: {{ curRow }}</div>
      <div>时间: {{ curCol }}</div>
      <a-button type="primary" @click="onConfirm" style="margin: 20px">确定</a-button>
    </a-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: [],
      cols: [],
      data: ['1-401,10:00', '1-405,14:00', '1-403,15:00'],
      curRow: '',
      curCol: '',
      visible: false
    }
  },

  computed: {
    isBusy() {
      return function (row, col) {
        return this.data.includes([row, col].join())
      }
    }
  },

  mounted() {
    this.rows = Array.from({ length: 6 }).map((r, i) => (r = '1-40' + (i + 1)))
    this.cols = ['9', '10', '11', '14', '15', '16'].map((r) => (r = r + ':00'))
  },

  methods: {
    showDrawer(row, col) {
      this.curRow = row
      this.curCol = col
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    onConfirm() {
      this.data.push([this.curRow, this.curCol].join())
      this.visible = false
    },
    async cancel(row, col) {
      await this.$mc('你确定取消预约吗？', 'Are You OK?')
      this.data = this.data.filter((r) => r !== [row, col].join())
    }
  }
}
</script>

<style lang="less" scoped>
.tb {
  border-collapse: collapse;
  th,
  td {
    width: 100px;
    height: 100px;
    text-align: center;
    padding: 30px 20px;
    border: 1px solid mediumturquoise;
  }

  .reserve-cell {
    &:hover {
      color: #fff;
      background-color: mediumaquamarine;
      border: 0;
      .reserve-tip {
        display: block;
      }
    }
  }

  .busy {
    color: #fff;
    background-color: mediumpurple;
  }

  .reserve-tip {
    display: none;
    cursor: pointer;
    margin: 0 auto;
  }
}
</style>
