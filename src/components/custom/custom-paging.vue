<template>
  <div class="custom-page">
    <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.start"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
    </el-pagination>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CustomPaging extends Vue {
        @Provide() public name: string = 'custom-paging';

        @Prop({
            default: {
                start: 1,
                size: 10,
                total: 10
            }
        }) public page!: {
            start: number,
            size: number,
            total: number
        };
        public handleSizeChange(val: number) {
            this.$emit('size-change', val);
        }
        public handleCurrentChange(val: number) {
            this.$emit('start-change', val);
        }
    };
</script>

<style scoped>
  .custom-page {
    padding: 10px 0;
    text-align: center;
  }
</style>
