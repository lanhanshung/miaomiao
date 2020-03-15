<template>
  <div id="nowPlaying">
    <div class="movie_body" ref="movie_body">
      <Loading v-if="isShowLoad"></Loading>
      <Scroller v-else @scroll="scroll" @touchEnd="touchEnd">
        <ul>
          <li class="pullDown">{{ pullingUpMessage }}</li>
          <li
            v-for="item in movieList"
            :key="item.id"
            @tap="itemClick(item.id)"
          >
            <div class="pic_show">
              <img :src="item.img | setWH('300.300')" />
            </div>
            <div class="info_list">
              <h2>{{ item.nm }}</h2>
              <p>
                观众评 <span class="grade">{{ item.sc }}</span>
              </p>
              <p>主演:{{ item.star }}</p>
              <p>{{ item.comingTitle }}上映</p>
            </div>
            <div class="btn_mall">
              购票
            </div>
          </li>
        </ul>
      </Scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NowPlaying',
  components: {},
  created () {
    this.getNowPlaying()
  },
  mounted () {
    this.$nextTick(() => {})
  },
  activated () {
    console.log('activated');
    this.cityId = this.$store.state.city.id
    if (this.movieList.length !== 0) {
      // 有数据
      if (this.prevCityId === this.cityId) {
        // console.log(this.prevCityId,this.cityId);
        // console.log("this.prevCityId === this.cityId");
        // 判断当前的城市id与上一次的城市id是否相同，相同不请求数据，否则请求数据
        return
      } else {
        this.getNowPlaying()
      }
    }
  },
  destroyed(){
    // console.log('destroyed');
  },
  data () {
    return {
      movieList: [],
      pullingUpMessage: '',
      isShowLoad: true,
      cityId: 0,
      prevCityId: -1
    }
  },
  methods: {
    getNowPlaying () {
      this.cityId = this.$store.state.city.id
      // console.log(this.cityId);
      this.axios
        .get('/api/movieOnInfoList?cityId=' + this.cityId)
        .then(result => {
          // console.log(result)
          if (result.data.msg === 'ok') {
            // console.log(result.data.data.movieList)
            this.movieList = result.data.data.movieList
            this.isShowLoad = false
            this.prevCityId = this.cityId
            // console.log('getNowPlaying')
          }
        })
        .catch(err => {
          console.log(err)
        })
    },
    scroll (p) {
      // console.log(p);
      if (p.y > 30) {
        this.pullingUpMessage = '正在更新'
      }
    },
    touchEnd (p) {
      // console.log(p);

      if (p.y > 30) {
        this.axios
          .get('/api/movieOnInfoList?cityId=13')
          .then(result => {
            if (result.data.msg === 'ok') {
              this.pullingUpMessage = '加载完成'
              setTimeout(() => {
                this.movieList = result.data.data.movieList
                this.pullingUpMessage = ''
              }, 1000)
            }
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    itemClick(id){
      this.$router.push({
        path:'/detail',
        query:{
          id:id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#nowPlaying {
  height: 100vh;
}
.movie_body {
  flex: 1;
  overflow: auto;
  margin-top: 96px;
  height: calc(100% - 96px - 50px);
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
  box-sizing: border-box;
  padding: 0;
}
.movie_body ul li {
  // margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body ul .pullDown {
  border-bottom: none;
}
.movie_body .pic_show {
  width: 100px;
  height: 100px;
}
.movie_body .pic_show img {
  width: 100%;
}
.movie_body .info_list {
  margin-left: 10px;
  flex: 1;
  position: relative;
}
.movie_body .info_list h2 {
  font-size: 17px;
  line-height: 24px;
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list p {
  font-size: 13px;
  color: #666;
  line-height: 22px;
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.movie_body .info_list .grade {
  font-weight: 700;
  color: #faaf00;
  font-size: 15px;
}
.movie_body .info_list img {
  width: 50px;
  position: absolute;
  right: 10px;
  top: 5px;
}
.movie_body .btn_mall,
.movie_body .btn_pre {
  width: 47px;
  height: 27px;
  line-height: 28px;
  text-align: center;
  background-color: #f03d37;
  color: #fff;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
}
.movie_body .btn_pre {
  background-color: #3c9fe6;
}
</style>
