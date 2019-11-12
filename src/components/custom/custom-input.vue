<template>
  <div>
    <el-input :type="type"
              :maxlength="maxlength"
              show-word-limit
              :rows="rowNumber"
              :size="size" v-model="valueString"
              :placeholder="placeholder"></el-input>
    <span style="color: #F56C6C; font-size: 0.2em;"
          v-show="!Object.is(result, 0) && !Object.is(result, maxlength)">
      {{Object.is(result, 0) ? '无法再输入!' : '还能输入' + result + '个字符'}}
    </span>
  </div>
</template>

<script>
  export default {
    name: 'CustomFeedback',
    props: {
      rowNumber: {
        type: Number,
        default: 1
      },
      type: {
        type: String,
        default: ''
      },
      maxlength: {
        type: Number,
        default: 10
      },
      placeholder: {
        type: String,
        default: '请输入内容'
      },
      size: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        result: this.maxlength,
        valueString: ''
      };
    },
    watch: {
      valueString(v, o) {
        this.changeNumber(v, o);
      }
    },
    methods: {
      changeNumber(v, o) {
        this.result = this.maxlength > this.valueString.length > 0 ? this.maxlength - this.valueString.length : 0;
        if (this.result <= -1) {
          this.valueString = v.substring(0, this.maxlength);
        } else {
          this.valueString = v;
        }
        this.$emit('input', this.valueString);
      }
    }
  };
</script>

<style scoped>

</style>
