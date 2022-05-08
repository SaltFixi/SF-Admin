<template>
  <div>
    <a-row>
      <a-form-model :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 15 }">
        <a-row>
          <a-col :span="12">
            <a-form-model-item label="商品名称">
              <a-input v-model="form.SKU_NAME" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="SKU编号">
              <a-input v-model="form.SKU_CODE" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="状态">
              <a-input v-model="form.STATUS" placeholder="请输入" />
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="金额">
              <a-input v-model="form.MONEY" placeholder="请输入" />
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-row type="flex" justify="center">
          <label>查询创建时间范围:<a-range-picker v-model="form.CREATED_TIME" style="margin: 10px" /></label>
        </a-row>

        <a-row type="flex" justify="end">
          <a-form-model-item>
            <div style="width: 150px">
              <a-button type="primary" @click="onSearch"> 查询 </a-button>
              <a-button style="margin-left: 10px" @click="onClear"> 重置 </a-button>
            </div>
          </a-form-model-item>
        </a-row>
      </a-form-model>
    </a-row>
    <a-divider />

    <a-row>
      <a-col :span="3">
        <a-button type="primary" @click="handleTableAdd"> <a-icon type="plus-circle" />新增数据</a-button>
      </a-col>

      <a-col :span="2" :offset="13">
        <s-btn type="primary" v-print="'#printMe'"><a-icon type="printer" />打印</s-btn>
      </a-col>

      <a-col :span="3">
        <s-btn type="success"  @click="export2Excel"><a-icon type="file-excel"/>导出Excel</s-btn>
      </a-col>

      <a-col :span="3">
        <a-button :disabled="select0" @click="handleTableMutiDelete"> 批量删除 </a-button>
      </a-col>
    </a-row>

    <a-table
      :columns="columns"
      :data-source="data"
      size="middle"
      :pagination="pagerConfig"
      @change="handleTableChange"
      rowKey="id"
      id="printMe"
      :loading="tableLoading"
      :row-selection="rowSelection"
    >
      <span slot="action" slot-scope="text, record">
        <a @click="handleTableEdit(record)">
          <a-icon type="edit"></a-icon>
          编辑
        </a>

        <a-divider type="vertical" />

        <a @click="handleTableDelete(record.id)">
          <a-icon type="delete"></a-icon>
          删除
        </a>
      </span>
    </a-table>
  </div>
</template>
<script>
import print from 'vue-print-nb'
import columns from './columns'
import { export_json_to_excel } from '@/plugin/until/Export2Excel'
export default {
  directives: {
    print
  },
  data() {
    return {
      data: [],
      columns,
      tableLoading: false,
      pagerConfig: {
        current: 1,
        pageSize: 8,
        total: 0
      },
      tableSelectedRowKeys: [],
      form: {
        SKU_NAME: '',
        SKU_CODE: '',
        STATUS: '',
        MONEY: '',
        CREATED_TIME: null
      },
      isSearch: true
    }
  },
  computed: {
    rowSelection() {
      return {
        onChange: (selectedRowKeys) => {
          this.tableSelectedRowKeys = selectedRowKeys
        }
      }
    },
    select0() {
      return this.tableSelectedRowKeys.length === 0
    }
  },
  methods: {
    async getList() {
      this.tableLoading = true
      const {
        data: { list, total }
      } = await this.$post('/goods/select', {
        pageindex: this.pagerConfig.current,
        pagesize: this.pagerConfig.pageSize
      })
      // 判断实际的总页数小于当前页码，则按实际的总页数为页码来查询
      const totalPage = Math.ceil(total / this.pagerConfig.pageSize)
      if (totalPage < this.pagerConfig.current) {
        this.pagerConfig.current = totalPage
        this.getList()
      } else if (this.isSearch) {
        this.data = list
        this.pagerConfig.total = total
        this.tableLoading = false
      } else {
        this.tableLoading = false
      }
    },
    handleTableChange({ current }) {
      this.pagerConfig.current = current
      this.getList()
    },
    async handleTableDelete(id) {
      await this.$mc()
      const { data } = await this.$post('/goods/delete', {
        specsIds: Array.isArray(id) ? id : [id]
      })
      if (data === true) {
        this.$ms()
        this.getList()
      }
    },
    async handleTableMutiDelete() {
      await this.handleTableDelete(this.tableSelectedRowKeys)
      this.tableSelectedRowKeys = []
    },
    handleTableAdd() {
      this.$router.push('/goods/add')
    },
    handleTableEdit(record) {
      this.add_form_model = record
    },
    onSearch() {
      this.tableLoading = true
      const keyArray = Object.keys(this.form)
      keyArray.forEach(item => {
        if (this.form[item]) {
          if (item === 'CREATED_TIME') {
            let [start, end] = this.form.CREATED_TIME
            if (start && end) {
              start = new Date(start)
              end = new Date(end)
              this.data = this.data.filter((r) => {
                const row = new Date(r.CREATED_TIME)
                return row >= start && row <= end
              })
              console.log(this.data.length)
              this.pagerConfig.total = this.data.length
            }
          } else {
            this.search(this.form[item].trim())
          }
        }
      })
      this.tableLoading = false
    },
    async search(keywords) {
      this.isSearch = false
      const { searchResult, total } = await this.$post('/goods/search', { keywords })
      this.data = searchResult
      this.pagerConfig.total = total
    },
    onClear() {
      this.form = {
        SKU_NAME: '',
        SKU_CODE: '',
        STATUS: '',
        MONEY: '',
        CREATED_TIME: null
      }
      this.isSearch = true
      this.getList()
    },
    export2Excel() {
      const colTitleArray = this.columns.slice(0, this.columns.length - 1).map(r => r.title)
      // 拿到每一项的key过滤掉id
      const colKeyArray = this.columns.slice(0, this.columns.length - 1).map(r => r.key)
      // 将数据变成二维数组
      const dataValArray = this.data.map((r) => {
        const dataValItemArray = colKeyArray.map((rr) => {
          return r[rr]
        })
        return dataValItemArray
      })
      export_json_to_excel({
        header: colTitleArray,
        data: dataValArray,
        filename: '商品列表'
      })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped>
</style>
