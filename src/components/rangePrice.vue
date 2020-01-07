<template>
<div>
  <span class="curr">{{currencMin}} {{currencMax}}</span>
<div class="range-price" ref="strip">
  <div class="line range-price" ref="line"></div>
  <div id="range1" class="range" @mousedown="clickDown" @touchstart="clickDown" ref="rangeTop"></div>
  <div id="range2" class="range" @mousedown="clickDown" @touchstart="clickDown" ref="rangeBottom"></div>
</div>
</div>
</template>
<script>
import device from '../modules/device'

let cursor
let selectedRagne
let selectedRagnePosition
let stripWidth

let eventType = (function () {
  const mobile = { move: 'touchmove', up: 'touchend' }
  const desktop = { move: 'mousemove', up: 'mouseup' }
  return (device === 'mobile') ? mobile : desktop
})()

export default {
  props: ['maxPrice', 'priceSort'],
  data () {
    return {
      min: 0,
      max: 0
    }
  },
  methods: {
    clickDown (event) {
      cursor = event.pageX || event.touches[0].pageX
      selectedRagne = event.target
      selectedRagnePosition = event.target.offsetLeft
      stripWidth = this.$refs.strip.offsetWidth - selectedRagne.offsetWidth
      this.addEvent()
    },
    drawRange (event) {
      let pos = (event.pageX || event.touches[0].pageX) - cursor + selectedRagnePosition
      if (pos < 0) pos = 0
      else if (pos >= stripWidth) pos = stripWidth
      selectedRagne.style.left = pos + 'px'
      this.lineDraw()
      this.calcPrice()
    },
    lineDraw () {
      const range = this.rangeLeft()
      const line = this.$refs.line.style
      const x = Math.abs((range.top - range.bott))
      const min = (range.top > range.bott) ? range.bott : range.top
      line.width = x + 'px'
      line.left = selectedRagne.offsetWidth / 2 + min + 'px'
    },
    calcPrice () {
      const range = this.rangeLeft()
      let top = range.top / stripWidth * this.maxPrice
      let bott = range.bott / stripWidth * this.maxPrice
      this.min = (top > bott) ? bott : top
      this.max = (top < bott) ? bott : top
    },
    rangeLeft () {
      const elemTop = this.$refs.rangeTop.offsetLeft
      const elemBottom = this.$refs.rangeBottom.offsetLeft
      return { top: elemTop, bott: elemBottom }
    },
    updatePrice () {
      window.removeEventListener(eventType.move, this.drawRange)
      window.removeEventListener(eventType.up, this.updatePrice)
      window.onselectstart = null
      this.$emit('update:priceSort', { min: this.min, max: this.max })
    },
    addEvent () {
      window.addEventListener(eventType.move, this.drawRange)
      window.addEventListener(eventType.up, this.updatePrice)
      window.onselectstart = () => false
    }
  },
  computed: {
    currenc () {
      return this.$store.getters['privatAPI/GET_MONEY']
    },
    currencMax () {
      const max = this.max || this.maxPrice
      return (max / this.currenc.money).toFixed(0) + ' ' + this.currenc.cod
    },
    currencMin () {
      return (this.min / this.currenc.money).toFixed(0) + ' ' + this.currenc.cod
    }
  }
}
</script>
<style lang="scss" scoped>
.range-price {
  width: 100%;
  height: 10px;
  background: white;
  border-radius: 10px;
  margin: 20px 0;
  position: relative;
}

.range {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  background: #1E90FF;
  top: 0; left: 0; bottom: 0; right: 0;
  margin: auto 0;
  position: absolute;
  &:hover {
    border: solid black 1px;
  }
}
#range2 {
  left: calc(100% - 15px);
}
.curr {
  font-size: 14px;
}
.line {
  background: black;
}
</style>
