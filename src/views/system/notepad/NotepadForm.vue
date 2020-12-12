<template>
  <custom-form
    ref="Notepad"
    v-model="formData"
    :rules="formItems.rules"
    :form-items="formItems.items"
  ></custom-form>
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
        this.formItems = NotepadJson.formItems
      },
      handleNotepadSubmit (operation) {
        this.$refs.Notepad.$refs.formName.validate(valid => {
          if (valid) {
            const action = !this.formData[operation.vm.objectIdLabel] ? 'post' : 'put'
            console.info(action)
            console.info(operation.vm.actionLabel)
            operation.apiObj[action](this.formData).then(res => {
              if (res.status === 200) {
                this.notifyTip(`${operation.vm.actionLabel}成功`, 'success')
                this.handleDrawerClose()
              }
            })
          } else {
            this.notifyTip('存在必填项填写！')
          }
        })
      },
      handleNotepadEdit (otpDto) {
        otpDto.operation.apiObj.queryById(otpDto.id).then(res => {
          if (res.status === 200) {
            this.formData = res.data
          }
        })
      }
    }

  }
</script>

<style scoped>

</style>
