<template>
  <transition name="slide-fade">
    <div class="page-right-wrap" v-show="show" @click="rightClose">
      <transition name="slide-fade">
        <div class="page-right-part lightBox" @click.stop="" ref="pageRightPart" :style="style">
          <div class="drawer-container">
            <el-row :gutter="23">
              <el-col :span="22">
                <div style="text-align: center; margin-bottom: 10px; border-bottom: 1px solid #e5e5e5;">
                  <span style="font-size: 20px;">{{title}}</span>
                </div>
              </el-col>
              <el-col :span="2">
                <el-button @click.stop.prevent="rightBtnClose" circle icon="el-icon-close" size="mini"></el-button>
              </el-col>
            </el-row>
            <div class="page-right-main">
              <slot></slot>
            </div>
            <div class="btn-list">
              <custom-button-list
                :btn-list="btnList"
                :text-align="btnTextAlign"
                @btn-click="btnClick"
              >
              </custom-button-list>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import { EventBus } from '../../mixin/event-bus'
  import CustomButtonList from "@/components/custom/custom-button-list";
  export default {
    name: 'CustomDrawer',
    components: {CustomButtonList},
    props: {
      title: {
        type: String,
        default: ''
      },
      show: {
        type: Boolean,
        default: false
      },
      css: {
        type: Object,
        default: () => {
        }
      },
      defaultWith: {
        type: Boolean,
        default: true
      },
      wrapperClosable: {
        type: Boolean,
        default: false
      },
      btnList: {
        type: Array,
        default: () => {
          return [
            {
              action: 'submit',
              label: '提交',
              type: 'success'
            }, {
              action: 'cancel',
              label: '取消',
              type: 'info'
            }
          ]
        }
      },
      btnTextAlign: {
        type: String,
        default: 'right'
      },
      event: {
        type: String,
      }
    },
    computed: {
      style() {
        let defaultObj = {};
        if (this.defaultWith) {
          defaultObj = Object.assign(defaultObj, {width: '600px', padding: '20px', height: '100%'})
        }
        if (window.innerWidth < 650){
          defaultObj.width = window.innerWidth + 'px';
        }
        let cssArr = [];
        let obj = {};
        obj = Object.assign({}, defaultObj, this.css);
        for (let i in obj) {
          cssArr.push(i + ':' + obj[i]);
        }
        return cssArr.join(';');
      }
    },
    methods: {
      rightClose () {
        if (this.wrapperClosable) {
          this.rightBtnClose()
        }
      },
      rightBtnClose () {
        this.$emit('update:show', false);
        this.$emit('right-close');
        this.$emit('rightClose');
        this.$emit('close');
      },
      btnClick(item) {
        let process = {
          submit: () => {
            if (!this.event) {
              this.$emit('on-submit')
            } else {
              EventBus.$emit(`on-${this.event}-submit`)
            }
          },
          cancel: () => {
            this.$emit('update:show', false)
          }
        }
        process[item.action].call(this)
      }
    }
  };
</script>

<style scoped>
  .page-right-wrap{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: rgba(0,0,0,0.7);
  }
  .page-right-part{
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    overflow: auto;
    background-color: #fff;
    border: 1px solid #e6e6e6;
  }
  .page-right-main{
    padding: 10px;
  }
  .lightBox {
    position: absolute;
    z-index: 1000;
  }
  /* 可以设置不同的进入和离开动画 */
  /* 设置持续时间和动画函数 */
  .slide-fade-enter-active {
    transition: all .5s ease;
  }
  .slide-fade-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }

  .drawer-container {
    display: flex;
    flex-flow: column;
    height: calc(100% - 40px);
  }
  .page-right-main {
    flex: 1;
  }
  .btn-list {
    border-top: 1px solid #e6e6e6;
    padding-top: 10px;
  }
</style>
