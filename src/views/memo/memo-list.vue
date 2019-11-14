<template>
  <div>
    <div>
      <custom-collapse>
        <div style="text-align: right">
          <el-button @click="addMemo" plain size="mini" type="primary">添加</el-button>
        </div>
      </custom-collapse>
    </div>
    <el-table border :data="memoList" stripe :header-cell-style="$tableCellHeader">
      <el-table-column type="index" width="50" label="序号" :index="$indexMethod(page)"></el-table-column>
      <el-table-column prop="title" label="标题" align="center"></el-table-column>
      <el-table-column align="center" label="类型" prop="type">
        <template slot-scope="scope">
          <custom-dict :dictValue="scope.row.type" dictGroup="memoType"></custom-dict>
        </template>
      </el-table-column>
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
    import CustomDict from '@/components/custom/custom-dict.vue';

    @Component({
        components: {CustomDict, MemoForm, CustomDrawer}
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
            let params = Object.assign({}, item, {deleteFlag: 'true'});
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
