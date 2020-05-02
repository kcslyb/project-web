<template>
  <div>
    <custom-collapse
      @searchSubmit="searchSubmit"
      @searchReset="searchReset">
      <template slot="tools">
        <el-button type="primary" plain size="mini" @click="add">新增</el-button>
      </template>
      <custom-form
        slot="content"
        form-name="product"
        :rules="formItems.rules"
        v-model="formItems.data"
        :form-items="formItems.items"></custom-form>
    </custom-collapse>
    <custom-table
      :columns="tableColumn"
      :data="tableData"
      :total="total"
      :page="page"
      @pageChange="pageChange"
      @buttonEditClick="buttonEditClick"
      @buttonDeleteClick="buttonDeleteClick"
      @selectionChange="selectChange">
    </custom-table>
    <custom-drawer title="添加角色" :show="showProductForm" @rightClose="rightClose">
      <product-form
        :product="product"
        @close="rightClose">
      </product-form>
    </custom-drawer>
  </div>
</template>

<script>
  import CustomCollapse from "../../../../components/custom/custom-collapse";
  import CustomTable from "../../../../components/custom/custom-table";
  import {ApiFactory, Product} from "../../../../resources";
  import CustomForm from "../../../../components/custom/custom-form";
  import {productItems, tableColumn} from "./product-list-json";
  import CustomDrawer from "../../../../components/custom/custom-drawer";
  import ProductForm from "./product-form";

  export default {
    name: "product-list",
    components: {ProductForm, CustomDrawer, CustomForm, CustomTable, CustomCollapse},
    data() {
      return {
        showProductForm: false,
        condition: {
          limit: 10,
          offset: 1,
          productStatus: '0'
        },
        total: 0,
        page: {
          limit: 10,
          offset: 1
        },
        tableData: [],
        tableColumn: [],
        formItems: {
          data: {},
          items: [],
          rules: {}
        },
        product: {}
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        this.formItems.items = productItems;
        this.tableColumn = tableColumn;
        this.initTableList();
      },
      initTableList() {
        let param = Object.assign({}, this.condition, this.formItems.data);
        ApiFactory.getApi(Product).queryPager(param).then(res => {
          this.tableData = res.data.list;
          this.total = res.data.total;
        })
      },
      add() {
        this.product = {};
        this.showProductForm = true;
      },
      searchSubmit() {
        this.initTableList();
      },
      searchReset() {
        this.formItems.data = {}
        this.initTableList();
      },
      selectChange(selection) {

      },
      pageChange(page) {
        this.condition = Object.assign({}, this.condition, page);
        this.initTableList();
      },
      rightClose() {
        this.showProductForm = false;
        this.initTableList();
      },
      buttonEditClick(row) {
        this.product = Object.assign({}, row);
        this.showProductForm = true;
      },
      buttonDeleteClick(row) {
        ApiFactory.getApi(Product).delete(row['productId']).then(() => {
          this.$notify.success({
            title: '提示',
            message: '删除成功'
          });
          this.rightClose();
        }).catch(() => {
          this.$notify.error({
            title: '提示',
            message: '删除失败'
          });
        }).catch(() => {
        })
      }
    }
  }
</script>

<style scoped>

</style>