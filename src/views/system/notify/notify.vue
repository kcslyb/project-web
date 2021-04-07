<template>
  <div class="notify-container">
    <div class="content-container custom-scrollbar" :style="'height: '+ defaultHeight +'px;'">
      <custom-button-list
        :btn-list="[{
          action: 'post',
          label: '新增',
          type: 'primary',
          perm: 'add-notify-manage'
        }]"
        @btn-click="handleBtnClick">
      </custom-button-list>
      <el-timeline>
        <template v-for="item of notifyList">
          <el-timeline-item :timestamp="$formatDateTimeString(item.noteModifyTime)" placement="top">
            <el-card>
              <div class="card-title">
                <h4>{{item.noteTitle}}</h4>
                <div>
                  <custom-perm label="update-notify-manage">
                    <span class="btn-item" @click="handleEdit">修改</span>
                  </custom-perm>
                  <custom-perm label="delete-notify-manage">
                    <span class="btn-item" @click="handleDelete">删除</span>
                  </custom-perm>
                </div>
              </div>
              <p class="note-content" style="text-indent: 28px">{{item.noteContent}}</p>
              <p style="float: right">{{item.noteCreated}} </p>
            </el-card>
          </el-timeline-item>
        </template>
      </el-timeline>
    </div>
  </div>
</template>

<script lang="ts">
    import {Component, Provide, Vue} from 'vue-property-decorator';
    import {ApiFactory, Note} from '@/resources';
    import LogList from "@/views/system/logger/log-list.vue";
    import CustomButtonList from "@/components/custom/custom-button-list.vue";
    import CustomPerm from "@/components/custom/custom-perm.vue";
    @Component({
      components: {CustomPerm, CustomButtonList, LogList}
    })
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
        public handleBtnClick() {
          console.info('handleBtnClick')
        }
        public handleDelete() {
          console.info('handleDelete')
        }
        public handleEdit() {
          console.info('handleEdit')
        }
    }
</script>

<style scoped lang="scss">
  .notify-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    text-align: center;
  }

  .content-container {
    width: 60%;
    padding: 10px;
    display: inline-block;
    box-sizing: border-box;
    text-align: left;
    overflow-y: scroll;

    .card-title {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .btn-item {
        cursor: pointer;
        padding: 0 0 0 10px;
        color: #007bff;
      }
    }
  }

  .note-content {
    font-size: 14px;
    color: #5e6d82;
    line-height: 1.5em;
  }

  .notify-width {
    width: 100%;
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
