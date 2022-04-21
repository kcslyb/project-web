<template>
  <div
    :id="elementId"
    :class="['resize-box', `${showHandler ? 'box-selected' : ''}`]"
    v-click-outside="outsideClick"
    @click="handleClick">
    <div v-show="showHandler">
      <div
        :key="handle"
        v-for="handle of handlers"
        :class="['handler', `handler-${handle}`]"
        @mousedown.prevent.stop="startResize($event, handle)">
        <svg-circle></svg-circle>
      </div>
    </div>
    <slot></slot>
  </div>
</template>

<script>
import ClickOutside from 'element-ui/src/utils/clickoutside'
import SvgCircle from '../components/svg-circle'
import {generateId} from 'element-ui/src/utils/util'

export default {
  name: 'resize-box',
  components: {SvgCircle},
  directives: {
    ClickOutside
  },
  data () {
    return {
      curDom: {},
      startPort: [],
      elementId: '',
      showHandler: false,
      resizeHandler: ''
    }
  },
  props: {
    handlers: {
      type: Array,
      default: () => {
        return ['tl', 'tm', 'tr', 'mr', 'br', 'bm', 'bl', 'ml']
      }
    }
  },
  created () {
    this.elementId = generateId()
  },
  mounted () {
    this.curDom = document.getElementById(this.elementId)
  },
  methods: {
    startResize (e, handler) {
      const {screenX, screenY} = e
      this.resizeHandler = handler
      this.startPort = [screenX, screenY]
      document.addEventListener('mousemove', this.resize)
      document.addEventListener('mouseup', this.endResize)
      document.addEventListener('mouseleave', this.endResize)
    },
    resize (e) {
      const {screenX, screenY} = e
      const {offsetWidth, offsetHeight} = this.curDom
      const [x, y] = this.startPort
      this.startPort = [screenX, screenY]
      const dom = document.getElementById(this.elementId)
      const processor = {
        tmResize: () => {
          dom.style.height = `${offsetHeight - (screenY - y)}px`
        },
        trResize: () => {
          dom.style.width = `${offsetWidth + (screenX - x)}px`
          dom.style.height = `${offsetHeight - (screenY - y)}px`
        },
        tlResize: () => {
          dom.style.width = `${offsetWidth - (screenX - x)}px`
          dom.style.height = `${offsetHeight - (screenY - y)}px`
        },
        bmResize: () => {
          dom.style.height = `${offsetHeight + (screenY - y)}px`
        },
        mrResize: () => {
          dom.style.width = `${offsetWidth + (screenX - x)}px`
        },
        brResize: () => {
          dom.style.width = `${offsetWidth + (screenX - x)}px`
          dom.style.height = `${offsetHeight + (screenY - y)}px`
        },
        mlResize: () => {
          dom.style.width = `${offsetWidth - (screenX - x)}px`
        },
        blResize: () => {
          dom.style.width = `${offsetWidth - (screenX - x)}px`
          dom.style.height = `${offsetHeight + (screenY - y)}px`
        }
      }
      processor[`${this.resizeHandler}Resize`]()
    },
    endResize () {
      const dom = document.getElementById(this.elementId)
      this.$emit('size-change', [dom.style.width, dom.style.height])
      document.removeEventListener('mousemove', this.resize)
      document.removeEventListener('mouseup', this.endResize)
      document.removeEventListener('mouseleave', this.endResize)
    },
    handleClick () {
      this.showHandler = true
    },
    outsideClick () {
      this.showHandler = false
    }
  }
}
</script>

<style scoped lang="scss">
.resize-box {
  display: inline-block;
}

.box-selected {
  position: relative;
  outline: rgb(66, 135, 255) solid 1px;
}

.handler {
  position: absolute;
  width: 10px;
  height: auto;
}

.handler-tl {
  top: -10px;
  left: -5px;
  cursor: nw-resize;
}

.handler-tm {
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  cursor: n-resize;
}

.handler-tr {
  top: -10px;
  right: -5px;
  cursor: ne-resize;
}

.handler-mr {
  top: 50%;
  right: -5px;
  transform: translateY(-50%);
  cursor: e-resize;
}

.handler-br {
  bottom: -10px;
  right: -5px;
  cursor: nw-resize;
}

.handler-bm {
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  cursor: n-resize;
}

.handler-bl {
  bottom: -10px;
  left: -5px;
  cursor: ne-resize;
}

.handler-ml {
  top: 50%;
  left: -5px;
  transform: translateY(-50%);
  cursor: e-resize;
}
</style>
