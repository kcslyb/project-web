<template>
  <div class="cross-line-container">
    <div class="cross-simple-vertical"
         :style="'width: ' + (getWidth()) + 'px;transform: translate(' + (getTranslate(2) + 2) + 'px,' + (28) +'px)'"></div>
    <template v-for="index of number">
      <div class="cross-simple-cross"
           :style="'width: ' + (getWidth()) + 'px;transform: translate(' + getTranslate(index) + 'px,' + (28- index) +'px)'"></div>
    </template>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class CrossLine extends Vue {
        @Prop({default: 0})
        number!: number;
        @Prop({default: 50})
        space!: number;

        getWidth() {
            return this.space;
        }

        getTranslate(index: number) {
            return index * this.space + (this.space / 2);
        }
    }
</script>

<style scoped lang="scss">
  .cross-line-container {
    display: inline-block;
  }

  .cross-simple-vertical {
    height: 25px;
    transform-origin: 0;
    border-left: 1px solid $default-border-color;
    transform: translate(-26px, 28px);
  }

  .cross-simple-cross {
    transform-origin: 0;
    border-top: 1px solid $default-border-color;
  }
</style>
