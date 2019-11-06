<template>
  <div style="">
    <div>
      <icon-line :nodes="parent" :space="space"></icon-line>
    </div>
    <div style="transform: translate(50px, -10px)">
      <cross-line :number="brother.length" :space="setBrotherSpace()"></cross-line>
    </div>
    <div style="transform: translate(76px, 39px);">
      <icon-line :nodes="brother" :children-space="setSpace()"></icon-line>
      <div :style="'transform: translate(' + getTranslateWidth() + 'px, -55px)'">
        <icon-line :nodes="[self]"></icon-line>
      </div>
    </div>
    <div :style="'transform: translate(' + (getTranslateWidth()-25) + 'px, 25px)'">
      <div :style="'transform: translate(' + -25 + 'px, -50px)'">
        <cross-line :number="2" :space="setBrotherSpace()"></cross-line>
      </div>
      <icon-line :nodes="children" :space="(space/2)"></icon-line>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';
    import NodeIcon from '@/components/custom/node/icon.vue';
    import NodeLine from '@/components/custom/node/line.vue';
    import IconLine from '@/components/custom/node/icon-line.vue';
    import CrossLine from '@/components/custom/node/cross-line.vue';

    interface NodeType {
        id: string,
        sex: string
        name: string,
    }

    @Component({
        components: {CrossLine, IconLine, NodeIcon, NodeLine}
    })
    export default class CustomNode extends Vue {
        @Provide()
        name: string = 'CustomNode';
        @Prop()
        props?: any;
        @Prop({default: 100})
        space!: number;
        @Prop()
        self!: NodeType;
        @Prop({default: () => []})
        public parent!: NodeType[];
        @Prop({default: () => []})
        public children!: NodeType[];
        @Prop({default: () => []})
        public brother!: NodeType[];

        setSpace() {
            let parentLength = this.parent.length;
            let childrenLength = this.children.length;
            return ((parentLength - 1) * this.space / childrenLength);
        }

        setBrotherSpace() {
            let parentLength = this.brother.length;
            return ((parentLength - 1) * this.setSpace());
        }

        getTranslateWidth() {
            if (this.brother && this.brother.length) {
                return (this.brother.length + 1) * this.space;
            }
            return 0;
        }
    }
</script>

<style scoped lang="scss">
  .node-parent {
    display: inline-block;
  }

  .simple-cross {
    width: 50px;
    border-top: 1px solid $default-border-color;
  }
</style>
