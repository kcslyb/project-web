<template>
  <div class="custom-collapse">
    <div class="custom-collapse-warp">
      <div class="custom-collapse-header">
        <span @click="flag = !flag">{{flag?'隐藏':'展开'}}搜索</span>
        <i :class="flag ? 'el-icon-arrow-down': 'el-icon-arrow-right'" @click="flag = !flag"></i>
      </div>
      <div v-if="flag" class="custom-collapse-content">
        <slot></slot>
      </div>
      <div style="clear: right"></div>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CustomCollapse extends Vue {
        @Provide()
        public name: string = 'CustomCollapse';

        @Prop({default: false})
        public searchFlag!: boolean;

        @Provide()
        public flag: boolean = this.searchFlag;
    };
</script>

<style scoped lang="scss">
  .custom-collapse {
    width: 100%;
  }

  .custom-collapse-warp {
    padding: 10px 0;
    background-color: $system-collapse-color;
  }

  .custom-collapse-header {
    height: 40px;
    margin: 0 10px;
    padding-top: 10px;
    font-size: 0.8rem;
    text-align: right;
    color: $black-color;
    box-sizing: border-box;
    background-color: $system-collapse-color;
    border: 1px solid $system-border-color;

    & i {
      cursor: pointer;
      padding-right: 10px;
    }

    & span {
      cursor: pointer;
    }
  }

  .custom-collapse-content {
    padding: 20px;
    margin: 0 10px;
    font-size: 0.8rem;
    color: $black-color;
    background-color: $white-color;
    border: 1px solid $system-border-color;
  }
</style>
