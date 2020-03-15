<template>
  <div id="messageBox">
    <h2>定位</h2>
    <p>{{ nowCity }}</p>
    <div>
      <div @click="handleOk">{{ okText }}</div>
      <div @click="handleCanlel">{{ cancelText }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CityMessageBox',
  props: {
    nowCity: {
      type: String,
      default: '南昌'
    },
    okText: {
      type: String,
      default: '确定'
    },
    cancelText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    handleOk () {
      this.$emit('handleOk')
    },
    handleCanlel () {
      this.$emit('handleCanlel')
    }
  }
}
</script>

<style lang="scss" scoped>
#messageBox {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 200px;
  height: 120px;
  border-radius: 30px;
  border: 1px solid #ccc;
  background-color: #e0d4cc;
  box-shadow: 5px 5px 5px #ccc;
  transform: translate(-50%, -50%);
}
#messageBox h2 {
  font-size: 24px;
  text-align: center;
}
#messageBox p {
  font-size: 18px;
  text-align: center;
}
#messageBox > div {
  display: flex;
}
#messageBox > div div {
  flex: 1;
  font-size: 18px;
  text-align: center;
}
</style>
