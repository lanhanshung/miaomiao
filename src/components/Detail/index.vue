<template>
  <div id="main">
    <Top :title="title">
      <img src="@/assets/image/back.svg" alt="" @touchstart="back" />
    </Top>
    <Loading v-if="isShowLoad"></Loading>
    <div v-else id="content" class="contentDetail">
      <Scroller>
        <div>
          <div class="detail_list">
            <div class="detail_list_bg"></div>
            <div class="detail_list_filter"></div>
            <div class="detail_list_content">
              <div class="detail_list_img">
                <img :src="detailMovie.img | setWH('300.300')" alt="" />
              </div>
              <div class="detail_list_info">
                <h2>{{ detailMovie.nm }}</h2>
                <p>{{ detailMovie.enm }}</p>
                <p>{{ detailMovie.scoreLabel }}</p>
                <p>{{ detailMovie.cat }}</p>
                <p>{{ detailMovie.src }} / {{ detailMovie.watched }}分钟</p>
                <p>{{ detailMovie.pubDesc }}</p>
              </div>
            </div>
          </div>
          <div class="detail_intro">
            <p>
              {{ detailMovie.dra }}
            </p>
          </div>
          <div class="detail_player swiper-container" ref="detail_player">
            <ul class="swiper-wrapper">
              <li
                class="swiper-slide"
                v-for="item in detailMovie.photos"
                :key="item.id"
              >
                <div>
                  <img :src="item | setWH('300.300')" alt="" />
                </div>
                <p>{{ detailMovie.dir }}</p>
              </li>
            </ul>
          </div>
        </div>
      </Scroller>
    </div>
  </div>
</template>

<script>
import Top from '@/components/Top'
export default {
  name: 'Detail',
  components: {
    Top
  },
  data () {
    return {
      title: '影院详情',
      detailMovie: [],
      isShowLoad:true
    }
  },
  created () {
    this.getDetailMovie()
  },
  mounted () {
    this.$nextTick(() => {})
  },
  methods: {
    getDetailMovie () {
      this.axios
        .get('/api/detailmovie?movieId=' + this.$route.query.id)
        .then(result => {
          console.log(result)
          if (result.data.msg === 'ok') {
            this.detailMovie = result.data.data.detailMovie
          }
          // console.log('getDetailMovie')
          this.isShowLoad=false
        })
        .catch(err => {})
    },
    back () {
      console.log('back')
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
// @import url('~@/assets/css/swiper-4.1.0.min.css');
li {
  list-style: none;
}
#main {
  height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  z-index: 9;
  background-color: #fff;
}
#content {
  flex: 1;
  overflow: auto;
  margin-bottom: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-top: 51px;
  height: calc(100% - 51px);
}
#content.contentDetail {
  display: block;
  margin-bottom: 0;
}
#content .detail_list {
  height: 200px;
  width: 100%;
  position: relative;
  overflow: hidden;
}
.detail_list .detail_list_bg {
  width: 100%;
  height: 100%;
  //   background: url(../images/movie_1.jpg) 0 40%;
  filter: blur(20px);
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;
}
.detail_list .detail_list_filter {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #40454d;
  opacity: 0.55;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}
.detail_list .detail_list_content {
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 2;
}
.detail_list .detail_list_img {
  width: 108px;
  height: 150px;
  border: solid 1px #f0f2f3;
  margin: 20px;
}
.detail_list .detail_list_img img {
  width: 100%;
  height: 100%;
}
.detail_list .detail_list_info {
  margin-top: 20px;
}
.detail_list .detail_list_info h2 {
  font-size: 20px;
  color: white;
  font-weight: normal;
  line-height: 40px;
}
.detail_list .detail_list_info p {
  color: white;
  line-height: 20px;
  font-size: 14px;
  color: #ccc;
}

#content .detail_intro {
  padding: 10px;
}
#content .detail_player {
  margin: 20px;
}
#content .detail_player ul {
  padding: 0;
  width: 411px;
  display: flex;
  flex-wrap: wrap;
}
#content .detail_player ul li > div img {
  width: 100px;
  height: 100px;
}
.detail_player .swiper-slide {
  width: 100px;
  margin-right: 20px;
  text-align: center;
  font-size: 14px;
}
.detail_player .swiper-slide img {
  width: 100%;
  margin-bottom: 5px;
}
.detail_player .swiper-slide p:nth-of-type(2) {
  color: #999;
}
</style>
