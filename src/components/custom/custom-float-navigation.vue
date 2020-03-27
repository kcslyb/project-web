<template>
  <el-popover
    :placement="placement"
    :width="width"
    :trigger="trigger"
    @hide="hide"
    @show="show">
    <slot name="content">
      <div class="nav">
        <span class="slider icon-nav-slider" :style="'top: ' + currentTop + 'px;'"></span>
        <template v-for="(item, index) in menuList">
          <div @click="click(item, index)"class="cate-item"><span>{{item.index}}</span><a>{{item.label}}</a></div>
        </template>
      </div>
    </slot>
    <div slot="reference" class="icon-nav-hide">{{label}}<i
      :class="[isShow ? 'el-icon-caret-right' : 'el-icon-caret-left'] "></i></div>
  </el-popover>
</template>

<script>
export default {
  name: "CustomFloatNavigation",
  props: {
    active: {
      type: Number,
      default: '1'
    },
    menuList: {
      type: Array,
      default: () => []
    },
    trigger: {
      type: String,
      default: 'hover'
    },
    label: {
      type: String,
      default: '导航'
    },
    placement: {
      type: String,
      default: 'left-start'
    },
    width: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      isShow: false,
      activeIndex: this.active
    }
  },
  computed: {
    currentTop() {
      return (this.activeIndex -1)*23 + 18;
    }
  },
  methods: {
    hide() {
      this.isShow = false;
      this.$emit('hide');
    },
    show() {
      this.isShow = true;
      this.$emit('hide');
    },
    click(item, index) {
      console.info(item);
      this.activeIndex = index + 1;
      this.$emit('click', item);
    }
  }
}
</script>

<style scoped>
.icon-nav-hide {
  position: fixed;
  right: 0;
  top: 24px;
  width: 20px;
  height: 62px;
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  border: solid 1px #8492a6;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: rgb(0,187,136);
}

.nav {
  padding: 0;
}
.nav .slider {
  position: absolute;
  width: 14px;
  height: 10px;
  left: -7px;
  z-index: 100;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  background-color: rgb(0,187,136);
}

.nav:after {
  content: '';
  position: absolute;
  left: -6px;
  width: 6px;
  height: 6px;
  background-color: white;
  border: 2px solid #D1D1D1;
  border-radius: 6px;
}

.nav:before {
  content: '';
  position: absolute;
  top: -4px;
  left: -6px;
  width: 6px;
  height: 6px;
  background-color: white;
  border: 2px solid #D1D1D1;
  border-radius: 6px;
}

.cate-item:hover {
  border-radius: 6px;
  background-color: #f5f5f5;
  box-shadow: 1px 3px #d1d1d1;
}
.cate-item {
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  border: 1px solid white;
}

.cate-item span{
  padding: 0 10px;
  font-weight: 700;
  font-size: 15px;
}

</style>