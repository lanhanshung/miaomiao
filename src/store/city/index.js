const state={
    cityName:window.localStorage.getItem('curCity')||"北京",
    id:window.localStorage.getItem('curCityId')||1,

};
const action={

};
const getters={

};
const mutations={
    CITY_INFO(state,pyload){
        state.cityName=pyload.nm
        state.id=pyload.id
    }
};
export default {
    namespaced:true,
    state,
    action,
    getters,
    mutations
}