<template>
  <div v-loading="loading">
    <custom-collapse title="操作栏">
      <el-row :gutter="24" slot="operate">
        <el-col :offset="1" :span="6">
          <custom-perm label="upload-file-manage">
            <custom-file-upload :on-success="uploadSuccess"></custom-file-upload>
          </custom-perm>
        </el-col>
        <el-col :offset="8" :span="2">
          <custom-perm label="download-file-manage">
            <el-button size="small" type="primary" @click="batchDownload">批量下载</el-button>
          </custom-perm>
        </el-col>
      </el-row>
    </custom-collapse>
    <el-table :style="'height: '+ defaultHeight +'px;'" :data="list" stripe :header-cell-style="$tableCellHeader">
      <el-table-column type="selection" width="50"></el-table-column>
      <el-table-column type="index"
                       :index="updateIndex"
                       label="序号" width="50" align="center">
      </el-table-column>
      <el-table-column prop="fileOwnerName" label="上传者"></el-table-column>
      <el-table-column prop="fileName" label="文件名" show-overflow-tooltip></el-table-column>
      <el-table-column prop="fileSize" label="文件大小"></el-table-column>
      <el-table-column prop="fileType" label="文件类型" show-overflow-tooltip></el-table-column>
      <el-table-column prop="filePath" label="文件路径" show-overflow-tooltip></el-table-column>
      <el-table-column prop="fileCreateTime" label="上传时间" :formatter="setTime" width="200" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center" width="200px">
        <template slot-scope="scope">
          <custom-perm label="download-file-manage">
            <el-button type="primary" size="mini" plain circle class="el-icon-download"
                       @click="download(scope.row)"></el-button>
            <el-tag v-show="scope.row.fileDownloadNumber > 0" size="mini">
              已下载{{scope.row.fileDownloadNumber}}次
            </el-tag>
          </custom-perm>
          <custom-perm label="delete-file-manage">
            <el-button type="primary" size="mini" plain circle class="el-icon-delete"
                       @click="deleteFile(scope.row)"></el-button>
          </custom-perm>
        </template>
      </el-table-column>
    </el-table>
    <el-footer align="center" style="background-color: #fff">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="condition.offset"
        :page-sizes="[8, 20, 30]"
        :page-size="8"
        layout="total, sizes, prev, pager, next, jumper"
        :total="count">
      </el-pagination>
    </el-footer>
  </div>
</template>
<script>
  import {ApiFactory, File} from '@/resources';
  import {DateUtils} from '@/utils/common-utils';
  import CustomCollapse from '../../components/custom/custom-collapse';
  import CustomFileUpload from '../../components/custom/custom-file-upload';

  export default {
    name: 'file',
    components: {CustomFileUpload, CustomCollapse},
    data() {
      return {
        loading: true,
        multipleSelection: [],
        defaultHeight: window.innerHeight - 300,
        fileDto: {
          fileDescription: '上传者：' + this.$store.state.user.userName
        },
        filename: '',
        list: [],
        fileList: [],
        file: '',
        count: 0,
        condition: {
          offset: 1,
          limit: 8
        }
      }
    },
    mounted() {
      this.getFileList();
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0 || rowIndex % 2 === 0) {
          return 'warning-row';
        } else if (rowIndex % 2 === 1 || rowIndex % 2 === 1) {
          return 'warning-row';
        }
        return '';
      },
      updateIndex(index) {
        return index + (this.condition.offset - 1) * this.condition.limit + 1;
      },
      setTime(row) {
        return DateUtils.formatStringToDateTime(row.fileCreateTime);
      },
      uploadSuccess() {
        this.list = [];
        this.$nextTick(() => {
          this.getFileList();
        })
      },
      handleSizeChange(val) {
        this.condition.limit = val;
        this.getFileList();
      },
      handleCurrentChange(val) {
        this.condition.offset = val;
        this.getFileList();
      },
      getFileList() {
        this.loading = true;
        ApiFactory.getApi(File).queryPager(this.condition).then((res) => {
          this.count = res.data.total;
          this.list = res.data.list;
          this.loading = false;
        }).catch(() => {
        });
      },
      batchDownload() {
        if (this.multipleSelection.length === 0) {
          this.$notify({
            type: 'info',
            title: '提示',
            message: '请勾选要下载的文件！'
          });
          return '';
        }
        this.multipleSelection.forEach(value => {
          this.download(value);
        });
        this.multipleSelection = [];
      },
      deleteFile(file) {
        ApiFactory.getApi(File).remove(file.fileId).then(() => {
          this.$notify({
            type: 'success',
            message: '删除成功'
          });
          this.getFileList();
        })
      },
      download(file) {
        this.filename = file.fileName;
        let url = window.location.origin + '/api/file/download/' + file.fileId;
        return new Promise((resolve, reject) => {
          // Get file name from url.
          let xhr = new XMLHttpRequest();
          xhr.responseType = 'blob';
          xhr.onload = () => {
            resolve(xhr);
          };
          xhr.onerror = reject;
          xhr.open('GET', url);
          xhr.send();
        }).then((xhr) => {
          let a = document.createElement('a');
          a.href = window.URL.createObjectURL(xhr.response); // xhr.response is a blob
          a.download = this.filename; // Set the file name.
          a.style.display = 'none';
          document.body.appendChild(a);
          a.click();
          this.getFileList();
          return xhr;
        });
      }
    }
  };
</script>

<style scoped>
  .el-table__body .warning-row {
    background: oldlace;
  }

  .el-table__body .success-row {
    background: #f0f9eb;
  }
</style>
