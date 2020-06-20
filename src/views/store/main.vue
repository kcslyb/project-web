<template>
  <div class="content">
    <div class="content-link">
      <div class="content-link-item">
        <template v-for="item in sortList">
          <el-button type="text">{{item}}</el-button>
        </template>
      </div>
    </div>
    <div class="content-type">
      <template v-for="item in 20">
        <el-card class="card-image">
          <el-image @click="cardImageClick(item)" class="image" src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2283798207,1396236835&fm=15&gp=0.jpg"></el-image>
        </el-card>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
  import {Component, Provide, Vue} from 'vue-property-decorator';

  @Component
  export default class StoreMain extends Vue {
    @Provide()
    public name: string = 'main';
    @Provide()
    public sortList: [string, string, string] = ['时间','人气', '综合'];
    cardImageClick(item: any) {
      console.info(item)
    }
  }
</script>

<style scoped>
  .content {
    width: 100%;
    box-sizing: border-box;
  }
  .content-menu{
    width: 100%;
    height: 400px;
    box-sizing: border-box;
  }
  .content-menu-left {
    width: 100%;
    height: 400px;
    overflow: hidden;
  }
  .content-menu-left .image {
    width: 100%;
    height: 100%;
  }
  .content-menu-right {
    position: absolute;
    top: 50px;
    right: 0;
    width: 20%;
    height: 400px;
    z-index: 2;
    background-color: rgba(0,0,0,0.3);
  }
  .content-link {
    width: 100%;
    padding: 5px;
    border-radius: 10px;
    display: flex;
    flex-wrap: wrap;
    text-align: right;
    align-items: center;
    box-sizing: border-box;
    justify-content: space-between;
    border-top: 1px solid #e6e6e6;
    border-bottom: 1px solid #e6e6e6;
  }
  .content-link-item {
    width: 100%;
    padding-right: 20px;
    text-align: right;
  }
  .content-type{
    width: 100%;
    padding: 0 50px;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
  .card-image {
    width: 18%;
    margin: 10px;
  }
</style>