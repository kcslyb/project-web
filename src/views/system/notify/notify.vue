<template>
  <div class="notify-container">
    <div class="left-container">
      <div class="block">
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
    </div>
<!--    <div class="notify-content-container">-->
<!--      <template v-for="item of notifyList">-->
<!--        <el-card class="box-card card-margin">-->
<!--          <div class="notify-width">-->
<!--            <custom-perm label="operation-notify-manage">-->
<!--              <div class="item-float-right operation">-->
<!--                <custom-perm label="start-notify-manage">-->
<!--                  <el-button class="mg-r10" type="success" plain size="mini">start</el-button>-->
<!--                </custom-perm>-->
<!--                <custom-perm label="stop-notify-manage">-->
<!--                  <el-button class="mg-r10" type="warning" plain size="mini">stop</el-button>-->
<!--                </custom-perm>-->
<!--                <custom-perm label="update-notify-manage">-->
<!--                  <el-button class="mg-r10" type="primary" plain size="mini">update</el-button>-->
<!--                </custom-perm>-->
<!--                <custom-perm label="delete-notify-manage">-->
<!--                  <el-button type="danger" plain size="mini">delete</el-button>-->
<!--                </custom-perm>-->
<!--              </div>-->
<!--            </custom-perm>-->
<!--            <div style="clear: right"></div>-->
<!--            <div class="notify-title">-->
<!--              <div class="item-block item-title">{{item.noteTitle}}</div>-->
<!--              <div class="item-block item-float-right">{{$formatDateTimeString(item.noteModifyTime)}}</div>-->
<!--            </div>-->
<!--            <div class="notify">-->
<!--              <div class="notify-releases">-->
<!--                releases：{{item.noteCreated}}-->
<!--              </div>-->
<!--              <div class="notify-content">-->
<!--                {{item.noteContent}}-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--        </el-card>-->
<!--      </template>-->
<!--    </div>-->
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
  }

  .left-container {
    width: 60%;
    display: inline-block;
    padding: 10px;
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
