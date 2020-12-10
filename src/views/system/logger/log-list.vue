<template>
  <div>
    <div>
      <custom-collapse :search-flag="true" @searchSubmit="searchLogger" @searchReset="resetSearchLogger">
        <el-row style="margin: 0; padding: 10px 0" :gutter="24" slot="content">
          <el-col :offset="2" :span="8">
            <span class="label">访问者:</span>
            <el-select
              size="small" v-model="condition.logUserId" style="width: 80%"
              remote
              filterable
              :remote-method="filterVisitor"
              clearable placeholder="输入关键字搜索访问者">
              <el-option
                v-for="item in visitorList"
                :key="item.userId"
                :label="item.userName"
                :value="item.userId + '-' + item.userName">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="9">
            <span class="label">时间段:</span>
            <el-date-picker
              size="small"
              type="datetimerange"
              v-model="periodTime"
              value-format="timestamp"
              range-separator="至"
              end-placeholder="结束日期"
              start-placeholder="开始日期"
              :default-time="['00:00:00', '23:59:59']"
            >
            </el-date-picker>
          </el-col>
        </el-row>
      </custom-collapse>
    </div>
    <el-table :height="defaultHeight" border :data="loggerList" stripe :header-cell-style="$tableCellHeader">
      <el-table-column show-overflow-tooltip type="index" width="50" label="序号" :index="$indexMethod(page)"></el-table-column>
      <el-table-column show-overflow-tooltip prop="logUserId" label="访问者" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="logRequestRemoteIp" label="访问者IP" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="logRequestDescribe" label="访问URL" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="logRequestMethodAndInterface" label="访问类型及接口" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="logRequestUrl" label="SESSION ID - INTER" align="center"></el-table-column>
      <el-table-column show-overflow-tooltip prop="logRequestTime" label="访问时间" align="center" :formatter="$formatDateTime"></el-table-column>
    </el-table>
    <custom-paging :page-total="page.total" :page="page" @size-change="sizeChange" @start-change="startChange"></custom-paging>
  </div>
</template>

<script lang="ts">
  import {Component, Provide, Vue} from 'vue-property-decorator';
  import {ApiFactory, Logger, UserAccount} from '@/resources';
  import CustomPaging from '@/components/custom/custom-paging.vue';
  import CustomCollapse from '@/components/custom/custom-collapse.vue';

  @Component({
    components: {CustomCollapse, CustomPaging}
  })
  export default class LogList extends Vue {
    @Provide() name: string = 'LogList';
    @Provide() defaultHeight: number = window.innerHeight - 280;
    @Provide() periodTime: string[] = [];
    @Provide() public loggerList: any[] = [];
    @Provide() public visitorList: any[] = [];
    @Provide() public page: {
      total: number, start: number, size: number
    } = {
      total: 0, start: 1, size: 10
    };
    @Provide() public condition: {
      start: number, size: number, logUserId: string, startTime: any, endTime: any
    } = {
      start: 0, size: 0, logUserId: '', startTime: '', endTime: ''
    };

    mounted() {
      this.getDataList();
    }

    public getDataList() {
      if (this.periodTime) {
        this.condition.startTime = this.periodTime[0];
        this.condition.endTime = this.periodTime[1];
      }
      let params = Object.assign({}, this.condition);
      ApiFactory.getApi(Logger).queryPager(params).then(res => {
        this.loggerList = res.data.list;
        this.page.total = res.data.total;
      });
    }

    filterVisitor(query: string) {
      this.visitorList = [];
      ApiFactory.getApi(UserAccount).queryPager({start: 0, size: 10, keyWord: query}).then(res => {
        this.visitorList = res.data.list;
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

    public searchLogger() {
      this.getDataList();
    }

    public resetSearchLogger() {
      this.periodTime = []
      this.condition.logUserId = '';
      this.condition.startTime = '';
      this.condition.endTime = '';
      this.getDataList();
    }

  };
</script>

<style scoped lang="scss">
  @import "../../../assets/scss/common";
</style>
