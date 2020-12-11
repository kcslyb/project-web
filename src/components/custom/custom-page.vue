<template>
  <div class="page-container">
    <custom-collapse
      :title="title"
      class="page-collapse"
      @searchReset="searchReset"
      @searchSubmit="searchSubmit">
      <template slot="operate">
        <el-button type="primary" icon="el-icon-plus" plain size="mini" @click="handleAdd">新增</el-button>
      </template>
      <custom-form
        v-if="$scopedSlots.hasOwnProperty('content')"
        slot="content"
        form-name="product"
        v-model="searchData"
        :rules="formItems.rules"
        :form-items="formItems.items">
      </custom-form>
    </custom-collapse>
    <div class="page-table content">
      <custom-table
        :page="page"
        :total="total"
        :data="tableData"
        :columns="tableColumn"
        @pageChange="pageChange"
        @selectionChange="selectChange"
        @buttonEditClick="buttonEditClick"
        @cellButtonClick="cellButtonClick"
        @buttonDeleteClick="buttonDeleteClick">
      </custom-table>
    </div>
    <custom-drawer :title="formTitle" :event="event" :css="css" :show="showForm" @rightClose="rightClose">
      <slot :operation="operation" name="form"/>
    </custom-drawer>
    <slot name="default"/>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';
    import Operation from "@/operation/operation";

    @Component
    export default class CustomPage extends Vue {
        @Provide()
        public name: string = 'CustomPage';

        @Prop({default: false})
        public searchFlag!: boolean;

        @Prop({default: 'id'})
        public objectIdLabel!: string;

        @Prop({default: ''})
        public event!: string;

        @Prop({default: () => {}})
        public apiObj!: any;

        @Prop({default: ''})
        public title!: string;

        @Prop({default: '新增'})
        public formTitle!: string;

        @Prop({default: () => {}})
        public css!:  {};

        @Prop({
            default: () => {
                return {
                    data: {}, items: [], rules: {}
                }
            }
        })
        public formItems!: {
            data: any,
            items: [],
            rules: any
        };

        @Prop({default: () => []})
        public tableColumn!: [];

        @Prop({
            default: () => {
                return {
                    limit: 10,
                    offset: 1
                }
            }
        })
        public page!: [];

        @Provide()
        public flag: boolean = this.searchFlag;

        @Provide()
        public tableData: [] = [];

        @Provide()
        public operation: Operation = Operation.getInstance(this);

        @Provide()
        public condition: {
            limit: number,
            offset: number
        } = {
            limit: 10,
            offset: 1
        }

        @Provide()
        public showForm: boolean = false;

        @Provide()
        public searchData: object = {};

        @Provide()
        public actionLabel: string = '添加';

        @Provide()
        public total: number = 0;

        mounted() {
            this.initTableList()
        }

        $notify: any;

        searchSubmit() {
            this.initTableList()
        }

        searchReset() {
            this.formItems.data = {};
            this.initTableList()
        }

        initTableList() {
            let param = Object.assign({}, this.condition, this.searchData);
            this.apiObj.queryPager(param).then((res :any) => {
                console.info(res.data.list)
                this.tableData = res.data.list;
                this.total = res.data.total;
            })
        }

        pageChange(page: any) {
            this.condition = Object.assign({}, this.condition, page);
            this.initTableList();
        }

        rightClose() {
            this.showForm = false;
            this.initTableList();
        }

        handleAdd() {
            this.showForm = true;
            this.$emit('handleAdd')
        }

        buttonEditClick(row: any) {
            this.showForm = true;
            this.actionLabel = '修改';
            this.$emit('handleEdit', row)
        }

        buttonDeleteClick(row: any, action: string) {
            this.apiObj.delete(row[this.objectIdLabel]).then(() => {
                this.$notify.success({
                    title: '提示',
                    message: `${action}成功`
                });
                this.rightClose();
            }).catch(() => {
                this.$notify.error({
                    title: '提示',
                    message: `${action}失败`
                });
            }).catch(() => {
            })
        }

        cellButtonClick(row: any, action: string, label: string) {
            this.$emit('cellButtonClick', row, action, label)
        }

        selectChange(selection: []) {
            this.$emit('selectChange', selection)
        }

    };
</script>

<style scoped lang="scss">
  .page-container {
    height: 100%;
    display: flex;
    flex-flow: column;
    .content {
      height: 100%;
      display: flex;
      flex-flow: column;
    }
    .page-table {
      flex: 1;
      display:flex;
      flex-flow: column;
      border: 1px solid #e6e6e6;
    }
  }
</style>
