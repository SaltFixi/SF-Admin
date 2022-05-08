<template>
  <div>
    <a-row>
      <a-col :span="3">
        <a-button type="primary" @click="handleTableAdd"> <a-icon type="plus-circle" />新增数据</a-button>
      </a-col>

      <a-col :span="6" :offset="1">
        <a-input-search placeholder="请输入名称进行查找" v-model.trim="keywords" enter-button @search="handleTableSearch" :loading="searchLoading" />
      </a-col>

      <a-col :span="4" :offset="10">
        <a-button type="danger" :disabled="select0" @click="handleTableMutiDelete">
           批量删除
        </a-button>
      </a-col>
    </a-row>
    <a-modal v-model="visible" :title="isAddForm ? '新增数据' : '编辑数据'" @ok="handleAddModelOk" :afterClose="clear_form_model">
      <a-form-model
        :model="add_form_model"
        :rules="add_form_rules"
        ref="add_form"
        :label-col="{ span: 7 }"
        :wrapper-col="{ span: 14 }"
      >
        <a-form-model-item label="姓名" prop="name">
          <a-input v-model="add_form_model.name" />
        </a-form-model-item>
        <a-form-model-item label="年龄" prop="price">
          <a-input v-model.number="add_form_model.price" />
        </a-form-model-item>

        <a-form-model-item v-if="!isAddForm" label="描述" prop="src">
          <a-input v-model="add_form_model.src" />
        </a-form-model-item>
        <a-form-model-item v-if="!isAddForm" label="状态" prop="type">
          <a-select v-model="add_form_model.type" placeholder="请选择">
            <a-select-option value="已完成">已完成</a-select-option>
            <a-select-option value="未完成">未完成</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>

    <a-table
      :columns="columns"
      :data-source="data"
      size="middle"
      :pagination="pagerConfig"
      @change="handleTableChange"
      rowKey="id"
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

      <a-tag :color="text === '未完成' ? 'pink' : 'blue'" slot="type" slot-scope="text">
        {{ text }}
      </a-tag>
    </a-table>
  </div>
</template>
<script>
import columns from './columns'
export default {
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
      visible: false,
      add_form_model: {
        name: '',
        price: '',
        src: '',
        type: ''
      },
      add_form_rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 2, max: 15, message: '字符长度在2~15之间', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入体重', trigger: 'blur' },
          { type: 'number', message: '年龄必须为数字值', transform: (value) => Number(value) }
        ],
        src: [{ required: true, message: '请输入描述', trigger: 'blur' }]
      },
      isAddForm: true,
      searchLoading: false,
      tableSelectedRowKeys: [],
      keywords: ''
    }
  },
  computed: {
    dealTableType() {
      return this.add_form_model.type | this.fmtListType
    },
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
  // filters: {
  //   fmtListType(val) {
  //     return ['已完成', '未完成'][val]
  //   }
  // },
  methods: {
    async getList() {
      this.tableLoading = true
      const { data: { list, total } } = await this.$post('/getlist/select', {
        pageindex: this.pagerConfig.current,
        pagesize: this.pagerConfig.pageSize
      })
      // 判断实际的总页数小于当前页码，则按实际的总页数为页码来查询
      const totalPage = Math.ceil(total / this.pagerConfig.pageSize)
      if (totalPage < this.pagerConfig.current) {
        this.pagerConfig.current = totalPage
        this.getList()
      } else {
        // 传过来的数据是 0 || 1 做下处理
        list.forEach((r) => {
          if (r.type) {
            r.type = '已完成'
          } else {
            r.type = '未完成'
          }
        })
        this.data = list
        this.pagerConfig.total = total
        this.tableLoading = false
      }
    },
    handleTableChange({ current }) {
      this.pagerConfig.current = current
      this.getList()
    },
    async handleTableDelete(id) {
      await this.$mc()
      const { data } = await this.$post('/getlist/delete', {
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
      this.visible = true
      this.isAddForm = true
    },
    async handleAddModelOk() {
      await this.$valid('add_form')
      const { name, price } = this.add_form_model

      if (this.isAddForm) {
        await this.$post('/getlist/add', { name, price })
        this.$ms('info', '添加成功')
      } else {
        // 编辑数据的时候处理传过去的数据
        if (this.add_form_model.type === '已完成') {
          this.add_form_model.type = 1
        } else {
          this.add_form_model.type = 0
        }
        await this.$post('/getlist/edit', this.add_form_model)
        this.$ms('info', '更新成功')
      }

      this.getList()
      this.visible = false
    },
    handleTableEdit(record) {
      this.isAddForm = false
      this.add_form_model = record
      this.visible = true
    },
    clear_form_model() {
      this.add_form_model = {
        name: '',
        price: ''
      }
    },
    async handleTableSearch(value) {
      this.searchLoading = true
      this.keywords = value
      if (this.keywords) {
        const { list } = await this.$post('/getlist/search', { keywords: this.keywords })
        this.data = list
      } else {
        this.getList()
      }
      this.keywords = ''
      this.searchLoading = false
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style lang="less" scoped></style>
