<template>
  <div>
    <div>
      <custom-collapse>
        <div slot="operate">
          <el-button @click="addMemo" plain size="mini" type="primary">添加</el-button>
        </div>
      </custom-collapse>
    </div>
    <custom-table
      :columns="columns"
      :data="memoList"
      :total="total"
      :page="page"
      @buttonEditClick="buttonEditClick"
      @buttonDeleteClick="buttonDeleteClick">
    </custom-table>
    <custom-drawer title="备忘录" :show.sync="showMemoForm">
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
  import CustomTable from "@/components/custom/custom-table.vue";

  @Component({
    components: {CustomTable, CustomDict, MemoForm, CustomDrawer}
  })
  export default class MemoList extends Vue {
    @Provide() public name: string = 'MemoList';
    @Provide() public showMemoForm: boolean = false;
    @Provide() public memoTypeList: any = [];
    @Provide() public condition: any = {};
    @Provide() public memoList: any = [];
    @Provide() public columns: any = [
      {
        prop: 'title',
        label: '标题'
      }, {
        type: 'dict',
        dictGroup: 'memoType',
        prop: 'type',
        label: '类型'
      }, {
        prop: 'overhead',
        label: '开销'
      }, {
        prop: 'remake',
        label: '备注'
      }, {
        type: 'dateTime',
        prop: 'happenTime',
        label: '发生时间'
      }, {
        type: 'dateTime',
        prop: 'createTime',
        label: '创建时间'
      }, {
        type: 'optButton',
        prop: 'operation',
        label: '操作'
      }
    ];
    @Provide() public dateTime: any = [];
    @Provide() public memoPerms: any = ['update-notify-manage', 'delete-notify-manage'];
    @Provide() public memo: any = {};
    @Provide() public total: number = 0;
    @Provide() public page: any = {
      offset: 10,
      limit: 1
    };

    mounted() {
      this.getDataList();
    }

    public getDataList() {
      let params = Object.assign({}, this.condition);
      ApiFactory.getApi(Memo).queryPager(params).then(res => {
        this.memoList = res.data.list;
        this.total = res.data.total;
      });
    }

    addMemo() {
      this.memo = {};
      this.showMemoForm = true;
    }

    public buttonEditClick(item: {}) {
      this.showMemoForm = true;
      let params = Object.assign({}, item);
      this.memo = JSON.parse(JSON.stringify(params));
    }

    public buttonDeleteClick(item: any) {
      let params = Object.assign({}, item, {deleteFlag: 'true'});
      ApiFactory.getApi(Memo).put(params).then(() => {
        this.getDataList();
      });
    }

    public sizeChange(val: number) {
      this.page.offset = val;
      this.condition.offset = val;
      this.getDataList();
    }

    public startChange(val: number) {
      this.page.limit = val;
      this.condition.limit = val;
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
