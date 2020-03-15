<template>
    <div id="top">
      <div class="left"><slot></slot></div>
      <h1>{{ title }}</h1>
    </div>
  
</template>

<script>
export default {
  name: 'top',
  props: {
    title: {
      type: String,
      default: '喵喵影院'
    }
  }
}
</script>

<style lang="scss" scoped>
#top {
  width: 100%;
  height: 50px;
  color: #fff;
  background: #e54847;
  border-bottom: 1px solid #e54847;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: flex;
}
#top h1 {
  margin: 0;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  font-weight: normal;
  flex: 0.9;
}
#top .left{
  flex: 0.1;
  font-size: 18px;
  // text-align: center;
  line-height: 60px;
}
</style>
