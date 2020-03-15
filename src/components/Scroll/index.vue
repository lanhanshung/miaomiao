<template>
  <div class="wrapper" ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data () {
    return {
      bScroll: null
    }
  },
  props: {
    tap: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 1
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  components: {
    BScroll
  },
  mounted () {
    this.$nextTick(() => {
      this.bScroll = new BScroll(this.$refs.wrapper, {
        tap: this.tap,
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad
      })
      //   滚动事件
      this.bScroll.on('scroll', position => {
        this.$emit('scroll', position)
      })
      //   下拉刷新事件
      this.bScroll.on('touchEnd', position => {
        this.$emit('touchEnd',position)
      })
    })
  },
  methods: {
    scrollTo(y) {
      this.bScroll&&this.bScroll.scrollTo(0,y)
    }
  },
}
</script>

<style lang="scss" scoped>
.wrapper{
  height: 100%;
}
</style>
