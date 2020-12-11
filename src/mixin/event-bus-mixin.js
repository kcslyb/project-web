import {EventBus} from './event-bus'
import {CustomUtils} from '../utils/common-utils'

const EventBusMixin = {
  props: {
    event: {
      type: String
    }
  },
  mounted () {
    EventBus.$on(`on-${this.event}-submit`, () => {
      const methodName = `handle${CustomUtils.replaceStr(this.event)}Submit`
      if (Object.prototype.hasOwnProperty.call(this, methodName)) {
        this[methodName]()
      } else {
        throw new Error(`需要添加方法名为：${methodName}的方法来处理点击事件：on-${this.event}-submit`)
      }
    })
  },
}
export default EventBusMixin
