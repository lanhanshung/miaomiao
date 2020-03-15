<template>
  <div>
    <Top></Top>
    <div id="content">
      <div class="cinema_menu">
        <div class="city_switch">
          全城 <img src="@/assets/image/trangle.png" alt="" />
        </div>
        <div class="brand_swtich">
          品牌 <img src="@/assets/image/trangle.png" alt="" />
        </div>
        <div class="feature_switch">
          特色 <img src="@/assets/image/trangle.png" alt="" />
        </div>
      </div>
      <div class="cinema_body">
        <Loading v-if="isShowLoad"></Loading>
        <Scroller v-else>
          <ul>
            <li v-for="item in cinemas" :key="item.id">
              <div>
                <span>{{ item.nm }}</span>
                <span class="q"
                  ><span class="price">{{ item.sellPrice | priceFormat }}</span>
                  元起</span
                >
              </div>
              <div class="address">
                <span>{{ item.addr }}</span>
                <span>{{ item.distance }}</span>
              </div>
              <div class="card">
                <div>小吃</div>
                <div>折扣</div>
              </div>
            </li>
          </ul>
        </Scroller>
      </div>
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top'
export default {
  name: 'clist',
  components: {
    Top,
  },
  created () {
    this.getCinemas()
  },
  activated(){
    this.cityId=this.$store.state.city.id
    if (this.cinemas.length !== 0) {
      if(this.cityId===this.preCityId){
        return
      }
      else{
        this.getCinemas()
      }
    }
  },
  data () {
    return {
      cinemas: [],
      isShowLoad:true,
      preCityId:0,
      cityId:0
    }
  },
  filters: {
    priceFormat (price) {
      return price ? price : 30
    }
  },
  methods:{
    getCinemas(){
      this.cityId=this.$store.state.city.id
      this.axios
      .get('/api/cinemaList?cityId='+this.cityId)
      .then(result => {
        if (result.data.msg === 'ok') {
          this.cinemas = result.data.data.cinemas
          this.isShowLoad=false
          // console.log(result.data.data.cinemas)
        }
        this.preCityId=this.cityId
        console.log('getCinemas');
        
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#content{
  height: 100vh;
}
li {
  list-style: none;
}
#content .cinema_menu {
  width: 100%;
  height: 45px;
  position: fixed;
  top: 50px;
  right: 0;
  left: 0;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: white;
}
#content .cinema_menu img {
  width: 15px;
  height: 15px;
}
#content .cinema_body {
  flex: 1;
  overflow: auto;
  margin-top: 86px;
  height: calc(100% - 96px - 50px);
}
.cinema_body ul {
  padding: 20px;
}
.cinema_body li {
  border-bottom: 1px solid #e6e6e6;
  margin-bottom: 20px;
}
.cinema_body div {
  margin-bottom: 10px;
}
.cinema_body .q {
  font-size: 11px;
  color: #f03d37;
}
.cinema_body .price {
  font-size: 18px;
}
.cinema_body .address {
  font-size: 13px;
  color: #666;
}
.cinema_body .address span:nth-of-type(2) {
  float: right;
}
.cinema_body .card {
  display: flex;
}
.cinema_body .card div {
  padding: 0 3px;
  height: 15px;
  line-height: 15px;
  border-radius: 2px;
  color: #f90;
  border: 1px solid #f90;
  font-size: 13px;
  margin-right: 5px;
}
.cinema_body .card div.or {
  color: #f90;
  border: 1px solid #f90;
}
.cinema_body .card div.bl {
  color: #589daf;
  border: 1px solid #589daf;
}
</style>
