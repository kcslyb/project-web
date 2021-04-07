<template>
  <div>
    <div id="myCanvas"></div>
  </div>
</template>

<script>
  export default {
    name: "node",
    props: {
      content: {
        type: String,
        default: ''
      },
      left: {
        type: Boolean,
        default: true
      },
      right: {
        type: Boolean,
        default: true
      },
      top: {
        type: Boolean,
        default: true
      },
      topLeft: {
        type: Boolean,
        default: true
      },
      topRight: {
        type: Boolean,
        default: true
      },
      bottom: {
        type: Boolean,
        default: true
      },
      bottomLeft: {
        type: Boolean,
        default: true
      },
      bottomRight: {
        type: Boolean,
        default: true
      }
    },
    created() {
      this.initCanvas()
    },
    methods: {
      initCanvas() {
        this.$nextTick(() => {
          this.initDraw()
        })
      },
      initDraw () {
        const canvas = this.getCanvasInstance()
        this.drawRound(canvas, 50, 50)

        if ((this.content.length >>> 0) > 0) {
          this.drawText(canvas, 40, 55, this.content.substring(0, 1))
        }
        if (this.top) {
          this.drawLine(canvas, 50, 0, 50, 20)
        }
        if (this.right) {
          this.drawLine(canvas, 80, 50, 100, 50)
        }
        if (this.bottom) {
          this.drawLine(canvas, 50, 80, 50, 100)
        }
        if (this.left) {
          this.drawLine(canvas, 0, 50, 20, 50)
        }
        // this.drawLine(canvas, 50, 0, 50, 20)
        // this.drawLine(canvas, 80, 50, 100, 50)
        // this.drawLine(canvas, 50, 80, 50, 100)
        // this.drawLine(canvas, 0, 50, 20, 50)

        const temp = Math.sqrt(Math.pow(30, 2) / 2)
        if (this.topLeft) {
          this.drawLine(canvas, 0, 0, 50 - temp, 50 - temp)
        }
        if (this.topRight) {
          this.drawLine(canvas, 50 + temp, 50 - temp, 100, 0)
        }
        if (this.bottomRight) {
          this.drawLine(canvas, 50 + temp, 50 + temp, 100, 100)
        }
        if (this.bottomLeft) {
          this.drawLine(canvas, 0, 100, 50 - temp, 50 + temp)
        }
        // this.drawLine(canvas, 0, 0, 50 - temp, 50 - temp)
        // this.drawLine(canvas, 50 + temp, 50 - temp, 100, 0)
        // this.drawLine(canvas, 50 + temp, 50 + temp, 100, 100)
        // this.drawLine(canvas, 0, 100, 50 - temp, 50 + temp)
      },
      getCanvasInstance () {
        const container = document.getElementById('myCanvas')
        const canvas = document.createElement('canvas')
        canvas.setAttribute('width', '100')
        canvas.setAttribute('height', '100')
        container.appendChild(canvas)
        const ctx = canvas.getContext('2d')
        ctx.font = "20px Verdana"
        // 创建渐变
        const gradient = ctx.createLinearGradient(0, 0, 150, 150)
        gradient.addColorStop(0,"magenta")
        gradient.addColorStop(0.5,"blue")
        gradient.addColorStop(1.0,"red")
        ctx.strokeStyle = gradient
        return ctx
      },
      drawRound (canvas, x, y, r = 30) {
        canvas.beginPath()
        canvas.arc(x, y, r, 0, 2*Math.PI)
        canvas.stroke()
      },
      drawText (canvas, x, y, text = 'Canvas') {
        canvas.strokeText(text, x, y)
      },
      drawLine (canvas, x1, y1, x2, y2) {
        canvas.moveTo (x1, y1)
        canvas.lineTo (x2, y2)
        canvas.lineWidth = 1
        canvas.stroke()
      }
    }
  }
</script>

<style scoped lang="scss">
  .node {
    width: 30px;
    height: auto;
    padding: 10px;
    border: 1px solid #e6e6e6;
    display: inline-block;
    margin: 0 10px;

    .node-label {

    }

    .node-content {

    }
  }
</style>
