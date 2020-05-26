<template>
  <div>
    <custom-collapse
      :title="title + '列表'"
      @searchSubmit="searchSubmit"
      @searchReset="searchReset">
      <template slot="operate">
        <el-button type="primary" icon="el-icon-plus" plain size="mini" @click="handleAdd">新增</el-button>
      </template>
      <custom-form
        slot="content"
        form-name="product"
        :rules="formItems.rules"
        v-model="formItems.data"
        :form-items="formItems.items">
      </custom-form>
    </custom-collapse>
    <custom-table
      :columns="tableColumn"
      :data="tableData"
      :total="total"
      :page="page"
      @pageChange="pageChange"
      @buttonEditClick="buttonEditClick"
      @buttonDeleteClick="buttonDeleteClick"
      @cellButtonClick="cellButtonClick"
      @selectionChange="selectChange">
    </custom-table>
    <custom-drawer :title="title" :show="showForm" @rightClose="rightClose">
      <slot name="form"/>
    </custom-drawer>
    <slot name="default"/>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CustomPage extends Vue {
        @Provide()
        public name: string = 'CustomPage';

        @Prop({default: false})
        public searchFlag!: boolean;

        @Prop({default: 'id'})
        public objectIdLabel!: string;

        @Prop({default: () => {}})
        public apiObj!: any;

        @Prop({default: '列表'})
        public title!: string;

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
        public actionLabel: string = '添加';

        @Provide()
        public tableData: [] = [];

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
            let param = Object.assign({}, this.condition, this.formItems.data);
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

</style>
