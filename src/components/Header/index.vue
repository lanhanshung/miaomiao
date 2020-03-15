<template>
  <div>
    <Top></Top>
    <div id="content">
      <div class="movie_menu">
        <router-link tag="div" to="/home/city" class="city_name">
          <span>{{$store.state.city.cityName}}</span>
          <img src="@/assets/image/trangle.png" alt="" />
        </router-link>
        <div class="hot_swtich">
          <router-link tag="div" to="/home/nowPlaying" class="hot_item"
            >正在热映</router-link
          >
          <!-- <div class="hot_item active">正在热映</div> -->
          <router-link tag="div" to="/home/comingSoon" class="hot_item"
            >即将上映</router-link
          >
          <!-- <div class="hot_item">即将上映</div> -->
        </div>
        <router-link tag="div" to="/home/search" class="search_entry">
          搜索
          
        </router-link>
      </div>
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>
  </div>
</template>

<script>

import Top from '@/components/Top'
export default {
  name: 'navBar',
  components: {
    Top,
  },
  data() {
    return {
     
    }
  },
  methods: {
    
  },
}
</script>

<style lang="scss" scoped>
#content .movie_menu {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: white;
  z-index: 10;
  position: fixed;
  top: 50px;
  left: 0;
  right: 0;
  // margin-top: 50px;
}
.movie_menu .city_name {
  margin-left: 10px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .city_name.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .city_name > img {
  width: 10px;
  height: 10px;
}
.movie_menu .hot_swtich {
  display: flex;
  height: 100%;
  line-height: 45px;
}
.movie_menu .hot_item {
  font-size: 15px;
  color: #666;
  width: 80px;
  text-align: center;
  margin: 0 12px;
  font-weight: 700;
}
.movie_menu .hot_item.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .hot_item.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry {
  margin-right: 20px;
  height: 100%;
  line-height: 45px;
}
.movie_menu .search_entry.active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry.router-link-active {
  color: #ef4238;
  border-bottom: 2px #ef4238 solid;
}
.movie_menu .search_entry > span{
  display: inline-block;
  width: 45px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  border-radius: 50%;
  background-color: #ccc;
  color:#300c0c;
}
</style>
