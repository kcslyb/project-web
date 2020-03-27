<template>
  <div>
    <div>
      <custom-collapse :searchFlag="false">
        <slot name="search"></slot>
      </custom-collapse>
    </div>
    <div>
      <el-table :data="data" :header-cell-style="$tableCellHeader" stripe>
        <el-table-column type="selection" v-if="isSelection && data.length > 0" width="50"></el-table-column>
        <el-table-column :index="$indexMethod(page)" align="center"
                         label="序号" type="index" v-if="isIndex" width="50">
        </el-table-column>
        <template v-if="data.length > 0 && columns.length > 0">
          <template v-for="column of columns">
            <el-table-column :formatter="$formatDateTime" :label="column.label" :prop="column.key"
                             v-if="isTime(column.key)"></el-table-column>
            <el-table-column :label="column.label" :prop="column.key" v-else="isTime(column.key)"></el-table-column>
          </template>
        </template>
        <template v-else>
          <template v-for="(item, key, index) of data.length ? data[0] : {}">
            <el-table-column :formatter="$formatDateTime" :label="key" :prop="key" v-if="isTime(key)"></el-table-column>
            <el-table-column :label="key" :prop="key" v-else="isTime(key)"></el-table-column>
          </template>
        </template>
        <el-table-column align="center" label="操作" v-if="isOperation">
          <template slot-scope="scope">
            <slot :row="scope.row" name="operation"></slot>
          </template>
        </el-table-column>
      </el-table>
      <custom-paging :page="page" :page-total="data.length" @size-change="handleSizeChange" @start-change="handleCurrentChange"
                     v-show="data.length"></custom-paging>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import CustomPaging from '@/components/custom/custom-paging.vue';

    class Column {
        key!: string;
        label!: string;
    }

    @Component({
        components: {CustomPaging}
    })
    export default class CustomTable extends Vue {
        public name: string = 'CustomTable';
        @Prop({default: false})
        public isSelection?: boolean;

        @Prop({default: false})
        public isIndex?: boolean;

        @Prop({default: false})
        public isOperation?: boolean;

        @Prop({default: () => []})
        public data?: any[];

        @Prop({default: () => []})
        public columns?: Column[];

        @Prop({
            default: function() {return {size: 10, start: 1}}
        })
        public page?: any;

        @Prop({
            default: () => {return {size: 10, start: 1}}
        })
        public condition?: any;

        isTime(val: string): boolean {
            let regex = /[^]*Time$|^]*time$/;
            return regex.test(val);

        }

        handleSizeChange(val: number) {
            this.condition.size = val;
            this.$emit('condition-change', this.condition);
        }

        handleCurrentChange(val: number) {
            this.condition.start = val;
            this.$emit('condition-change', this.condition);
        }
    };
</script>

<style scoped>

</style>
