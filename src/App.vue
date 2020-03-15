<template>
  <div id="app">
    <keep-alive exclude="Detail"><router-view v-if="isRouterAlive"/></keep-alive>
    <Tabbar :tabs="tabs"></Tabbar>
  </div>
</template>

<script>
import Tabbar from '@/components/Tabbar'

export default {
  provide(){
    return {
      reload:this.reload
    }
  },
  components: {
    Tabbar,
    
  },
  data () {
    return {
      isRouterAlive:true,
      tabs: [
        {
          iconfont: 'icon iconfont icon-dianying',
          text: '电影'
        },
        {
          iconfont: 'icon iconfont icon-yingyuan',
          text: '影院'
        },
        {
          iconfont: 'icon iconfont icon-wodedangxuan',
          text: '我的'
        }
      ]
    }
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(()=>{
        this.isRouterAlive=true
      })
    }
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
}


body {
  margin: 0;
  padding: 0;
}
</style>
