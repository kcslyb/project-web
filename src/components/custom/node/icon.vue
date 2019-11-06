<template>
  <div class="node-container" :style="'margin-left:' + space +'px'">
    <el-tooltip class="item" effect="dark" placement="right">
      <div slot="content">
        <template v-for="value of node">
          {{value}}<br/>
        </template>
      </div>
      <div class="node-item" :style="'margin: 0 ' + (space-50)/2 + 'px'">{{node.name}}</div>
    </el-tooltip>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Prop, Vue} from 'vue-property-decorator';

    interface NodeType {
        id: string,
        sex: string
        name: string,
    }

    @Component
    export default class NodeIcon extends Vue {
        @Provide()
        name: string = 'Node';
        @Prop()
        props?: any;
        @Prop()
        space?: number;
        @Prop()
        node!: NodeType;
    }
</script>

<style scoped lang="scss">
  .node-container {
    display: inline-block;
    margin-left: 50px;
  }
  .node-item {
    width: 50px;
    height: 50px;
    overflow: hidden;
    text-align: center;
    padding: 10px 0;
    @include border-radius-base(25px);
    @include border-base($default-border-color)
  }
</style>
