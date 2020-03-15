<template>
  <div>
    <Header></Header>
    <CityMessageBox
      v-if="isShowMessageBox"
      :nowCity="curCity"
      @handleOk="handleOk"
      @handleCanlel="handleCanlel"
    ></CityMessageBox>
  </div>
</template>

<script>
import Header from '@/components/Header'
import CityMessageBox from '@/components/CityMessageBox'

export default {
  name: 'home',
  inject:['reload'],
  components: {
    Header,
    CityMessageBox
  },
  created () {
    this.getCurCity()
    // console.log(this.curCityId, this.$store.state.city.id)
    setTimeout(() => {
      // console.log(this.curCityId, this.$store.state.city.id)
      if (this.curCityId == this.$store.state.city.id) {
        this.isShowMessageBox = false
      } else {
        this.isShowMessageBox = true
      }
    }, 1000)
  },
  data () {
    return {
      isShowLoad: true,
      curCity: '',
      curCityId: 0,
      isShowMessageBox: false
    }
  },
  methods: {
    getCurCity () {
      this.axios
        .get('/api/getLocation')
        .then(result => {
          if (result.data.msg === 'ok') {
            this.curCity = result.data.data.nm
            this.curCityId = result.data.data.id
          }
        })
        .catch(err => {})
    },
    handleOk () {
      window.localStorage.setItem('curCity', this.curCity)
      window.localStorage.setItem('curCityId', this.curCityId)
      this.isShowMessageBox = false
      var nm = this.curCity
      var id = this.curCityId
      this.$store.commit('city/CITY_INFO', { nm, id })
      //刷新该页面
      this.reload()
    },
    handleCanlel () {
      //点击取消按钮，不改变城市
      this.isShowMessageBox = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
