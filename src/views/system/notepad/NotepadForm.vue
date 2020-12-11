<template>
  <div>
    <custom-form
      v-model="formData"
      :rules="formItems.rules"
      :form-items="formItems.items"
    ></custom-form>
  </div>
</template>

<script>
  import NotepadJson from './json/notepad'
  import EventBusMixin from '../../../mixin/event-bus-mixin'
  import CustomForm from '../../../components/custom/custom-form'
  export default {
    name: 'NotepadForm',
    mixins: [EventBusMixin],
    components: {CustomForm},
    data () {
      return {
        formData: {},
        formItems: {}
      }
    },
    created () {
      this.initData()
    },
    methods: {
      initData () {
        this.formItems = NotepadJson.searchItems
      }
    }

  }
</script>

<style scoped>

</style>
