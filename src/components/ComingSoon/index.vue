<template>
  <div>
    <div id="content">
      <div class="movie_body">
        <Loading v-if="isShowLoad"></Loading>
        <Scroller>
          <ul>
            <li
              v-for="item in comingList"
              :key="item.id"
              @tap="itemClick(item.id)"
            >
              <div class="pic_show">
                <img :src="item.img | setWH('100.100')" />
              </div>
              <div class="info_list">
                <h2>{{ item.nm }}</h2>
                <p>
                  <span class="person">{{ item.wish }}</span> 人想看
                </p>
                <p>主演: {{ item.star }}</p>
                <p>{{ item.rt }}上映</p>
              </div>
              <div class="btn_pre">
                预售
              </div>
            </li>
          </ul>
        </Scroller>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComingSoon',
  data () {
    return {
      comingList: [],
      isShowLoad: true,
      preCityId: 0,
      cityId: 0
    }
  },
  created () {
    this.getComingList()
  },
  activated () {
    this.cityId = this.$store.state.city.id
    if (this.comingList.length !== 0) {
      if (this.cityId === this.preCityId) {
        return
      } else {
        this.getComingList()
      }
    }
  },
  methods: {
    getComingList () {
      this.cityId = this.$store.state.city.id
      this.axios
        .get('/api/movieComingList?cityId=' + this.cityId)
        .then(result => {
          // console.log(result)
          if (result.data.msg === 'ok') {
            // console.log(result.data.data.comingList)
            this.comingList = result.data.data.comingList
            this.isShowLoad = false
            this.preCityId = this.cityId
          }
          // console.log('getComingList');
        })
        .catch(err => {})
    },
    itemClick (id) {
      this.$router.push({
        path: '/detail',
        query: {
          id: id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#content {
  height: 100vh;
}
#content .movie_body {
  flex: 1;
  overflow: auto;
  margin-top: 96px;
  height: calc(100% - 96px - 50px);
}
.movie_body ul {
  margin: 0 12px;
  overflow: hidden;
  padding: 0;
}
.movie_body ul li {
  // margin-top: 12px;
  display: flex;
  align-items: center;
  border-bottom: 1px #e6e6e6 solid;
  padding-bottom: 10px;
}
.movie_body ul li:last-child {
  margin-bottom: 50px;
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
