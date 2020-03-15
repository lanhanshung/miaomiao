<template>
  <div>
    <div class="search_body">
      <div class="search_input">
        <div class="search_input_wrapper">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" v-model="message" />
        </div>
      </div>
      <div class="search_result">
        <Loading v-if="isShowLoad"></Loading>
        <Scroller v-else>
          <div>
            <h3>电影/电视剧/综艺</h3>
            <ul>
              <li v-for="(item, index) in movies" :key="index">
                <div class="img">
                  <img :src="item.img | setWH('100.100')" />
                </div>
                <div class="info">
                  <p>
                    <span>{{ item.nm }}</span
                    ><span>{{ item.sc }}</span>
                  </p>
                  <p>{{ item.enm }}</p>
                  <p>{{ item.cat }}</p>
                  <p>{{ item.pubDesc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </Scroller>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/common/utils'
export default {
  name: 'search',
  data () {
    return {
      message: '',
      movies: [],
      isShowLoad: false,
      preCityId: 0,
      cityId: 0
    }
  },
  watch: {
    message (newVal) {
      var MoviesList = debounce(this.getMoviesList(newVal), 500)
      MoviesList()
      // console.log(a);
    }
  },
  activated () {
    this.cityId = this.$store.state.city.id
    if (this.movies.length !== 0) {
      if (this.preCityId === this.cityId) {
        return
      } else {
        // this.getMoviesList()
        // 切换城市了，可以将输入框的数据清空
        this.message=''
      }
    }
  },
  methods: {
    getMoviesList (newVal) {
      if (!newVal) {
        this.isShowLoad = false
        this.movies = []
      } else {
        this.cityId = this.$store.state.city.id
        this.isShowLoad = true
        this.axios
          .get('/api/searchList?cityId=' + this.cityId + '&kw=' + newVal)
          .then(result => {
            // console.log(result)
            if (result.data.msg === 'ok') {
              this.movies = result.data.data.movies.list
              this.isShowLoad = false
              this.preCityId = this.cityId
            }
            // console.log('getMoviesList');
            
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search_body {
  flex: 1;
  overflow: auto;
  margin-top: 96px;
  height: 100vh;
}
.search_body .search_input {
  padding: 8px 10px;
  background-color: #f5f5f5;
  border-bottom: 1px solid #e5e5e5;
  position: fixed;
  left: 0;
  right: 0;
  z-index: 10;
}
.search_body .search_input_wrapper {
  padding: 0 10px;
  border: 1px solid #e6e6e6;
  border-radius: 5px;
  background-color: #fff;
  display: flex;
  line-height: 20px;
}
.search_body .search_input_wrapper i {
  font-size: 16px;
  padding: 4px 0;
}
.search_body .search_input_wrapper input {
  border: none;
  font-size: 13px;
  color: #333;
  padding: 4px 0;
  outline: none;
  margin-left: 5px;
  width: 100%;
}

.search_body .search_result {
  margin-top: 47px;
  height: calc(100% - 96px - 50px - 47px);
}
.search_body .search_result h3 {
  font-size: 15px;
  color: #999;
  padding: 9px 15px;
  border-bottom: 1px solid #e6e6e6;
}
.search_body .search_result ul {
  padding: 0;
}
.search_body .search_result li {
  border-bottom: 1px #c9c9c9 dashed;
  padding: 10px 15px;
  box-sizing: border-box;
  display: flex;
}
.search_body .search_result li:last-child {
  margin-bottom: 50px;
}
.search_body .search_result .img {
  width: 100px;
  float: left;
}
.search_body .search_result .img img {
  width: 100%;
}
.search_body .search_result .info {
  float: left;
  margin-left: 15px;
  flex: 1;
}
.search_body .search_result .info p {
  height: 22px;
  display: flex;
  line-height: 22px;
  font-size: 12px;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(1) {
  font-size: 18px;
  flex: 1;
}
.search_body .search_result .info p:nth-of-type(1) span:nth-of-type(2) {
  font-size: 16px;
  color: #fc7103;
}
</style>
