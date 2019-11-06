<template>
  <div class="loading" :style="style">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</template>

<script>
  export default {
    name: 'CustomLogo',
    props: {
      width: {
        type: Number,
        default: 40
      },
      color: {
        type: String,
        default: '42b983'
      },
      css: {
        type: Object,
        default: () => {}
      }
    },
    computed: {
      style() {
        let defaultObj = {
          width: this.width + 'px',
          height: this.width + 'px',
          'background-color': '#' + this.color
        };
        let cssArr = [];
        let obj = Object.assign({}, defaultObj, this.css);
        for (let i in obj) {
          cssArr.push(i + ':' + obj[i]);
        }
        return cssArr.join(';');
      }
    }
  }
</script>

<style scoped>
  .loading {
    position: relative;
    border-radius: 50%;
  }

  .loading div {
    width: 50%;
    height: 50%;
    position: absolute;
    border-radius: 50%;
    animation: move 2s linear infinite;
    -ms-filter: blur(10px);
    filter: blur(10px);
  }

  @keyframes move {
    0%, 100% {
      transform: translate(0, 0);
    }
    25% {
      transform: translate(100%, 0);
    }
    50% {
      transform: translate(100%, 100%);
    }
    75% {
      transform: translate(0, 100%);
    }
  }

  .loading div:nth-child(1) {
    background: khaki;
    -webkit-animation-delay: 0s;
    -moz-animation-delay: 0s;
    -o-animation-delay: 0s;
    animation-delay: 0s;
  }

  .loading div:nth-child(2) {
    background: orange;
    -webkit-animation-delay: -0.5s;
    -moz-animation-delay: -0.5s;
    -o-animation-delay: -0.5s;
    animation-delay: -0.5s;
  }

  .loading div:nth-child(3) {
    background: khaki;
    -webkit-animation-delay: -1s;
    -moz-animation-delay: -1s;
    -o-animation-delay: -1s;
    animation-delay: -1s;
  }

  .loading div:nth-child(4) {
    background: navajowhite;
    -webkit-animation-delay: -1.5s;
    -moz-animation-delay: -1.5s;
    -o-animation-delay: -1.5s;
    animation-delay: -1.5s;
  }
</style>
