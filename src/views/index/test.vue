<template>
  <custom-table
      :columns="[{id: id, label: '唯一标示'}, {name: id, label: '唯一标示'}, {sex: id, label: '唯一标示'}]"
      :condition="condition"
      :data="parent"
      :page="page"
      isIndex="true"
      isOperation="true"
      isSelection="true">
    <template slot="search">
      <div style="float: right">
        <el-button @click="addMemo" plain size="mini" type="primary">添加</el-button>
      </div>
      <div style="clear: right"></div>
      <el-row :gutter="24">
        <el-col :offset="3" :span="8">
          <span class="label">访问者:</span>
          <el-select :remote-method="filterMemoType" clearable
                     filterable
                     placeholder="输入关键字搜索类型"
                     remote
                     style="width: 80%" v-model="condition.logUserId">
            <el-option
                :key="item.id"
                :label="item.key + '-' + item.label"
                :value="item.key"
                v-for="item in memoTypeList">
            </el-option>
          </el-select>
        </el-col>
        <el-col :span="8">
          <span class="label">时间段:</span>
          <el-date-picker
              end-placeholder="结束日期"
              range-separator="至"
              start-placeholder="开始日期"
              type="datetimerange"
              v-model="condition.endTime">
          </el-date-picker>
        </el-col>
        <el-col :span="4">
          <el-button @click="searchMemo" plain type="primary">搜索</el-button>
          <el-button @click="resetSearchMemo" plain type="info">重置</el-button>
        </el-col>
      </el-row>
    </template>
    <template slot="operation" slot-scope="slotProps">
      <custom-perm :label="memoPerms">
        <el-button @click="updateDict(slotProps.row)" plain size="mini" type="primary">update</el-button>
        <el-button @click="deleteDict(slotProps.row)" plain size="mini" type="danger">delete</el-button>
      </custom-perm>
    </template>
  </custom-table>
  <!--  <div>-->
  <!--    <custom-node-->
  <!--        :space="100"-->
  <!--        :self="self"-->
  <!--        :parent="parent"-->
  <!--        :brother="brother"-->
  <!--        :children="children">-->
  <!--    </custom-node>-->
  <!--  </div>-->
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import CustomTable from '@/components/custom-table.vue';

    @Component({
        components: {CustomTable}
    })
    export default class Test extends Vue {
        @Provide()
        public show: boolean = false;
        @Provide()
        public self: object = {
            id: 'id-self',
            name: 'name-0',
            sex: 'sex-0'
        };
        @Provide()
        public parent: object[] = [{
            id: 'id-1',
            name: 'name-2',
            sex: 'sex-2'
        }, {
            id: 'id-3',
            name: 'name-3',
            sex: 'sex-3'
        }]
        ;
        @Provide()
        public brother: object[] = [{
            id: 'id-4',
            name: 'name-4',
            sex: 'sex-4'
        }, {
            id: 'id-5',
            name: 'name-5',
            sex: 'sex-5'
        }, {
            id: 'id-5',
            name: 'name-5',
            sex: 'sex-5'
        }, {
            id: 'id-5',
            name: 'name-5',
            sex: 'sex-5'
        }];
        @Provide()
        public children: object[] = [{
            id: 'id-6',
            name: 'name-6',
            sex: 'sex-6'
        }, {
            id: 'id-7',
            name: 'name-7',
            sex: 'sex-7'
        }, {
            id: 'id-7',
            name: 'name-7',
            sex: 'sex-7'
        }];

    }
</script>

<style scoped lang="scss">
  .logo-item {
    padding: 5px;
  }
</style>
