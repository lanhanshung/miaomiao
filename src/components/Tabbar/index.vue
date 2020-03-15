<template>
  <div id="tabbar">
    <div v-for="(item, index) in tabs" :key="index">
      <div
        class="item"
        @click="itemClick(index)"
        :class="[curIndex === index ? 'active' : '']"
      >
        <p :class="item.iconfont"></p>
        <span>{{ item.text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'tabbar',
  props: {
    tabs: {
      type: Array,
      default: []
    }
  },
  mounted () {
    if (this.$route.path === '/') {
      this.$router.replace('/home')
    }
  },
  data () {
    return {
      curIndex: 0
    }
  },
  methods: {
    itemClick (index) {
      this.curIndex = index
      // 进行页面跳转

      switch (this.curIndex) {
        case 0:
          if (this.$route.path !== '/home') this.$router.replace('/home')
          break
        case 1:
          if (this.$route.path !== '/cinema') this.$router.replace('/cinema')
          break
        case 2:
          if (this.$route.path !== '/profile') this.$router.replace('/profile')
          break
      }
    }
  }
}
</script>

<style scoped>
#tabbar {
  display: flex;
  position: fixed;
  width: 100%;
  bottom: 0px;
  background-color: #fff;
  /* margin-top: 50px; */
}
#tabbar > div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
p {
  text-align: center;
  font-size: 26px;
  margin: 0px;
}
span {
  font-size: 16px;
}
.active {
  color: red;
}
</style>
