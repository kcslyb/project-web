<template>
  <custom-page
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
  </custom-page>
</template>

<script>
  import NotepadJson from "./json/notepad";
  import NotepadForm from "./NotepadForm";
  import {ApiFactory, DayLog} from "../../../resources";
  import CustomPage from "../../../components/custom/custom-page";

  export default {
    name: 'Notepad',
    components: {CustomPage, NotepadForm},
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
