<template>
  <CustomPage
    event="notepad"
    class="height-full"
    :api-obj="apiObj"
    :css="{width: '700px'}"
    :search-items="searchItems"
    :table-column="tableColumns"
  >
    <notepad-form
      slot="form"
      event="notepad">
    </notepad-form>
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
        searchItems: [],
        tableColumns: []
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.apiObj = ApiFactory.getApi(DayLog)
        this.searchItems = NotepadJson.searchItems
        this.tableColumns = NotepadJson.tableColumn
      }
    }
  }
</script>

<style scoped>

</style>
