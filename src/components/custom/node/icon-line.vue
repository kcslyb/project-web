<template>
  <div style="display: inline-block">
    <div v-if="nodes" class="node-parent">
      <template v-for="item of nodes">
        <node-line lineType="simple-vertical-top" label="top"></node-line>
        <node-icon :node="item" :space="setSpace()"></node-icon>
        <node-line lineType="simple-vertical" :space="setSpace()"></node-line>
      </template>
      <template v-for="item of setIconNumber()">
        <node-line
            lineType="simple-cross"
            :space="setSpace()"
            :iconNumber="setIconNumber()">
        </node-line>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';
    import NodeIcon from '@/components/custom/node/icon.vue';
    import NodeLine from '@/components/custom/node/line.vue';

    interface NodeType {
        id: string,
        sex: string
        name: string,
    }

    @Component({
        components: {NodeIcon, NodeLine}
    })
    export default class IconLineNode extends Vue {
        @Provide()
        name: string = 'IconLineNode';
        @Prop()
        props?: any;
        @Prop()
        space?: number;
        @Prop()
        childrenSpace?: number;
        @Prop()
        public nodes?: NodeType[];

        setSpace() {
            return this.space;
        }
        setIconNumber() {
            if (this.nodes && this.nodes.length) {
                return ((2 * this.nodes.length) - 2);
            }
            return 0;
        }
    }
</script>

<style scoped lang="scss">
  .node-parent {
    display: inline-block;
  }
</style>
