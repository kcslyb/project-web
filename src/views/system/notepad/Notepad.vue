<template>
  <CustomPage
    event="notepad"
    class="height-full"
    :api-obj="apiObj"
    :css="{width: '700px'}"
    :form-items="formItems"
    :table-data="tableData"
    :table-column="tableColumns"
  >
    <notepad-form event="notepad" slot="form"></notepad-form>
  </CustomPage>
</template>

<script>
  import NotepadJson from "./json/notepad";
  import {ApiFactory, DayLog} from "../../../resources";
  import NotepadForm from "./NotepadForm";

  export default {
    name: 'Notepad',
    components: {NotepadForm},
    data () {
      return {
        apiObj: {},
        formItems: {},
        tableData: [],
        tableColumns: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.apiObj = ApiFactory.getApi(DayLog)
        this.formItems = NotepadJson.searchItems
        this.tableColumns = NotepadJson.tableColumn
      }
    }
  }
</script>

<style scoped>

</style>
