<template>
<div>
  <span class="curr">{{currencMin}} {{currencMax}}</span>
<div class="range-price" ref="strip">
  <div class="line range-price" ref="line"></div>
  <div id="range1" data-name="top" class="range" @mousedown="dropDown" @touchstart="dropDown" ref="rangeTop"></div>
  <div id="range2" data-name="bott" class="range" @mousedown="dropDown" @touchstart="dropDown" ref="rangeBottom"></div>
</div>
</div>
</template>
<script>
import device from '../modules/device'

let cursor
let rangeWidth
let stripWidth
let elem
let nameElem
let position = {
  top: 0,
  bott: 0
}

let eventType = (function () {
  const mobile = { move: 'touchmove', up: 'touchend' }
  const desktop = { move: 'mousemove', up: 'mouseup' }
  return (device === 'mobile') ? mobile : desktop
})()

export default {
  props: {
    maxPrice: {
      type: Number,
      required: true
    },
    priceSort: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      min: 1333,
      max: 13000
    }
  },
  methods: {
    dropDown (e) {
      elem = e.target
      cursor = (e.pageX || e.touches[0].pageX) - elem.offsetLeft
      stripWidth = (stripWidth || this.$refs.strip.offsetWidth - rangeWidth)
      nameElem = e.target.dataset.name
      this.addEvent()
    },
    drawRange (e) {
      let pos = (e.pageX || e.touches[0].pageX) - cursor
      if (pos < 0) pos = 0
      else if (pos >= stripWidth) pos = stripWidth
      position[nameElem] = pos
      elem.style.left = pos + 'px'
      this.calcPrice()
    },
    calcPrice () {
      let { top, bott } = position
      top = top / stripWidth * this.maxPrice
      bott = bott / stripWidth * this.maxPrice
      this.min = (top > bott) ? bott : top
      this.max = (top < bott) ? bott : top
    },
    updatePrice () {
      window.removeEventListener(eventType.move, this.drawRange)
      window.removeEventListener(eventType.up, this.updatePrice)
      window.onselectstart = null
      // ~~ === Math.floor
      this.$emit('update:priceSort', { min: ~~this.min, max: ~~this.max })
    },
    addEvent () {
      window.addEventListener(eventType.move, this.drawRange)
      window.addEventListener(eventType.up, this.updatePrice)
      window.onselectstart = () => false
    },
    setup () {
      let min = this.min / this.maxPrice * 100
      let max = this.max / this.maxPrice * 100
      let width = this.$refs.strip.offsetWidth
      console.log((min / 100) * width, (max / 100) * width)
      position = { top: (min / 100) * 154, bott: (max / 100) * 154 }
      this.$refs.rangeBottom.style.left = max + '%'
      this.$refs.rangeTop.style.left = min + '%'
    }
  },
  computed: {
    currenc () {
      return this.$store.getters['privatAPI/GET_MONEY']
    },
    currencMax () {
      return (this.max / this.currenc.money).toFixed(0) + ' ' + this.currenc.cod
    },
    currencMin () {
      return (this.min / this.currenc.money).toFixed(0) + ' ' + this.currenc.cod
    }
  },
  mounted () {
    rangeWidth = parseInt(window.getComputedStyle(this.$refs.rangeTop, null).width)
  },
  watch: {
    maxPrice () {
      console.log(this.priceSort.min)
      this.min = this.priceSort.min || 0
      this.max = this.priceSort.max || this.maxPrice
      this.setup()
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
.curr {
  font-size: 14px;
}
.line {
  background: black;
}
</style>
