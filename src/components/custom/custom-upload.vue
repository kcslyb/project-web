<template>
  <el-upload
      class="upload-demo"
      :action="uploadPath"
      :on-success ="uploadSuccess"
      :on-remove="handleRemove"
      :on-error="onError"
      :on-preview="onPreview"
      :before-upload="beforeAvatarUpload"
      :file-list="getDataList">
    <div v-if="isCheckImgType">
      <img v-if="getImageUrl" :src="getImageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon"></i>
    </div>
    <el-button :style="btnCss" v-else size="small" type="primary">{{btnLabel}}</el-button>
  </el-upload>
</template>

<script>
  export default {
    name: "CustomUpload",
    data() {
      return {
        fileFormat: ['JPG', 'JPEG', 'xls', 'xlsx', 'doc', 'docx', 'ppt', 'pptx', 'pdf', 'txt', 'jpg', 'png', 'zip', 'rar'],
        dataList: this.fileList,
        imageUrl: this.url
      }
    },
    props: {
      url: {
        type: String,
        default: ''
      },
      fileList: {
        type: Array,
        default: () => []
      },
      maxFileSize: {
        type: Number,
        default: 5
      },
      isCheckImgType: {
        type: Boolean,
        default: false
      },
      uploadPath: {
        type: String,
        default: 'http://127.0.0.1:8018/api/file/upload'
      },
      btnCss: {
        type: Object,
        default: () => {}
      },
      btnLabel: {
        type: String,
        default: '上传资料'
      }
    },
    computed: {
      getImageUrl() {
        return this.imageUrl;
      },
      getDataList() {
        return this.isCheckImgType ? [] : this.dataList
      }
    },
    methods: {
      handleRemove (file, fileList) {
        this.$emit('on-remove', file, fileList);
      },
      onPreview (file) {
        this.$emit('on-preview', file);
      },
      onError (err, file, fileList) {
        this.$emit('on-error', err, file, fileList);
      },
      uploadSuccess(response, file) {
        if (this.isCheckImgType) {
          this.imageUrl = URL.createObjectURL(file.raw);
        }
        this.$emit('on-success', response);
      },
      beforeAvatarUpload(file) {
        let fileType = file.name.substring(file.name.lastIndexOf('.') + 1);
        if (!this.fileFormat.includes(fileType)) {
          this.$emit('on-error', 'type not able');
          return false
        }
        const isLt5M = file.size / 1024 / 1024 < this.maxFileSize;
        if (!isLt5M) {
          this.$emit('on-error', 'size not able');
          return false;
        }
        if (this.isCheckImgType) {
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          if (isJPG || isPNG) {
            this.$emit('on-error', 'not img');
            return false;
          }
        }
        return file;
      }
    }
  }
</script>

<style scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 80px;
    height: 80px;
    line-height: 80px;
    text-align: center;
    margin: 5px;
    border: solid 1px #8c939d;
  }
  .avatar {
    margin: 5px;
    width: 80px;
    height: 80px;
    display: block;
    line-height: 80px;
    text-align: center;
  }
</style>