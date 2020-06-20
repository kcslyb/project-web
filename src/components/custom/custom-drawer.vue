<template>
  <transition name="slide-fade">
    <div class="page-right-wrap" v-show="show" @click="rightClose">
      <div class="page-right-part lightBox" @click.stop="" ref="pageRightPart" :style="style">
        <el-row :gutter="23">
          <el-col :span="22">
            <div style="text-align: center; margin-bottom: 10px">
              <span style="font-size: 20px; font-family: 'Songti TC'">{{title}}</span>
            </div>
          </el-col>
          <el-col :span="2">
            <el-button @click.stop.prevent="rightClose" circle icon="el-icon-close" size="mini"></el-button>
          </el-col>
        </el-row>
        <div class="page-right-main">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
  export default {
    name: 'CustomDrawer',
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
        this.$emit('update:show', false);
        this.$emit('right-close');
        this.$emit('rightClose');
        this.$emit('close');
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
</style>
