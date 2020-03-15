<template>
  <div class="city_body">
    <div class="city_list">
      <Loading v-if="isShowLoad"></Loading>
      <Scroller v-else ref="scroll">
        <div>
          <div class="city_hot">
            <h2>热门城市</h2>
            <ul class="clearfix">
              <li
                v-for="item in hotCity"
                :key="item.id"
                @tap="cityTap(item.nm, item.id)"
              >
                {{ item.nm }}
              </li>
            </ul>
          </div>

          <div class="city_sort" ref="city_sort">
            <div v-for="(item, index) in cityList" :key="index">
              <h2>{{ item.index }}</h2>
              <ul>
                <li
                  v-for="i in item.list"
                  :key="i.id"
                  @tap="cityTap(i.nm, i.id)"
                >
                  {{ i.nm }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Scroller>
    </div>
    <div class="city_index">
      <ul>
        <li
          v-for="(item, index) in cityList"
          :key="index"
          @touchstart="letterClick(index)"
        >
          {{ item.index }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'city',
  created () {
    // 获取本地的城市信息
    var cL = window.localStorage.getItem('cityList')
    var hC = window.localStorage.getItem('hotCity')
    if (cL & hC) {
      this.cityList = cL
      this.hotCity = hC
    } else {
      this.axios
        .get('/api/cityList')
        .then(res => {
          if (res.data.msg === 'ok') {
            var cities = res.data.data.cities
            this.isShowLoad = false
            this.formatCity(cities)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  data () {
    return {
      cityList: [],
      hotCity: [],
      isShowLoad: true
    }
  },
  methods: {
    formatCity (cities) {
      // 取出热门城市
      cities.forEach(value => {
        if (value.isHot === 1) {
          this.hotCity.push(value)
        }
      })
      //   console.log(cities);
      // {index:A,list:[{nm:'城市',id:123}]}
      cities.forEach((item, index) => {
        // 获得城市的首字母
        var cityFirstString = item.py.substring(0, 1).toUpperCase()
        // // 在cityList中查找是否已经存在当前字母,存在，返回true，并在cityList的list中添加
        // //	不存在返回undefined，创建新的数据
        var isExist = this.cityList.find(item => {
          return item.index === cityFirstString
        })

        if (isExist) {
          // console.log(this.cityList);
          this.cityList.forEach((item1, index1) => {
            if (item1.index === cityFirstString) {
              this.cityList[index1].list.push({ nm: item.nm, id: item.id })
            }
          })
        } else {
          this.cityList.push({
            index: cityFirstString,
            list: [{ nm: item.nm, id: item.id }]
          })
        }
      })

      //  进行排序
      this.cityList.sort((n1, n2) => {
        if (n1.index > n2.index) {
          return 1
        } else if (n1.index < n2.index) {
          return -1
        } else {
          return 0
        }
      })
      // console.log(this.hotCity)
      // 将城市信息进行保存
      window.localStorage.setItem('cityList', JSON.stringify(this.cityList))
      window.localStorage.setItem('hotCity', JSON.stringify(this.hotCity))
    },
    letterClick (index) {
      var h2 = this.$refs.city_sort.getElementsByTagName('h2')
      // console.log(this.$refs.scroll.scrollTo)
      this.$refs.scroll.scrollTo(-h2[index].offsetTop)
      // this.$refs.city_sort.parentNode.scrollTop = h2[index].offsetTop
    },
    //城市的点击事件
    cityTap (nm, id) {
      this.$store.commit('city/CITY_INFO', { nm, id })
      // 跳转到nowPlaying页面中
      this.$router.push('/home/nowPlaying')
      // 将城市进行保存
      window.localStorage.setItem('curCity', nm)
      window.localStorage.setItem('curCityId', id)
    }
  }
}
</script>

<style lang="scss" scoped>
.wrapper {
  margin-top: -20px;
}
li {
  list-style: none;
}
.clearfix:after {
  content: '';
  display: block;
  clear: both;
}
.city_body {
  height: 100vh;
  margin-top: 96px;
  display: flex;
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}
.city_body .city_list {
  flex: 1;
  overflow: auto;
  background: #fff5f0;
  height: calc(100% - 96px - 50px);
}
.city_body .city_list::-webkit-scrollbar {
  background-color: transparent;
  width: 0;
}
.city_body .city_hot {
  margin-top: 20px;
}
.city_body .city_hot h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_hot ul {
  padding: 0;
}
.city_body .city_hot ul li {
  float: left;
  background: #fff;
  width: 29%;
  height: 33px;
  margin-top: 15px;
  margin-left: 3%;
  padding: 0 4px;
  border: 1px solid #e6e6e6;
  border-radius: 3px;
  line-height: 33px;
  text-align: center;
  box-sizing: border-box;
}

.city_body .city_sort div {
  margin-top: 20px;
}
.city_body .city_sort h2 {
  padding-left: 15px;
  line-height: 30px;
  font-size: 14px;
  background: #f0f0f0;
  font-weight: normal;
}
.city_body .city_sort ul {
  padding-left: 10px;
  margin-top: 10px;
}
.city_body .city_sort ul li {
  line-height: 30px;
  line-height: 30px;
}
.city_body .city_sort div:last-child {
  margin-bottom: 50px;
}
.city_body .city_index {
  width: 20px;
  height: calc(100% - 96px - 50px);
  display: flex;
  flex-direction: column;
  // justify-content: center;
  text-align: center;
  border-left: 1px #e6e6e6 solid;
}
.city_body .city_index ul {
  padding: 0;
}
.city_body .city_index ul li {
  // margin: 5px 0;
}
</style>
