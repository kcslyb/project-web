<template>
  <div>
    <el-upload
      action="#"
      class="upload-demo"
      :headers="{'Access-Control-Allow-Origin':'*'}"
      :file-list="fileList"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :before-upload="beforeAvatarUpload"
      :list-type="checkType ? 'picture' : 'text'">
      <el-button size="small" class="el-icon-upload" type="primary">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
  import EncryptHelper from '@/utils/encryption-util';
  import {ApiFactory, File} from "@/resources";

  export default {
    name: 'CustomFileUpload',
    props: {
      checkType: {
        type: Boolean,
        default: false
      },
      fileIds: {
        type: String,
        default: ''
      }
    },
    data(){
      return{
        file: {},
        fileList: []
      }
    },
    watch: {
      fileIds () {
        this.initFileData()
      }
    },
    computed: {
      getPreviewSrcList() {
        const temp = []
        this.fileList.forEach(value => {
          temp.push(value.base64)
        })
        return temp
      }
    },
    mounted() {
      this.initFileData()
    },
    methods: {
      initFileData () {
        if (this.fileIds) {
          const temp = this.fileIds.split(',');
          ApiFactory.getApi(File).accessFileBase64(temp).then((res) => {
            if (res.status === 200) {
              this.fileList = res.data || []
              this.fileList.map(value => {
                value.url = value.base64
                value.name = value.fileName
              })
            }
          }).catch(error => {
            throw new Error(error)
          })
        }
      },
      handleRemove (file, fileList) {
        this.$emit('on-remove', file, fileList);
      },
      uploadSuccess(response) {
        let data = EncryptHelper.aesDecrypt(response);
        this.$notify({
          title: '提示',
          type: 'success',
          message: `${data.fileName}上传成功`
        });
        this.$nextTick(() => {
          this.$emit('on-success', data);
        })
      },
      beforeAvatarUpload(file) {
        if (this.checkType) {
          const isJPG = file.type === 'image/jpeg';
          const isPNG = file.type === 'image/png';
          if (!isJPG && !isPNG) {
            this.$message.error('上传图片只能是 JPG 格式 或 PNG 格式!');
            return false;
          }
        }
        const isLt5M = file.size / 1024 / 1024 < 5;
        if (!isLt5M) {
          this.$message.error('上传图片大小不能超过 5MB!');
          return false;
        }
        let fd = new FormData()
        fd.append('file', file)
        let config = {
          headers: {'Content-Type': 'multipart/form-data'}
        }
        this.$http.post('/api/file/upload', fd, config).then((res) => {
          if (res.status === 200) {
            this.uploadSuccess(res.data)
          }
        }).catch(error => {
          throw new Error(error)
        })
        return false;
      }
    }
  };
</script>

<style scoped>

</style>
