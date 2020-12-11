<template>
  <div :class="`custom-button-${textAlign}`">
    <template v-for="(item, index) in btnList">
      <el-button
        :type="item.type"
        :key="index+item.action"
        :size="item.size ? item.size : 'mini'"
        @click="btnClick(item)">
        {{item.label}}
      </el-button>
    </template>
  </div>
</template>

<script>
  export default {
    name: "custom-button-list",
    props: {
      btnList: {
        type: Array,
        default: () => {
          return [
            {
              action: 'submit',
              label: '提交',
              type: 'success'
            }, {
              action: 'cancel',
              label: '取消',
              type: 'info'
            }
          ]
        }
      },
      textAlign: {
        type: String,
        default: 'right'
      }
    },
    methods: {
      btnClick(item) {
        this.$emit(item.action)
        this.$emit('btn-click', item)
      }
    }
  }
</script>

<style scoped>
  .custom-button-right {
    text-align: right;
  }
  .custom-button-left {
    text-align: left;
  }
  .custom-button-center {
    text-align: center;
  }
</style>
