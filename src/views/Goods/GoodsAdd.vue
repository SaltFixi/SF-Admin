<template>
  <a-row :gutter="40">
    <a-col :span="13">
      <a-form-model :model="form" :label-col="{ span: 3 }" :wrapper-col="{ span: 19 }">
        <a-form-model-item label="商品标题">
          <a-input v-model="form.name" />
        </a-form-model-item>

        <a-row>
          <a-col :span="12">
            <a-form-model-item label="商品分类" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
              <a-select v-model="form.region" placeholder="--请选择--">
                <a-select-option value="shanghai"> 服装 </a-select-option>
                <a-select-option value="beijing"> 家居 </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>

          <a-col :span="12">
            <a-form-model-item label="品牌" :label-col="{ span: 6 }" :wrapper-col="{ span: 14 }">
              <a-select v-model="form.pinpai" placeholder="--请选择--">
                <a-select-option value="123"> Nick </a-select-option>
                <a-select-option value="456"> Adidas </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
        </a-row>

        <a-form-model-item label="商品标签">
          <template v-for="(tag) in tags">
            <a-tooltip v-if="tag.length > 20" :key="tag" :title="tag">
              <a-tag :key="tag" closable @close="() => handleClose(tag)">
                {{ `${tag.slice(0, 20)}...` }}
              </a-tag>
            </a-tooltip>
            <a-tag color="orange" v-else :key="tag" closable @close="() => handleClose(tag)">
              {{ tag }}
            </a-tag>
          </template>
          <a-input
            v-if="inputVisible"
            ref="input"
            type="text"
            size="small"
            :style="{ width: '78px' }"
            :value="inputValue"
            @change="handleInputChange"
            @blur="handleInputConfirm"
            @keyup.enter="handleInputConfirm"
          />
          <a-tag color="green" v-else style="background: #fff; borderstyle: dashed" @click="showInput">
            <a-icon type="plus" /> 新增标签
          </a-tag>
        </a-form-model-item>

        <a-form-model-item label="是否上架">
          <a-switch v-model="form.delivery" />
        </a-form-model-item>

        <a-form-model-item label="是否推荐">
          <a-checkbox-group v-model="form.type">
            <a-checkbox value="1" name="type"> 首页推荐 </a-checkbox>
            <a-checkbox value="2" name="type"> 购物车推荐 </a-checkbox>
            <a-checkbox value="3" name="type"> 猜你喜欢 </a-checkbox>
          </a-checkbox-group>
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit"> <a-icon type="save" />保存商品 </a-button>
          <a-button style="margin-left: 10px"> <a-icon type="redo" />清空表单 </a-button>
        </a-form-model-item>
      </a-form-model>
    </a-col>

    <a-col :span="10">
      <s-tip color="mediumturquoise"> <a-icon type="file-image" />商品图片(用于前台展示) </s-tip>
      <div class="clearfix">
        <a-upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          list-type="picture-card"
          :file-list="fileList"
          @preview="handlePreview"
          @change="handleChange"
        >
          <div v-if="fileList.length < 8">
            <a-icon type="plus" />
            <div class="ant-upload-text">Upload</div>
          </div>
        </a-upload>
        <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
          <img alt="example" style="width: 100%" :src="previewImage" />
        </a-modal>
      </div>
    </a-col>
  </a-row>
</template>
<script>
function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}
export default {
  data() {
    return {
      form: {
        name: '',
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      previewVisible: false,
      previewImage: '',
      fileList: [
        {
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        },
        {
          uid: '-2',
          name: 'image.png',
          status: 'done',
          url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
        }
      ],
      tags: ['定制', '包邮'],
      inputVisible: false,
      inputValue: ''
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!', this.form)
    },
    handleCancel() {
      this.previewVisible = false
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj)
      }
      this.previewImage = file.url || file.preview
      this.previewVisible = true
    },
    handleChange({ fileList }) {
      this.fileList = fileList
    },
    handleClose(removedTag) {
      const tags = this.tags.filter((tag) => tag !== removedTag)
      console.log(tags)
      this.tags = tags
    },

    showInput() {
      this.inputVisible = true
      this.$nextTick(function () {
        this.$refs.input.focus()
      })
    },

    handleInputChange(e) {
      this.inputValue = e.target.value
    },

    handleInputConfirm() {
      const inputValue = this.inputValue
      let tags = this.tags
      if (inputValue && tags.indexOf(inputValue) === -1) {
        tags = [...tags, inputValue]
      }
      console.log(tags)
      Object.assign(this, {
        tags,
        inputVisible: false,
        inputValue: ''
      })
    }
  }
}
</script>

<style lang="less" scoped>
/* you can make up upload button and sample style by using stylesheets */
.ant-upload-select-picture-card i {
  font-size: 32px;
  color: #999;
}

.ant-upload-select-picture-card .ant-upload-text {
  margin-top: 8px;
  color: #666;
}
</style>
