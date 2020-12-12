import {EventBus} from './event-bus'
import {CustomUtils} from '../utils/common-utils'
import de from "element-ui/src/locale/lang/de";

const EventBusMixin = {
  props: {
    event: {
      type: String
    }
  },
  mounted () {
    EventBus.$on(`on-${this.event}-submit`, (operation) => {
      const methodName = `handle${CustomUtils.replaceStr(this.event)}Submit`
      if (Object.prototype.hasOwnProperty.call(this, methodName)) {
        this[methodName](operation)
      } else {
        throw new Error(`需要添加方法名为：${methodName}的方法来处理点击事件：on-${this.event}-submit`)
      }
    })
    EventBus.$on(`on-${this.event}-edit`, (otpDto) => {
      const methodName = `handle${CustomUtils.replaceStr(this.event)}Edit`
      if (Object.prototype.hasOwnProperty.call(this, methodName)) {
        this[methodName](otpDto)
      } else {
        throw new Error(`需要添加方法名为：${methodName}的方法来处理点击事件：on-${this.event}-edit`)
      }
    })
  },
  methods: {
    notifyTip (message, type = 'warning', title = '提示！') {
      this.$notify({
        type: type,
        title: title,
        message: message
      })
    },
    handleDrawerClose () {
      EventBus.$emit(`on-${this.event}-close`)
    }
  }
}
export default EventBusMixin
