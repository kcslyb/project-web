<template>
  <div class="custom-button-list">
    <template v-for="(item, index) in btnList">
      <el-button
        :key="index+item.action"
        :type="item.type"
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
      }
    },
    methods: {
      btnClick(item) {
        this.$emit(item.action);
      }
    }
  }
</script>

<style scoped>
  .custom-button-list {
    text-align: right;
  }
</style>