<template>
  <div class="notify-container custom-scrollbar" :style="'height: '+ defaultHeight +'px;'">
    <div class="left-container">
      <el-timeline>
        <template v-for="item of notifyList">
          <el-timeline-item :timestamp="$formatDateTimeString(item.noteModifyTime)" placement="top">
            <el-card>
              <h4>{{item.noteTitle}}</h4>
              <p style="text-indent: 28px">{{item.noteContent}}</p>
              <p style="float: right">{{item.noteCreated}} </p>
            </el-card>
          </el-timeline-item>
        </template>
      </el-timeline>
    </div>
    <div style="clear: right"></div>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {ApiFactory, Note} from '@/resources';

    @Component
    export default class Notify extends Vue {
        @Provide()
        public notifyList: [] = [];
        @Provide()
        public defaultHeight: number = window.innerHeight - 120;

        mounted() {
            ApiFactory.getApi(Note).query({}).then(res => {
                this.notifyList = res.data;
            })
        }
    }
</script>

<style scoped lang="scss">
  .notify-container {
    width: 100%;
    overflow-y: scroll;
  }

  .left-container {
    width: 60%;
    padding: 10px;
    display: inline-block;
  }

  .notify-width {
    width: 100%;
  }

  .notify-content-container {
    width: 30%;
    float: right;
    padding: 10px;
    text-align: left;
    background-color: #EEF5FE;
    @include border-radius-base(10px);
  }

  .card-margin {
    margin-bottom: 2rem;
  }

  .operation {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid #e6e6e6;
  }

  .notify-title .item-float-right {
    font-size: 0.6rem;
    color: #2e2e2e;
  }

  .notify-title .item-title {
    font-size: 1.2rem;
    color: #000;
  }

  .item-block {
    display: inline-block;
  }

  .item-float-right {
    float: right;
  }

  .notify-releases {
    color: #000;
    font-size: 0.8rem;
    border-bottom: 1px solid #e6e6e6;
  }

  .notify-content {
    padding-top: 10px;
    color: #2e2e2e;
  }
</style>
