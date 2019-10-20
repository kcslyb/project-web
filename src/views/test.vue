<template>
  <div>
    <custom-perm label="system-manage">
      <el-button @click="show = !show">button</el-button>
    </custom-perm>
    <custom-drawer title="drawer" :show.sync="show">
      <custom-logo :width="40"></custom-logo>
    </custom-drawer>
    <el-drawer></el-drawer>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    @Component
    export default class Index extends Vue {
    @Provide() public show: boolean = false;
    }
</script>

<style scoped>

</style>
