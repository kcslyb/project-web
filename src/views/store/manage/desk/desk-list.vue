<template>
  <div>
    <custom-page
      title="包间"
      :api-obj="apiObj"
      :form-items="formItems"
      object-id-label="deskId"
      :table-column="tableColumn"
      @cellButtonClick="cellButtonClick">
      <templete slot="form">
        <desk-form></desk-form>
      </templete>
    </custom-page>
  </div>
</template>

<script>
  import {formItems, tableColumn} from "../desk/desk-list-json";
  import {ApiFactory, Desk} from "../../../../resources";
  import Operation from "../../../../operation/operation";
  import DeskForm from "./desk-form";

  export default {
    name: "desk-list",
    components: {DeskForm},
    data() {
      return {
        tableColumn: [],
        formItems: {
          data: {},
          items: [],
          rules: {}
        },
        apiObj: {}
      }
    },
    created() {
      this.initData()
    },
    methods: {
      initData() {
        this.tableColumn = tableColumn;
        this.formItems.items = formItems;
        this.apiObj = ApiFactory.getApi(Desk)
      },
      cellButtonClick(row, label, action) {
        let process = {
          disable: '0',
          enable: '1'
        };
        row['deskStatus'] = process[action];
        Operation.getInstance(this).operation({actionLabel: label, action: 'put'}, row)
      }
    }
  }
</script>

<style scoped>

</style>