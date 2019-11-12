<template>
  <div>
    <div>
      <custom-collapse>
        <div style="float: right"><el-button type="primary" plain size="mini" @click="addMemo">添加</el-button></div>
        <div style="clear: right"></div>
        <el-row :gutter="24">
          <el-col :offset="3" :span="8">
            <span class="label">访问者:</span>
            <el-select v-model="condition.logUserId" style="width: 80%"
                       remote
                       filterable
                       :remote-method="filterMemoType"
                       clearable placeholder="输入关键字搜索类型">
              <el-option
                  v-for="item in memoTypeList"
                  :key="item.id"
                  :label="item.key + '-' + item.label"
                  :value="item.key">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="8">
            <span class="label">时间段:</span>
            <el-date-picker
                v-model="condition.endTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
            </el-date-picker>
          </el-col>
          <el-col :span="4">
            <el-button type="primary" plain @click="searchMemo">搜索</el-button>
            <el-button type="info" plain @click="resetSearchMemo">重置</el-button>
          </el-col>
        </el-row>
      </custom-collapse>
    </div>
    <el-table border :data="memoList" stripe :header-cell-style="$tableCellHeader">
      <el-table-column type="index" width="50" label="序号" :index="$indexMethod(page)"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column prop="type" label="类型" align="center"></el-table-column>
      <el-table-column prop="overhead" label="开销" align="center"></el-table-column>
      <el-table-column prop="remake" label="备注" align="center"></el-table-column>
      <el-table-column prop="happenTime" label="发生时间" align="center" :formatter="$formatDateTime"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center" :formatter="$formatDateTime"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <custom-perm :label="memoPerms">
            <el-button type="primary" plain size="mini" @click="updateDict(scope.row)">update</el-button>
            <el-button type="danger" plain size="mini" @click="deleteDict(scope.row)">delete</el-button>
          </custom-perm>
        </template>
      </el-table-column>
    </el-table>
    <custom-paging :page="page" @size-change="sizeChange" @start-change="startChange"></custom-paging>
    <custom-drawer title="memo" :show.sync="showMemoForm">
      <memo-form :formItem="memo" @close-form="closeForm"></memo-form>
    </custom-drawer>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {ApiFactory, Memo} from '@/resources';
    import CustomDrawer from '@/components/custom/custom-drawer.vue';
    import MemoForm from '@/views/memo/memo-form.vue';
    @Component({
        components: {MemoForm, CustomDrawer}
    })
    export default class MemoList extends Vue {
        @Provide() public name: string = 'MemoList';
        @Provide() public showMemoForm: boolean = false;
        @Provide() public memoTypeList: any = [];
        @Provide() public condition: any = {};
        @Provide() public memoList: any = [];
        @Provide() public dateTime: any = [];
        @Provide() public memoPerms: any = ['update-notify-manage', 'delete-notify-manage'];
        @Provide() public memo: any = {};
        @Provide() public page: any = {
            size: 10,
            start: 1,
            total: 0
        };

        mounted() {
            this.getDataList();
        }

        public getDataList() {
            let params = Object.assign({}, this.condition);
            ApiFactory.getApi(Memo).queryPager(params).then(res => {
                this.memoList = res.data.list;
                this.page.total = res.data.total;
            });
        }

        addMemo() {
            this.memo = {};
            this.showMemoForm = true;
        }

        public updateDict(item: {}) {
            this.showMemoForm = true;
            let params = Object.assign({}, item);
            this.memo = JSON.parse(JSON.stringify(params));
        }

        public deleteDict(item: any) {
            let params = Object.assign({}, item, {deleteFlag: '1'});
            ApiFactory.getApi(Memo).put(params).then(() => {
                this.getDataList();
            });
        }

        public sizeChange(val: number) {
            this.page.size = val;
            this.condition.size = val;
            this.getDataList();
        }

        public startChange(val: number) {
            this.page.start = val;
            this.condition.start = val;
            this.getDataList();
        }

        public filterMemoType(query: string) {
            if (!query) {
                return [];
            }
        }

        public searchMemo() {
            this.getDataList();
        }

        public resetSearchMemo() {
            this.condition.type = '';
            this.condition.startTime = '';
            this.condition.endTime = '';
            this.getDataList();
        }

        closeForm() {
            this.showMemoForm = false;
            this.getDataList();
        }
    };
</script>

<style scoped lang="scss">

</style>
