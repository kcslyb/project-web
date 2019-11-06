<template>
  <div class="line-container">
    <div v-if="label === 'top'" :class="lineType" :style="'transform: translate(' + (childrenSpace/2*3 + iconNumber) + 'px,' + (childrenSpace/2 + iconNumber) +'px)'">

    </div>
    <div v-else :class="lineType"
         :style="iconNumber ? 'width: ' + (getWidth() + 1) + 'px;transform: translate(-' + getTranslate() + 'px, 24px)' :
          'transform: translate(-' + getWidth()/2 + 'px, 24px)'"></div>
  </div>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';

    @Component
    export default class NodeLine extends Vue {
        @Prop()
        lineType?: string;
        @Prop()
        label?: string;
        @Prop()
        iconNumber?: number;
        @Prop()
        space?: number;
        @Prop()
        childrenSpace?: number;
        getWidth() {
            if (this.space) {
                return this.space;
            }
            return 50;
        }
        getTranslate() {
            if (this.iconNumber) {
                return ((this.iconNumber-1)*this.getWidth() + this.getWidth()/2*3 + this.iconNumber)
            }
        }
    }
</script>

<style scoped lang="scss">
  .line-container {
    display: inline-block;
  }

  .simple-vertical {
    height: 25px;
    transform-origin: 0;
    border-left: 1px solid $default-border-color;
    transform: translate(-26px, 28px);
  }
  .simple-vertical-top {
    height: 30px;
    transform-origin: 0;
    border-left: 1px solid $default-border-color;
    transform: translate(75px, -50px);
  }

  .simple-cross {
    transform-origin: 0;
    width: 50px;
    border-top: 1px solid $default-border-color;
  }
</style>
